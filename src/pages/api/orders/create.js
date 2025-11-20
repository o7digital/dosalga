/**
 * API Route: /api/orders/create
 * Crée une commande dans WooCommerce
 */
import { createOrder } from '@/src/lib/woocommerce';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const orderData = req.body;

    // Validation basique
    if (!orderData.line_items || orderData.line_items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Le panier est vide'
      });
    }

    if (!orderData.billing) {
      return res.status(400).json({
        success: false,
        message: 'Les informations de facturation sont requises'
      });
    }

    const order = await createOrder(orderData);
    
    res.status(201).json({
      success: true,
      data: order,
      message: 'Commande créée avec succès'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la création de la commande',
      error: error.message 
    });
  }
}
