const MXN_TO_USD_RATE = 18.5;

export const parsePriceValue = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return null;

  const normalized = raw.includes(',') && !raw.includes('.')
    ? raw.replace(',', '.')
    : raw.replace(/,/g, '');

  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
};

export const convertStorePriceToUSD = (value) => {
  const numeric = parsePriceValue(value);
  if (numeric === null) return null;
  return numeric / MXN_TO_USD_RATE;
};

export const formatUSDPrice = (value, options = {}) => {
  const { includeCode = true, fallback = includeCode ? '$0.00 USD' : '$0.00' } = options;
  const usd = convertStorePriceToUSD(value);

  if (usd === null) return fallback;

  const formatted = `$${usd.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return includeCode ? `${formatted} USD` : formatted;
};
