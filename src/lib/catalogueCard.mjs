const plainText = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

// Listing cards do not need HTML galleries or WordPress srcset metadata.
// Keep searchable text and pricing/cart fields; full details have their own API.
export function toCatalogueCard(product) {
  const card = { ...product };
  delete card.variations;
  delete card._links;
  delete card.add_to_cart;
  return {
    ...card,
    description: plainText(product.description),
    short_description: plainText(product.short_description),
    images: (product.images || []).slice(0, 4).map(image => typeof image === 'string'
      ? { src: image, alt: product.name || '' }
      : { id: image.id, src: image.src, alt: image.alt || product.name || '' }),
  };
}
