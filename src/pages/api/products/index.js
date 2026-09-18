/**
 * API Route: /api/products
 * Récupère tous les produits depuis WooCommerce
 */
import {
  getAllProductReviews,
  getAllProducts,
  getProducts,
  getCategories,
  getWooCommerceErrorDetails,
} from '@/src/lib/woocommerce';
import {
  getWordPressPriceSourceCurrency,
  normalizeWooProductsPricesToMXN,
} from '@/src/lib/pricing';
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

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return parsedValue;
};

const normalizePerPage = (value, fallback) => {
  return Math.min(parsePositiveInteger(value, fallback), 100);
};

const isTrue = (value) => value === true || value === 'true';

const attachAdminManagedPrices = async (products) => {
  try {
    const adminUrl = process.env.DOSALGA_ADMIN_URL || 'https://admindosalga.vercel.app';
    const response = await fetch(`${adminUrl}/api/products`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });
    if (!response.ok) return products;
    const payload = await response.json();
    const managed = new Map((payload.products || [])
      .filter((product) => product.wooPricePublication?.state === 'woo_verified')
      .map((product) => [String(product.sku || '').trim(), product]));
    return products.map((product) => {
      const adminProduct = managed.get(String(product.sku || '').trim());
      if (!adminProduct) return product;
      const price = Number(adminProduct.wooPricePublication?.price ?? adminProduct.salePrice);
      return {
        ...product,
        ...(Number.isFinite(price) ? { price: String(price), regular_price: String(price), sale_price: '' } : {}),
        meta_data: [
          ...(Array.isArray(product.meta_data) ? product.meta_data : []),
          { key: 'dosalga_price_source_currency', value: adminProduct.saleCurrency || 'MXN' },
        ],
      };
    });
  } catch {
    return products;
  }
};

const attachCurrencyReviews = async (products) => {
  let reviews = [];

  try {
    reviews = await getAllProductReviews({ per_page: 100 });
  } catch (error) {
    console.warn('Product reviews unavailable; returning products without reviews.', getWooCommerceErrorDetails(error));
  }

  const reviewsByProductId = new Map();

  reviews.forEach((review) => {
    const productId = Number(review?.product_id || review?.product);
    if (!Number.isFinite(productId)) return;

    reviewsByProductId.set(productId, [
      ...(reviewsByProductId.get(productId) || []),
      review,
    ]);
  });

  return products.map((product) => ({
    ...product,
    reviews: reviewsByProductId.get(Number(product.id)) || [],
  }));
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');

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
    const resolvedPerPage = normalizePerPage(limit ?? per_page, fetchAllProducts ? 100 : 10);

    const params = {
      per_page: resolvedPerPage,
      orderby,
      order,
      status: 'publish',
    };

    if (!fetchAllProducts) {
      params.page = parsePositiveInteger(page, 1);
    }

    // Ajouter les filtres optionnels
    if (category) params.category = category;
    const normalizedSearch = String(search || '').trim();
    const normalizedSku = String(sku || '').trim();
    if (normalizedSku) params.sku = normalizedSku;
    else if (/^CJ[A-Z0-9-]+$/i.test(normalizedSearch)) params.sku = normalizedSearch;
    else if (normalizedSearch) {
      const categoryCandidates = await getCategories({ per_page: 100, hide_empty: true });
      const normalizedTerm = normalizedSearch.toLocaleLowerCase('es');
      const matchedCategory = Array.isArray(categoryCandidates)
        ? categoryCandidates.find((candidate) => (
            String(candidate?.name || '').toLocaleLowerCase('es') === normalizedTerm
            || String(candidate?.slug || '').toLocaleLowerCase('es') === normalizedTerm
          ))
        : null;

      if (matchedCategory?.id) params.category = matchedCategory.id;
      else params.search = normalizedSearch;
    }
    if (on_sale !== undefined) params.on_sale = isTrue(on_sale);
    if (featured !== undefined) params.featured = isTrue(featured);

    const products = fetchAllProducts
      ? await getAllProducts(params)
      : await getProducts(params);

    // Guard: if upstream (SiteGround captcha) returns HTML/string, treat as error
    if (!Array.isArray(products)) {
      throw new Error('WooCommerce API returned unexpected payload (possibly captcha).');
    }

    const visibleSourceProducts = products
      .map(preferDescriptionProductImages)
      .filter((product) => isProductVisible(product));
    const productsWithAdminPrices = await attachAdminManagedPrices(visibleSourceProducts);
    const productsWithCurrencyReviews = getWordPressPriceSourceCurrency() === 'MXN'
      ? productsWithAdminPrices
      : await attachCurrencyReviews(productsWithAdminPrices);
    const normalizedProducts = normalizeWooProductsPricesToMXN(productsWithCurrencyReviews);
    const visibleProducts = String(lang).toLowerCase() === 'en'
      ? normalizeWooProductsTextToEnglish(normalizedProducts)
      : translateWooProductsDescriptionsToSpanish(normalizedProducts);

    res.status(200).json({
      success: true,
      data: visibleProducts,
      count: visibleProducts.length,
      all: fetchAllProducts,
    });
  } catch (error) {
    console.error('Error fetching products:', getWooCommerceErrorDetails(error));
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération des produits',
      error: error.message 
    });
  }
}
