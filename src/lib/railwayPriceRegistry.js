const DEFAULT_REGISTRY_URL = 'https://admindosalga.vercel.app/api/price-registry';
const CACHE_TTL_MS = 10_000;

let cached = { expiresAt: 0, byWooId: new Map() };

export const registryMapFromPayload = (payload) => new Map(
  (Array.isArray(payload?.prices) ? payload.prices : [])
    .filter((price) => price?.storeCode === 'MX' && price?.wooProductId)
    .map((price) => [String(price.wooProductId), price]),
);

export const getAdminRailwayPriceRegistry = async () => {
  if (cached.expiresAt > Date.now()) return cached.byWooId;

  const url = String(process.env.ADMIN_PRICE_REGISTRY_URL || DEFAULT_REGISTRY_URL).trim();
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const byWooId = registryMapFromPayload(await response.json());
    if (!byWooId.size) throw new Error('empty registry');
    cached = { expiresAt: Date.now() + CACHE_TTL_MS, byWooId };
    return byWooId;
  } catch (error) {
    console.error(`Railway price registry unavailable (${error.message}); using the local catalogue snapshot.`);
    return cached.byWooId;
  }
};
