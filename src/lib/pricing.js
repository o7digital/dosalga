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

export const getStoreUSDPrice = normalizeStorePrice;

export const getUSDToMXNRate = () => {
  const configuredRate = parsePriceValue(process.env.NEXT_PUBLIC_USD_TO_MXN_RATE);
  return configuredRate && configuredRate > 0 ? configuredRate : 20;
};

export const getMXNPriceFromUSD = (value) => {
  const usd = getStoreUSDPrice(value);
  if (usd === null) return null;
  return usd * getUSDToMXNRate();
};

export const getStoreLocaleFromPath = (pathname = '') => {
  const segment = String(pathname || '').split('/')[1];
  return segment === 'en' ? 'en' : 'es';
};

export const formatUSDPrice = (value, options = {}) => {
  const { includeCode = true, fallback = includeCode ? '$0.00 USD' : '$0.00' } = options;
  const usd = getStoreUSDPrice(value);

  if (usd === null) return fallback;

  const formatted = `$${usd.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return includeCode ? `${formatted} USD` : formatted;
};

export const formatMXNPrice = (value, options = {}) => {
  const { includeCode = true, fallback = includeCode ? '$0.00 MXN' : '$0.00' } = options;
  const mxn = getMXNPriceFromUSD(value);

  if (mxn === null) return fallback;

  const formatted = mxn.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return includeCode ? `${formatted} MXN` : formatted;
};

export const formatUSDPriceFromMXN = formatUSDPrice;
export const getUSDPriceFromMXN = getStoreUSDPrice;

export const formatLocalizedPrice = (value, options = {}) => {
  return formatMXNPrice(value, options);
};
