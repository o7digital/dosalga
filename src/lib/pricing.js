export const parsePriceValue = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return null;

  const normalized = raw.includes(',') && !raw.includes('.')
    ? raw.replace(',', '.')
    : raw.replace(/,/g, '');

  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
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
