import { getCatalogProducts } from '@/src/lib/catalogRepository';
import { catalogIds, reconcileCart, CheckoutCatalogError } from '@/src/lib/checkoutCatalog.mjs';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });
  try {
    const cart = req.body?.cart;
    if (Array.isArray(cart) && cart.length === 0) return res.status(200).json({ success: true, cart: [], removed: [], pricesChanged: false });
    const ids = catalogIds(cart, 'id');
    const products = await getCatalogProducts({ ids, all: true });
    return res.status(200).json({ success: true, ...reconcileCart(cart, products) });
  } catch (error) {
    return res.status(error instanceof CheckoutCatalogError ? error.status : 503).json({
      success: false, message: error instanceof CheckoutCatalogError ? error.message : 'No se pudo actualizar el carrito. Inténtalo de nuevo.',
    });
  }
}
