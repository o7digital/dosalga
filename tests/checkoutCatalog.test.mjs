import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCheckoutItems, reconcileCart, CheckoutCatalogError, catalogIds } from '../src/lib/checkoutCatalog.mjs';

const green = {
  id: 10, name: 'Approved bag', type: 'variable', price: '650.00', stock_status: 'instock', purchasable: true,
  images: [{ src: 'https://cf.cjdropshipping.com/bag.jpg' }], admin_catalog: { approved: true, blocked: false },
  variations: [{ id: 11, attributes: [{ name: 'Color', value: 'Black' }] }],
};
const line = { product_id: 10, variation_id: 11, quantity: 2, unit_price: '0.01' };

test('checkout resolves the approved MXN price and options on the server', () => {
  const [result] = validateCheckoutItems([line], [green]);
  assert.equal(result.unit_price, '650.00');
  assert.equal(result.quantity, 2);
  assert.deepEqual(result.variation_attributes, [{ attribute: 'Color', value: 'Black' }]);
});

test('non-green, missing, blocked and out-of-stock products cannot be ordered', () => {
  for (const products of [[], [{ ...green, admin_catalog: { approved: false } }],
    [{ ...green, admin_catalog: { approved: true, blocked: true } }], [{ ...green, stock_status: 'outofstock' }]]) {
    assert.throws(() => validateCheckoutItems([line], products), CheckoutCatalogError);
  }
});

test('variants from another product, missing selections and invalid quantities are rejected', () => {
  for (const change of [{ variation_id: 99 }, { variation_id: 0 }, { quantity: -1 }, { quantity: 1.5 }]) {
    assert.throws(() => validateCheckoutItems([{ ...line, ...change }], [green]), CheckoutCatalogError);
  }
  assert.throws(() => catalogIds([{ product_id: '10abc' }]), CheckoutCatalogError);
});

test('a stored cart removes withdrawn products and updates stale prices before checkout', () => {
  const result = reconcileCart([
    { id: 10, name: 'Old name', quantity: 1, price: 200, variation: { id: 11 } },
    { id: 30, name: 'Withdrawn product', quantity: 1, price: 100 },
  ], [green]);
  assert.equal(result.cart.length, 1);
  assert.equal(result.cart[0].price, 650);
  assert.equal(result.cart[0].name, green.name);
  assert.deepEqual(result.removed, [30]);
  assert.equal(result.pricesChanged, true);
});
