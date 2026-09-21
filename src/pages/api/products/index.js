import {
  findCatalogCategory,
  getCatalogProducts,
} from '@/src/lib/catalogRepository';
import {
  normalizeWooProductsTextToEnglish,
  translateWooProductsDescriptionsToSpanish,
} from '@/src/lib/productText';
import {
  isProductVisible,
  preferDescriptionProductImages,
} from '@/src/lib/productVisibility';

const parsePositiveInteger = (value, fallback) => {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
};

const isTrue = (value) => value === true || value === 'true';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=86400');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=60, stale-while-revalidate=86400');
  res.setHeader('X-Dosalga-Catalog-Source', 'railway');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      page = 1,
      per_page = 10,
      limit,
      category,
      search,
      sku,
      orderby = 'date',
      order = 'desc',
      on_sale,
      featured,
      all = false,
      lang = 'es',
    } = req.query;
    const fetchAllProducts = isTrue(all);
    const perPage = Math.min(parsePositiveInteger(limit ?? per_page, 10), 100);
    const normalizedSearch = String(search || '').trim();
    const normalizedSku = String(sku || '').trim();
    let resolvedCategory = category;
    let resolvedSearch = normalizedSearch;

    if (!normalizedSku && normalizedSearch && !category) {
      if (/^CJ[A-Z0-9-]+$/i.test(normalizedSearch)) {
        resolvedSearch = '';
      } else {
        const matchedCategory = await findCatalogCategory(normalizedSearch);
        if (matchedCategory?.id) {
          resolvedCategory = matchedCategory.id;
          resolvedSearch = '';
        }
      }
    }

    const products = await getCatalogProducts({
      all: fetchAllProducts,
      page: parsePositiveInteger(page, 1),
      perPage,
      category: resolvedCategory,
      search: resolvedSearch,
      sku: normalizedSku || (/^CJ[A-Z0-9-]+$/i.test(normalizedSearch) ? normalizedSearch : ''),
      orderby,
      order,
      onSale: on_sale === undefined ? undefined : isTrue(on_sale),
      featured: featured === undefined ? undefined : isTrue(featured),
    });
    const visibleProducts = products
      .map(preferDescriptionProductImages)
      .filter(isProductVisible);
    const localizedProducts = String(lang).toLowerCase() === 'en'
      ? normalizeWooProductsTextToEnglish(visibleProducts)
      : translateWooProductsDescriptionsToSpanish(visibleProducts);

    return res.status(200).json({
      success: true,
      data: localizedProducts,
      count: localizedProducts.length,
      all: fetchAllProducts,
      source: 'railway',
    });
  } catch (error) {
    console.error('Error reading the Railway product catalog:', error);
    return res.status(503).json({
      success: false,
      message: 'Le catalogue est temporairement indisponible',
      error: error.message,
    });
  }
}
