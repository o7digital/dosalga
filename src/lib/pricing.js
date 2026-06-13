export const parsePriceValue = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return null;

  const normalized = raw.includes(',') && !raw.includes('.')
    ? raw.replace(',', '.')
    : raw.replace(/,/g, '');

  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
};

export const normalizeStorePrice = (value) => {
  const numeric = parsePriceValue(value);
  if (numeric === null) return null;
  return numeric;
};

export const getStoreLocaleFromPath = (pathname = '') => {
  const segment = String(pathname || '').split('/')[1];
  return segment === 'es' ? 'es' : 'en';
};

export const formatUSDPrice = (value, options = {}) => {
  const { includeCode = true, fallback = includeCode ? '$0.00 USD' : '$0.00' } = options;
  const usd = normalizeStorePrice(value);

  if (usd === null) return fallback;

  const formatted = `$${usd.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return includeCode ? `${formatted} USD` : formatted;
};

export const formatUSDPriceFromMXN = formatUSDPrice;
export const formatMXNPrice = formatUSDPrice;
export const getUSDPriceFromMXN = normalizeStorePrice;

export const formatLocalizedPrice = (value, options = {}) => {
  return formatUSDPrice(value, options);
};
