import { isProductVisible } from './productVisibility.js';

export class CheckoutCatalogError extends Error {
  constructor(message, status = 409) {
    super(message);
    this.status = status;
  }
}

export const catalogIds = (items, idKey = 'product_id') => {
  if (!Array.isArray(items) || !items.length || items.length > 100) {
    throw new CheckoutCatalogError('El carrito no es válido.', 400);
  }
  const ids = items.map(item => Number(item?.[idKey]));
  if (ids.some(id => !Number.isSafeInteger(id) || id <= 0)) {
    throw new CheckoutCatalogError('El carrito contiene una referencia inválida.', 400);
  }
  return [...new Set(ids)];
};

export const validateCheckoutItems = (items, products) => {
  catalogIds(items);
  const byId = new Map(products.map(product => [Number(product.id), product]));
  return items.map(item => {
    const product = byId.get(Number(item.product_id));
    if (!isProductVisible(product) || product.stock_status === 'outofstock'
        || product.is_in_stock === false || product.purchasable === false || !(Number(product.price) > 0)) {
      throw new CheckoutCatalogError('Un producto ya no está disponible. Actualiza tu carrito antes de comprar.');
    }
    const quantity = Number(item.quantity);
    if (!Number.isSafeInteger(quantity) || quantity <= 0) throw new CheckoutCatalogError('La cantidad no es válida.', 400);
    const variationId = Number(item.variation_id || 0);
    const reference = (product.variations || []).find(variation => Number(typeof variation === 'object' ? variation.id : variation) === variationId);
    if ((product.type === 'variable' && !reference) || (product.type !== 'variable' && variationId)) {
      throw new CheckoutCatalogError('Selecciona las opciones disponibles del producto antes de comprar.');
    }
    if (reference?.stock_status === 'outofstock' || reference?.purchasable === false) {
      throw new CheckoutCatalogError('La opción seleccionada ya no está disponible.');
    }
    return {
      ...item,
      product_id: Number(product.id), quantity,
      variation_id: product.type === 'variable' ? variationId : undefined,
      unit_price: Number(product.price).toFixed(2),
      variation_attributes: reference && Array.isArray(reference.attributes)
        ? reference.attributes.map(attribute => ({
          attribute: attribute.slug || attribute.name,
          value: attribute.value || attribute.option,
        })) : [],
    };
  });
};

export const reconcileCart = (cart, products) => {
  const kept = [], removed = [];
  let pricesChanged = false;
  for (const item of cart) {
    try {
      const [validated] = validateCheckoutItems([{
        product_id: item.id, quantity: item.quantity, variation_id: item.variation?.id,
      }], products);
      const product = products.find(product => Number(product.id) === validated.product_id);
      pricesChanged ||= Number(item.price) !== Number(validated.unit_price);
      kept.push({ ...item, name: product.name, price: Number(validated.unit_price), stock_status: product.stock_status });
    } catch (error) {
      if (!(error instanceof CheckoutCatalogError)) throw error;
      removed.push(item.id);
    }
  }
  return { cart: kept, removed, pricesChanged };
};
