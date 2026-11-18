import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCatalogPublication } from '../src/lib/catalogPublication.mjs';
import { isProductVisible } from '../src/lib/productVisibility.js';

const listing = {
  active: true,
  metadata: {
    cjPriceProposal: { savedAt: '2026-11-17T12:00:00Z' },
    wooPricePublication: { state: 'woo_verified', proposalSavedAt: '2026-11-17T12:00:00Z' },
  },
};
const product = {
  name: 'Ice Cream Color Baseball Cap',
  images: [{ src: 'https://cf.cjdropshipping.com/cap.jpg' }],
};

test('current green admin products can pass the broad cream filter', () => {
  assert.equal(isProductVisible(product), false);
  assert.equal(isProductVisible(applyCatalogPublication(product, listing)), true);
  const suitcase = { ...product, name: 'Expandable Suitcase', attributes: [{ options: ['Cream'] }] };
  assert.equal(isProductVisible(applyCatalogPublication(suitcase, listing)), true);
});

test('stale publications and cached approval flags cannot approve a product', () => {
  const stale = { ...listing, metadata: { ...listing.metadata, cjPriceProposal: { savedAt: 'later' } } };
  assert.equal(isProductVisible(applyCatalogPublication(product, stale)), false);
  assert.equal(isProductVisible(applyCatalogPublication({ ...product, admin_catalog: { approved: true } }, null)), false);
});

test('frozen or archived products stay hidden even with a green price', () => {
  for (const row of [{ ...listing, active: false }, { ...listing, metadata: { ...listing.metadata, wooFrozen: true } }]) {
    assert.equal(isProductVisible(applyCatalogPublication(product, row)), false);
    assert.equal(isProductVisible(applyCatalogPublication({ ...product, name: 'Travel Bag' }, row)), false);
  }
});

test('approval still requires a usable product image', () => {
  assert.equal(isProductVisible(applyCatalogPublication({ ...product, images: [] }, listing)), false);
});

test('ordinary white rows, failed red publications and missing listings stay hidden', () => {
  const ordinary = { ...product, name: 'Travel Bag' };
  assert.equal(isProductVisible(ordinary), false);
  assert.equal(isProductVisible(applyCatalogPublication(ordinary, { active: true, metadata: {} })), false);
  assert.equal(isProductVisible(applyCatalogPublication(ordinary, {
    ...listing, metadata: { ...listing.metadata, wooPricePublication: { state: 'failed' } },
  })), false);
});
