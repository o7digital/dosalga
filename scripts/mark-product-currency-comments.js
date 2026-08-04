const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const FALLBACK_WORDPRESS_URL = 'https://oliviers44.sg-host.com';
const FALLBACK_KEY = 'ck_962f8b4455545de9a9a6155616535fdf8d9eb1db';
const FALLBACK_SECRET = 'cs_4242ab75e9fb88408afd2961efb76b7ce9211bc9';
const MAX_PRODUCTS_PER_PAGE = 100;
const MXN_IMPORT_CUTOFF = '2026-08-03T00:00:00';
const USD_MARKER = 'CURRENCY=USD';
const MXN_MARKER = 'MXN-PRICE';

const normalizeWordPressUrl = (value) => {
  const rawUrl = String(value || '').trim();
  if (!rawUrl) return FALLBACK_WORDPRESS_URL;

  try {
    return new URL(rawUrl).origin;
  } catch {
    return FALLBACK_WORDPRESS_URL;
  }
};

const normalizeReviewText = (value) => {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .trim()
    .toUpperCase();
};

const hasCurrencyMarker = (reviews) => {
  return reviews.some((review) => {
    const text = normalizeReviewText(review?.review || review?.content?.rendered || review?.content);
    return text.includes(USD_MARKER) || text.includes(MXN_MARKER) || text.includes('CURRENCY=MXN');
  });
};

const getProductMarker = (product) => {
  const createdAt = String(product.date_created || product.date_created_gmt || '').slice(0, 19);
  return createdAt >= MXN_IMPORT_CUTOFF ? MXN_MARKER : USD_MARKER;
};

const fetchAllPages = async (api, endpoint, params = {}) => {
  const results = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await api.get(endpoint, {
      ...params,
      per_page: MAX_PRODUCTS_PER_PAGE,
      page,
    });

    if (!Array.isArray(response.data)) {
      throw new Error(`Unexpected WooCommerce payload for ${endpoint} page ${page}.`);
    }

    results.push(...response.data);
    totalPages = Number.parseInt(response.headers?.['x-wp-totalpages'] || '1', 10);
    page += 1;
  } while (page <= totalPages);

  return results;
};

const main = async () => {
  const dryRun = process.argv.includes('--dry-run');
  const api = new WooCommerceRestApi({
    url: normalizeWordPressUrl(
      process.env.WORDPRESS_URL
      || process.env.WOOCOMMERCE_URL
      || process.env.NEXT_PUBLIC_WORDPRESS_URL
    ),
    consumerKey: process.env.WC_CONSUMER_KEY || FALLBACK_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET || FALLBACK_SECRET,
    version: 'wc/v3',
    queryStringAuth: true,
    axiosConfig: {
      headers: {
        'User-Agent': 'DOSALGA currency marker sync',
        Accept: 'application/json',
      },
      timeout: 15000,
    },
  });

  const products = await fetchAllPages(api, 'products', { status: 'publish' });
  const counts = { created: 0, skipped: 0, failed: 0, dryRun: 0 };

  for (const product of products) {
    try {
      const reviews = await fetchAllPages(api, 'products/reviews', { product: product.id });

      if (hasCurrencyMarker(reviews)) {
        counts.skipped += 1;
        continue;
      }

      const marker = getProductMarker(product);

      if (dryRun) {
        counts.dryRun += 1;
        console.log(`dry-run: #${product.id} ${product.name} -> ${marker}`);
        continue;
      }

      await api.post('products/reviews', {
        product_id: product.id,
        review: marker,
        reviewer: 'DOSALGA Currency Marker',
        reviewer_email: 'dosalga.fac@gmail.com',
        rating: 5,
      });

      counts.created += 1;
      console.log(`created: #${product.id} ${product.name} -> ${marker}`);
    } catch (error) {
      counts.failed += 1;
      console.error(`failed: #${product.id} ${product.name}: ${error.message}`);
    }
  }

  console.log(`Done. created=${counts.created} dryRun=${counts.dryRun} skipped=${counts.skipped} failed=${counts.failed}`);

  if (counts.failed > 0) {
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
