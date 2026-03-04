/**
 * API Route: /api/categories
 * Récupère toutes les catégories depuis WooCommerce
 */
import { getCategories } from '@/src/lib/woocommerce';

export default async function handler(req, res) {
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
    
    res.status(200).json({
      success: true,
      data: categories,
      count: categories.length
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
