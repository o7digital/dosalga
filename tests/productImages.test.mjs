import test from 'node:test';
import assert from 'node:assert/strict';
import { preferDescriptionProductImages, getPrimaryProductImageSrc } from '../src/lib/productVisibility.js';
import { canOptimizeProductImage } from '../src/lib/productImages.cjs';

test('catalogue photo stays primary instead of a large description banner', () => {
  const product = preferDescriptionProductImages({ images: [{ src: 'https://cf.cjdropshipping.com/photo.jpg' }], description: '<img src="https://cf.cjdropshipping.com/detail.jpg">' });
  assert.equal(getPrimaryProductImageSrc(product), 'https://cf.cjdropshipping.com/photo.jpg');
  assert.equal(product.images[1].src, 'https://cf.cjdropshipping.com/detail.jpg');
});
test('description photos remain fallback when the catalogue has no photo and duplicate URLs are removed', () => {
  const product = preferDescriptionProductImages({ images: [], description: '<img src="https://cf.cjdropshipping.com/one.jpg"><img src="https://cf.cjdropshipping.com/two.jpg"><img src="https://cf.cjdropshipping.com/one.jpg">' });
  assert.equal(product.images.length, 2);
  assert.equal(getPrimaryProductImageSrc(product), 'https://cf.cjdropshipping.com/one.jpg');
});
test('only configured HTTPS image origins use the shared image optimizer', () => {
  assert.equal(canOptimizeProductImage('https://cf.cjdropshipping.com/photo.jpg'), true);
  assert.equal(canOptimizeProductImage('/assets/img/product-photo-unavailable.svg'), true);
  assert.equal(canOptimizeProductImage('http://cf.cjdropshipping.com/photo.jpg'), false);
  assert.equal(canOptimizeProductImage('https://example.com/photo.jpg'), false);
});


test('card payload keeps searchable text and cart data without sending full image galleries', async () => {
  const { toCatalogueCard } = await import('../src/lib/catalogueCard.mjs');
  const source = { id: 1, price: '1090', variations: [{ id: 3 }], _links: { self: [] }, meta_data: [{ key: 'currency', value: 'MXN' }], description: '<p>Find this text</p><img src="https://cf.cjdropshipping.com/detail.jpg">', images: Array.from({ length: 8 }, (_, index) => ({ src: `https://cf.cjdropshipping.com/${index}.jpg`, srcset: 'large metadata', alt: 'Photo' })) };
  const card = toCatalogueCard(source);
  assert.equal(card.description, 'Find this text');
  assert.equal(card.images.length, 4);
  assert.equal(card.images[0].srcset, undefined);
  assert.equal(card.price, source.price);
  assert.deepEqual(card.meta_data, source.meta_data);
  assert.equal(source.images.length, 8);
  assert.equal(card.variations, undefined);
  assert.equal(card._links, undefined);
  assert.equal(source.variations.length, 1);
});
