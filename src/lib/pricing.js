export const parsePriceValue = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return null;

  const normalized = raw.includes(',') && !raw.includes('.')
    ? raw.replace(',', '.')
    : raw.replace(/,/g, '');

  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
};

const DEFAULT_MXN_PER_USD = 17.49;
const PRICE_FIELDS = ['price', 'regular_price', 'sale_price'];
const MXN_IMPORT_CUTOFF = '2026-08-03T00:00:00';

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

const getMetaValue = (product, key) => {
  const entry = Array.isArray(product?.meta_data)
    ? product.meta_data.find((meta) => meta?.key === key)
    : null;

  return entry?.value ?? null;
};

const normalizeCurrencyCode = (value) => {
  const currency = String(value || '').trim().toUpperCase();
  return currency === 'MXN' || currency === 'USD' ? currency : null;
};

const getExplicitProductCurrency = (product) => {
  return normalizeCurrencyCode(
    getMetaValue(product, 'dosalga_price_source_currency')
    || product?.sourceCurrency
    || product?.source_currency
  );
};

const getPersistedValueCurrency = (product) => normalizeCurrencyCode(
  getMetaValue(product, 'dosalga_price_value_currency')
  || product?.priceValueCurrency
  || product?.price_value_currency
);

const normalizeCurrencyMarkerText = (value) => {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .trim()
    .toUpperCase();
};

export const getProductCommentCurrency = (product) => {
  const comments = [
    product?.currency_comment,
    product?.price_currency_comment,
    ...(Array.isArray(product?.reviews) ? product.reviews : []),
  ];

  for (const comment of comments) {
    const text = normalizeCurrencyMarkerText(
      typeof comment === 'string'
        ? comment
        : comment?.review || comment?.content?.rendered || comment?.content
    );

    if (text.includes('MXN-PRICE') || text.includes('CURRENCY=MXN')) {
      return 'MXN';
    }

    if (text.includes('CURRENCY=USD') || text.includes('USD-PRICE')) {
      return 'USD';
    }
  }

  return null;
};

export const isImportedMXNProduct = (product) => {
  const commentCurrency = getProductCommentCurrency(product);

  if (commentCurrency) {
    return commentCurrency === 'MXN';
  }

  const sourceCurrency = String(getMetaValue(product, 'dosalga_price_source_currency') || '').trim().toUpperCase();

  if (sourceCurrency === 'MXN') {
    return true;
  }

  // The swimsuit catalogue was imported with final MXN amounts, unlike the
  // older CJ catalogue whose numeric prices are USD. Keep those prices as-is.
  const categoryText = (Array.isArray(product?.categories) ? product.categories : [])
    .map((category) => category?.name || category?.slug || category)
    .join(' ')
    .toUpperCase();
  if (/SWIMSUIT|SWIMWEAR|TRAJE(?:S)? DE BA[ÑN]O|BA[ÑN]ADOR/.test(categoryText)) {
    return true;
  }

  const rawDate = product?.date_created || product?.date_created_gmt;
  if (!rawDate) {
    return false;
  }

  return String(rawDate).slice(0, 19) >= MXN_IMPORT_CUTOFF;
};

export const getWooProductMXNPrice = (product, value) => {
  const numeric = parsePriceValue(value);
  if (numeric === null) return null;

  // A value already normalized and persisted in Railway must be idempotent.
  // The per-product source marker is the only authority for conversion: the
  // Store API currency and catalogue-wide defaults cannot describe mixed
  // legacy/CJ imports safely.
  const explicitCurrency = getPersistedValueCurrency(product)
    || getExplicitProductCurrency(product);

  if (explicitCurrency === 'MXN') return numeric;
  if (explicitCurrency === 'USD') return numeric * getMXNPerUSD();

  // Legacy products predate the Railway register. Keep the existing marker/date
  // bootstrap only for those unregistered records; the register takes over as
  // soon as a per-product decision exists.
  const rawDate = product?.date_created || product?.date_created_gmt;
  if (rawDate || Array.isArray(product?.categories)) {
    return isImportedMXNProduct(product) ? numeric : numeric * getMXNPerUSD();
  }

  const sourceCurrency = getWordPressPriceSourceCurrency();
  return sourceCurrency === 'MXN' ? numeric : numeric * getMXNPerUSD();
};

const formatWooPriceValue = (product, value) => {
  const mxn = getWooProductMXNPrice(product, value);
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
    [field]: formatWooPriceValue(product, value),
  };
};

export const normalizeWooProductPricesToMXN = (product) => {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    return product;
  }

  const normalizedProduct = PRICE_FIELDS.reduce(normalizePriceField, product);
  const explicitSourceCurrency = getExplicitProductCurrency(product);
  const managedMetaKeys = new Set([
    'dosalga_price_origin_currency',
    'dosalga_price_source_currency',
    'dosalga_price_display_currency',
    'dosalga_price_value_currency',
    'dosalga_mxn_per_usd',
  ]);
  const metadata = (Array.isArray(product.meta_data) ? product.meta_data : [])
    .filter((entry) => !managedMetaKeys.has(entry?.key));

  return {
    ...normalizedProduct,
    price_html: '',
    meta_data: [
      ...metadata,
      ...(explicitSourceCurrency
        ? [{ key: 'dosalga_price_source_currency', value: explicitSourceCurrency }]
        : []),
      { key: 'dosalga_price_display_currency', value: 'MXN' },
      { key: 'dosalga_price_value_currency', value: 'MXN' },
      { key: 'dosalga_mxn_per_usd', value: String(getMXNPerUSD()) },
    ],
  };
};

export const normalizeWooProductsPricesToMXN = (products) => {
  if (!Array.isArray(products)) {
    return products;
  }

  return products.map(normalizeWooProductPricesToMXN);

};

export const applyRailwayPriceRegistry = (product, registry) => {
  if (!product || !registry) return product;
  const finalPrice = parsePriceValue(registry.final_price ?? registry.finalPrice);
  const rawPrice = parsePriceValue(registry.raw_price ?? registry.rawPrice);
  const rawCurrency = normalizeCurrencyCode(registry.raw_currency ?? registry.rawCurrency);
  const finalCurrency = normalizeCurrencyCode(registry.final_currency ?? registry.finalCurrency);
  const exchangeRate = parsePriceValue(registry.exchange_rate ?? registry.exchangeRate);
  if (finalPrice === null || rawPrice === null || !rawCurrency || !finalCurrency || exchangeRate === null) return product;

  const managedMetaKeys = new Set([
    'dosalga_price_origin_currency',
    'dosalga_price_source_currency',
    'dosalga_price_display_currency',
    'dosalga_price_value_currency',
    'dosalga_mxn_per_usd',
  ]);
  const metaData = (Array.isArray(product.meta_data) ? product.meta_data : [])
    .filter((entry) => !managedMetaKeys.has(entry?.key));
  const formatted = finalPrice.toFixed(2);

  return {
    ...product,
    price: formatted,
    regular_price: formatted,
    ...(product.sale_price ? { sale_price: formatted } : {}),
    sourcePrice: rawPrice,
    sourceCurrency: rawCurrency,
    priceValueCurrency: finalCurrency,
    priceRegistry: {
      rawPrice,
      rawCurrency,
      exchangeRate,
      finalPrice,
      finalCurrency,
      decisionSource: registry.decision_source ?? registry.decisionSource,
      verified: registry.verified === true,
      updatedAt: registry.updated_at ?? registry.updatedAt ?? null,
    },
    meta_data: [
      ...metaData,
      { key: 'dosalga_price_origin_currency', value: rawCurrency },
      { key: 'dosalga_price_source_currency', value: finalCurrency },
      { key: 'dosalga_price_display_currency', value: finalCurrency },
      { key: 'dosalga_price_value_currency', value: finalCurrency },
      { key: 'dosalga_mxn_per_usd', value: String(exchangeRate) },
    ],
  };
};
