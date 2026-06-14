export const parsePriceValue = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return null;

  const normalized = raw.includes(',') && !raw.includes('.')
    ? raw.replace(',', '.')
    : raw.replace(/,/g, '');

  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
};
const DEFAULT_MXN_PER_USD = 17.23;
const PRICE_FIELDS = ['price', 'regular_price', 'sale_price'];

export const getMXNPerUSD = () => {
  const configuredRate = parsePriceValue(process.env.NEXT_PUBLIC_MXN_PER_USD);
  return configuredRate && configuredRate > 0 ? configuredRate : DEFAULT_MXN_PER_USD;
};

export const getWordPressPriceSourceCurrency = () => {
  return String(process.env.NEXT_PUBLIC_WP_PRICE_SOURCE_CURRENCY || 'USD').trim().toUpperCase();
};

export const convertUSDToMXN = (value) => {
  const numeric = parsePriceValue(value);
  if (numeric === null) return null;
  return numeric * getMXNPerUSD();
};
export const getStoreMXNPrice = (value) => {
  const numeric = parsePriceValue(value);
  if (numeric === null) return null;
  return numeric;
};

export const normalizeStorePrice = getStoreMXNPrice;

export const getStoreLocaleFromPath = (pathname = '') => {
  const segment = String(pathname || '').split('/')[1];
  return segment === 'en' ? 'en' : 'es';
};

export const formatMXNPrice = (value, options = {}) => {
  const { includeCode = true, fallback = includeCode ? '$0.00 MXN' : '$0.00' } = options;
  const mxn = getStoreMXNPrice(value);

  if (mxn === null) return fallback;

  const formatted = `$${mxn.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return includeCode ? `${formatted} MXN` : formatted;
};

export const getStoreUSDPrice = getStoreMXNPrice;
export const formatUSDPrice = formatMXNPrice;
export const formatUSDPriceFromMXN = formatMXNPrice;
export const getUSDPriceFromMXN = normalizeStorePrice;

export const formatLocalizedPrice = (value, options = {}) => {
  return formatMXNPrice(value, options);
};

const formatWooPriceValue = (value) => {
  const mxn = convertUSDToMXN(value);
  if (mxn === null) return value;
  return mxn.toFixed(2);
};

const normalizePriceField = (product, field) => {
  if (!Object.prototype.hasOwnProperty.call(product, field)) {
    return product;
  }

  const value = product[field];
  if (value === null || value === undefined || value === '') {
    return product;
  }

  return {
    ...product,
    [field]: formatWooPriceValue(value),
  };
};

export const normalizeWooProductPricesToMXN = (product) => {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    return product;
  }

  if (getWordPressPriceSourceCurrency() !== 'USD') {
    return product;
  }

  const normalizedProduct = PRICE_FIELDS.reduce(normalizePriceField, product);

  return {
    ...normalizedProduct,
    price_html: '',
    meta_data: [
      ...(Array.isArray(product.meta_data) ? product.meta_data : []),
      { key: 'dosalga_price_source_currency', value: 'USD' },
      { key: 'dosalga_price_display_currency', value: 'MXN' },
      { key: 'dosalga_mxn_per_usd', value: String(getMXNPerUSD()) },
    ],
  };
};

export const normalizeWooProductsPricesToMXN = (products) => {
  if (!Array.isArray(products)) {
    return products;
  }

  return products.map(normalizeWooProductPricesToMXN);
