/**
 * API Route: /api/categories
 * Récupère toutes les catégories depuis WooCommerce
 */
import { getCategories } from '@/src/lib/woocommerce';
import { isHiddenCreamCategory } from '@/src/lib/productVisibility';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { per_page = 100, hide_empty = true } = req.query;

    const params = {
      per_page: parseInt(per_page),
      hide_empty: hide_empty === 'true'
    };

    const categories = await getCategories(params);
    const visibleCategories = Array.isArray(categories)
      ? categories.filter((category) => !isHiddenCreamCategory(category))
      : [];
    
    res.status(200).json({
      success: true,
      data: visibleCategories,
      count: visibleCategories.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération des catégories',
      error: error.message 
    });
  }
}
