/**
 * API Route: /api/products
 * Récupère tous les produits depuis WooCommerce
 */
import { getAllProducts, getProducts } from '@/src/lib/woocommerce';
import { normalizeWooProductsPricesToMXN } from '@/src/lib/pricing';
import { translateWooProductsDescriptionsToSpanish } from '@/src/lib/productText';
import { isProductVisible } from '@/src/lib/productVisibility';

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

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');

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
    if (search) params.search = search;
    if (on_sale !== undefined) params.on_sale = isTrue(on_sale);
    if (featured !== undefined) params.featured = isTrue(featured);

    const products = fetchAllProducts
      ? await getAllProducts(params)
      : await getProducts(params);

    // Guard: if upstream (SiteGround captcha) returns HTML/string, treat as error
    if (!Array.isArray(products)) {
      throw new Error('WooCommerce API returned unexpected payload (possibly captcha).');
    }

    const normalizedProducts = normalizeWooProductsPricesToMXN(
      products.filter((product) => isProductVisible(product))
    );
    const visibleProducts = String(lang).toLowerCase() === 'en'
      ? normalizedProducts
      : translateWooProductsDescriptionsToSpanish(normalizedProducts);

    res.status(200).json({
      success: true,
      data: visibleProducts,
      count: visibleProducts.length,
      all: fetchAllProducts,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération des produits',
      error: error.message 
    });
  }
}
