import test from 'node:test';
import assert from 'node:assert/strict';

import {
  applyRailwayPriceRegistry,
  getWooProductMXNPrice,
  normalizeWooProductPricesToMXN,
} from '../src/lib/pricing.js';

const meta = (sourceCurrency) => ([
  { key: 'dosalga_price_source_currency', value: sourceCurrency },
]);

test('keeps an explicitly persisted MXN sale price unchanged', () => {
  const product = {
    sku: 'CJEJ1477239',
    price: '650.00',
    prices: { price: '65000', currency_code: 'MXN', currency_minor_unit: 2 },
    meta_data: meta('MXN'),
  };

  const normalized = normalizeWooProductPricesToMXN(product);

  assert.equal(normalized.price, '650.00');
  assert.equal(getWooProductMXNPrice(normalized, normalized.price), 650);
});

test('converts only a product explicitly persisted as USD', () => {
  const product = {
    price: '6.62',
    prices: { price: '662', currency_code: 'MXN', currency_minor_unit: 2 },
    meta_data: meta('USD'),
  };

  assert.equal(normalizeWooProductPricesToMXN(product).price, '115.78');
});

test('keeps the legacy date fallback only until Railway has a product register', () => {
  const previousDefault = process.env.NEXT_PUBLIC_WP_PRICE_SOURCE_CURRENCY;
  process.env.NEXT_PUBLIC_WP_PRICE_SOURCE_CURRENCY = 'USD';

  try {
    const product = {
      price: '650.00',
      date_created: '2026-06-13T22:56:34',
      categories: [{ name: 'Electronics' }],
      prices: { price: '65000', currency_code: 'MXN', currency_minor_unit: 2 },
      meta_data: [],
    };

    assert.equal(normalizeWooProductPricesToMXN(product).price, '11368.50');
  } finally {
    if (previousDefault === undefined) {
      delete process.env.NEXT_PUBLIC_WP_PRICE_SOURCE_CURRENCY;
    } else {
      process.env.NEXT_PUBLIC_WP_PRICE_SOURCE_CURRENCY = previousDefault;
    }
  }
});

test('Railway register overrides a stale Woo value immediately', () => {
  const product = applyRailwayPriceRegistry({
    id: 11702,
    price: '11368.50',
    regular_price: '11368.50',
    meta_data: meta('USD'),
  }, {
    raw_price: 650,
    raw_currency: 'MXN',
    exchange_rate: 17.49,
    final_price: 650,
    final_currency: 'MXN',
    decision_source: 'admin-woo-publication',
    verified: true,
  });

  assert.equal(product.price, '650.00');
  assert.equal(product.sourcePrice, 650);
  assert.equal(product.sourceCurrency, 'MXN');
  assert.equal(product.priceRegistry.verified, true);
  assert.equal(product.meta_data.find((entry) => entry.key === 'dosalga_price_origin_currency').value, 'MXN');
  assert.equal(product.meta_data.find((entry) => entry.key === 'dosalga_price_source_currency').value, 'MXN');
});

test('Railway register exposes USD origin but marks the stored storefront value as MXN', () => {
  const product = applyRailwayPriceRegistry({ id: 12722, price: '11.57', meta_data: [] }, {
    raw_price: 11.57,
    raw_currency: 'USD',
    exchange_rate: 17.49,
    final_price: 202.36,
    final_currency: 'MXN',
    decision_source: 'manual-product-review',
    verified: true,
  });

  assert.equal(product.price, '202.36');
  assert.equal(product.meta_data.find((entry) => entry.key === 'dosalga_price_origin_currency').value, 'USD');
  assert.equal(product.meta_data.find((entry) => entry.key === 'dosalga_price_value_currency').value, 'MXN');
  assert.equal(getWooProductMXNPrice(product, product.price), 202.36);
});

test('normalization is idempotent and replaces managed metadata instead of duplicating it', () => {
  const product = {
    price: '6.62',
    regular_price: '6.62',
    meta_data: [
      ...meta('USD'),
      { key: 'unrelated', value: 'preserved' },
    ],
  };

  const once = normalizeWooProductPricesToMXN(product);
  const twice = normalizeWooProductPricesToMXN(once);

  assert.equal(once.price, '115.78');
  assert.equal(twice.price, once.price);
  assert.equal(twice.regular_price, once.regular_price);
  assert.equal(twice.meta_data.filter((entry) => entry.key === 'dosalga_price_source_currency').length, 1);
  assert.equal(twice.meta_data.filter((entry) => entry.key === 'dosalga_price_value_currency').length, 1);
  assert.deepEqual(twice.meta_data.find((entry) => entry.key === 'unrelated'), {
    key: 'unrelated',
    value: 'preserved',
  });
});
