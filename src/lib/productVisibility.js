const HIDDEN_PRODUCT_TERMS = ['cream', 'creme', 'crema'];

const normalizeVisibilityText = (value) => (
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
);

const collectListValues = (items = [], fields = ['name', 'slug']) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.flatMap((item) => {
    if (!item || typeof item !== 'object') {
      return [item];
    }

    return fields.map((field) => item[field]);
  });
};

const getAttributeOptions = (attributes) => {
  if (!Array.isArray(attributes)) {
    return [];
  }

  return attributes.flatMap((attribute) => attribute?.options || []);
};

const getProductVisibilityValues = (product = {}) => [
  product.name,
  product.slug,
  product.sku,
  ...collectListValues(product.categories),
  ...collectListValues(product.tags),
  ...collectListValues(product.attributes, ['name', 'slug', 'option']),
  ...collectListValues(getAttributeOptions(product.attributes)),
];

export const getVisibleProductImages = (product) => {
  if (!Array.isArray(product?.images)) {
    return [];
  }

  return product.images.filter((image) => {
    const src = typeof image === 'string' ? image : image?.src;

    if (!src) {
      return false;
    }

    const normalizedSrc = normalizeVisibilityText(src);
    return !normalizedSrc.includes('placeholder');
  });
};

export const getPrimaryProductImageSrc = (product) => {
  const image = getVisibleProductImages(product)[0];
  return typeof image === 'string' ? image : image?.src || '';
};

export const hasVisibleProductImage = (product) => (
  Boolean(getPrimaryProductImageSrc(product))
);

export const isBlockedCreamProduct = (product) => {
  const haystack = getProductVisibilityValues(product)
    .filter(Boolean)
    .map(normalizeVisibilityText)
    .join(' ');

  return HIDDEN_PRODUCT_TERMS.some((term) => haystack.includes(term));
};

export const isHiddenCreamCategory = (category) => {
  const haystack = [
    category?.name,
    category?.slug,
    category?.description,
  ]
    .filter(Boolean)
    .map(normalizeVisibilityText)
    .join(' ');

  return HIDDEN_PRODUCT_TERMS.some((term) => haystack.includes(term));
};

export const isProductVisible = (product) => (
  hasVisibleProductImage(product)
  && !isBlockedCreamProduct(product)
);
