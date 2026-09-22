import test from 'node:test';
import assert from 'node:assert/strict';

import { registryMapFromPayload } from '../src/lib/railwayPriceRegistry.js';

test('maps only Mexico Railway price records by WooCommerce product id', () => {
  const registry = registryMapFromPayload({ prices: [
    { storeCode: 'MX', wooProductId: '11702', finalPrice: 650 },
    { storeCode: 'US', wooProductId: '44', finalPrice: 28 },
    { storeCode: 'MX', finalPrice: 100 },
  ] });

  assert.equal(registry.size, 1);
  assert.equal(registry.get('11702').finalPrice, 650);
});
