const DEFAULT_WOOCOMMERCE_REFRESH_MS = 30000;
const MIN_WOOCOMMERCE_REFRESH_MS = 5000;

export const getWooCommerceRefreshIntervalMs = (value = process.env.NEXT_PUBLIC_WP_REFRESH_MS) => {
  if (value === 0 || value === '0') {
    return 0;
  }

  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return DEFAULT_WOOCOMMERCE_REFRESH_MS;
  }

  return Math.max(parsedValue, MIN_WOOCOMMERCE_REFRESH_MS);
};
