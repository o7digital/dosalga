const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const FALLBACK_WORDPRESS_URL = 'https://oliviers44.sg-host.com';
const MAX_PRODUCTS_PER_PAGE = 100;
const PRICE_FIELDS = ['regular_price', 'sale_price'];

const parsePriceValue = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return null;

  const normalized = raw.includes(',') && !raw.includes('.')
    ? raw.replace(',', '.')
    : raw.replace(/,/g, '');

  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
};

const normalizeWordPressUrl = (value) => {
  const rawUrl = String(value || '').trim();
  if (!rawUrl) return FALLBACK_WORDPRESS_URL;

  try {
    return new URL(rawUrl).origin;
  } catch {
    return FALLBACK_WORDPRESS_URL;
  }
};

const getMetaValue = (product, key) => {
  const entry = Array.isArray(product.meta_data)
    ? product.meta_data.find((meta) => meta?.key === key)
    : null;

  return entry?.value ?? null;
};

const buildMetaData = ({ sourcePrice, convertedPrice, rate }) => [
  { key: 'dosalga_price_source_currency', value: 'USD' },
  { key: 'dosalga_price_display_currency', value: 'MXN' },
  { key: 'dosalga_mxn_per_usd', value: String(rate) },
  { key: 'dosalga_last_usd_price', value: sourcePrice.toFixed(2) },
  { key: 'dosalga_last_mxn_price', value: convertedPrice.toFixed(2) },
  { key: 'dosalga_price_converted_at', value: new Date().toISOString() },
];

const getWritablePriceFields = (product) => {
  return PRICE_FIELDS.filter((field) => {
    const value = product[field];
    return value !== null && value !== undefined && value !== '';
  });
};

const shouldConvertProduct = (product, sourcePrice) => {
  const lastMXNPrice = parsePriceValue(getMetaValue(product, 'dosalga_last_mxn_price'));

  if (lastMXNPrice === null) {
    return true;
  }

  return Math.abs(sourcePrice - lastMXNPrice) > 0.01;
};

const fetchAllProducts = async (api) => {
  const products = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await api.get('products', {
      status: 'publish',
      per_page: MAX_PRODUCTS_PER_PAGE,
      page,
    });

    if (!Array.isArray(response.data)) {
      throw new Error(`Unexpected WooCommerce payload on page ${page}.`);
    }

    products.push(...response.data);
    totalPages = Number.parseInt(response.headers?.['x-wp-totalpages'] || '1', 10);
    page += 1;
  } while (page <= totalPages);

  return products;
};

const fetchProductVariations = async (api, productId) => {
  const variations = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await api.get(`products/${productId}/variations`, {
      per_page: MAX_PRODUCTS_PER_PAGE,
      page,
    });

    if (!Array.isArray(response.data)) {
      throw new Error(`Unexpected WooCommerce variations payload for product ${productId}.`);
    }

    variations.push(...response.data);
    totalPages = Number.parseInt(response.headers?.['x-wp-totalpages'] || '1', 10);
    page += 1;
  } while (page <= totalPages);

  return variations;
};

const updatePriceResource = async ({ api, resource, endpoint, rate, dryRun }) => {
  const fields = getWritablePriceFields(resource);
  if (fields.length === 0) {
    return { status: 'skipped', reason: 'no writable price field' };
  }

  const sourcePrice = parsePriceValue(resource.regular_price || resource.price);
  if (sourcePrice === null || !shouldConvertProduct(resource, sourcePrice)) {
    return { status: 'skipped', reason: 'already converted' };
  }

  const convertedPrice = sourcePrice * rate;
  const payload = fields.reduce((nextPayload, field) => {
    const fieldSourcePrice = parsePriceValue(resource[field]);
    if (fieldSourcePrice === null) return nextPayload;

    return {
      ...nextPayload,
      [field]: (fieldSourcePrice * rate).toFixed(2),
    };
  }, {
    meta_data: buildMetaData({ sourcePrice, convertedPrice, rate }),
  });

  if (dryRun) {
    return {
      status: 'dry-run',
      before: sourcePrice.toFixed(2),
      after: convertedPrice.toFixed(2),
    };
  }

  await api.put(endpoint, payload);

  return {
    status: 'updated',
    before: sourcePrice.toFixed(2),
    after: convertedPrice.toFixed(2),
  };
};

const updateProduct = async ({ api, product, rate, dryRun }) => {
  if (product.type !== 'variable') {
    return [
      await updatePriceResource({
        api,
        resource: product,
        endpoint: `products/${product.id}`,
        rate,
        dryRun,
      }),
    ];
  }

  const variations = await fetchProductVariations(api, product.id);

  if (variations.length === 0) {
    return [{ status: 'skipped', reason: 'no variations' }];
  }

  const results = [];

  for (const variation of variations) {
    results.push(
      await updatePriceResource({
        api,
        resource: variation,
        endpoint: `products/${product.id}/variations/${variation.id}`,
        rate,
        dryRun,
      })
    );
  }

  return results;
};

const main = async () => {
  const rate = parsePriceValue(process.env.MXN_PER_USD || process.env.NEXT_PUBLIC_MXN_PER_USD) || 17.23;
  const dryRun = process.argv.includes('--dry-run');

  const api = new WooCommerceRestApi({
    url: normalizeWordPressUrl(
      process.env.WORDPRESS_URL
      || process.env.WOOCOMMERCE_URL
      || process.env.NEXT_PUBLIC_WORDPRESS_URL
    ),
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: 'wc/v3',
    queryStringAuth: true,
    axiosConfig: {
      headers: {
        'User-Agent': 'DOSALGA price sync',
        Accept: 'application/json',
      },
      timeout: 15000,
    },
  });

  if (!process.env.WC_CONSUMER_KEY || !process.env.WC_CONSUMER_SECRET) {
    throw new Error('WC_CONSUMER_KEY and WC_CONSUMER_SECRET are required.');
  }

  const products = await fetchAllProducts(api);
  const counts = { updated: 0, skipped: 0, dryRun: 0, failed: 0 };

  for (const product of products) {
    try {
      const results = await updateProduct({ api, product, rate, dryRun });

      for (const result of results) {
        if (result.status === 'updated') counts.updated += 1;
        if (result.status === 'skipped') counts.skipped += 1;
        if (result.status === 'dry-run') counts.dryRun += 1;

        if (result.status !== 'skipped') {
          console.log(`${result.status}: #${product.id} ${product.name} ${result.before} USD -> ${result.after} MXN`);
        }
      }
    } catch (error) {
      counts.failed += 1;
      console.error(`failed: #${product.id} ${product.name}: ${error.message}`);
    }
  }

  console.log(`Done. updated=${counts.updated} dryRun=${counts.dryRun} skipped=${counts.skipped} failed=${counts.failed} rate=${rate}`);

  if (counts.failed > 0) {
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
