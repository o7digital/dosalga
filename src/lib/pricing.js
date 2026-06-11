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

const DEFAULT_MXN_PER_USD = 18.5;

export const getStoreLocaleFromPath = (pathname = '') => {
  const segment = String(pathname || '').split('/')[1];
  return segment === 'es' ? 'es' : 'en';
};

export const getDisplayCurrencyForLocale = (locale = 'en') => (
  locale === 'es' ? 'MXN' : 'USD'
);

export const getMxnPerUsdRate = () => {
  const configuredRate = Number.parseFloat(process.env.NEXT_PUBLIC_MXN_PER_USD || '');
  return Number.isFinite(configuredRate) && configuredRate > 0
    ? configuredRate
    : DEFAULT_MXN_PER_USD;
};

export const formatMXNPrice = (value, options = {}) => {
  const { includeCode = true, fallback = includeCode ? '$0.00 MXN' : '$0.00' } = options;
  const mxn = normalizeStorePrice(value);

  if (mxn === null) return fallback;

  const formatted = `$${mxn.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return includeCode ? `${formatted} MXN` : formatted;
};

export const formatUSDPriceFromMXN = (value, options = {}) => {
  const { includeCode = true, fallback = includeCode ? '$0.00 USD' : '$0.00' } = options;
  const mxn = normalizeStorePrice(value);

  if (mxn === null) return fallback;

  const usd = mxn / getMxnPerUsdRate();
  const formatted = `$${usd.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return includeCode ? `${formatted} USD` : formatted;
};

export const formatLocalizedPrice = (value, options = {}) => {
  const locale = options.locale || getStoreLocaleFromPath(options.pathname);
  const currency = options.currency || getDisplayCurrencyForLocale(locale);

  if (currency === 'MXN') {
    return formatMXNPrice(value, options);
  }

  return formatUSDPriceFromMXN(value, options);
};
