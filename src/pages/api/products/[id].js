/**
 * API Route: /api/products/[id]
 * Récupère un produit par ID depuis WooCommerce
 */
import { getProduct, getProductVariations } from '@/src/lib/woocommerce';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const product = await getProduct(id);

    // Guard contre les réponses HTML/captcha
    if (!product || typeof product !== 'object' || Array.isArray(product)) {
      throw new Error('Réponse produit invalide (captcha ou HTML).');
    }
    
    // Si le produit a des variations, les récupérer aussi
    let variations = [];
    if (product.type === 'variable') {
      variations = await getProductVariations(id);
    }

    res.status(200).json({
      success: true,
      data: {
        ...product,
        variations
      }
    });
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération du produit',
      error: error.message 
    });
  }
}
