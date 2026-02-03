/**
 * API Route: /api/products
 * Récupère tous les produits depuis WooCommerce
 */
import { getProducts } from '@/src/lib/woocommerce';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      page = 1, 
      per_page = 10, 
      category, 
      search, 
      orderby = 'date', 
      order = 'desc',
      on_sale,
      featured
    } = req.query;

    const params = {
      page: parseInt(page),
      per_page: parseInt(per_page),
      orderby,
      order,
    };

    // Ajouter les filtres optionnels
    if (category) params.category = category;
    if (search) params.search = search;
    if (on_sale) params.on_sale = on_sale === 'true';
    if (featured) params.featured = featured === 'true';

    const products = await getProducts(params);

    // Guard: if upstream (SiteGround captcha) returns HTML/string, treat as error
    if (!Array.isArray(products)) {
      throw new Error('WooCommerce API returned unexpected payload (possibly captcha).');
    }

    res.status(200).json({
      success: true,
      data: products,
      count: products.length
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
