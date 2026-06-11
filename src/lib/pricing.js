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
