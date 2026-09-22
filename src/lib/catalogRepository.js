import { query, withTransaction } from '@/src/lib/database';
import { applyRailwayPriceRegistry } from '@/src/lib/pricing';

const STORE_ID = 'MX';

const schemaSql = `
CREATE TABLE IF NOT EXISTS storefront_catalog_products (
  store_id TEXT NOT NULL DEFAULT 'MX', woo_id BIGINT NOT NULL, sku TEXT, slug TEXT,
  name TEXT NOT NULL DEFAULT '', status TEXT NOT NULL DEFAULT 'publish',
  price NUMERIC(18, 4), regular_price NUMERIC(18, 4), sale_price NUMERIC(18, 4),
  on_sale BOOLEAN NOT NULL DEFAULT FALSE, featured BOOLEAN NOT NULL DEFAULT FALSE,
  stock_status TEXT, total_sales INTEGER NOT NULL DEFAULT 0,
  average_rating NUMERIC(8, 4) NOT NULL DEFAULT 0, date_created TIMESTAMPTZ,
  date_modified TIMESTAMPTZ, category_ids BIGINT[] NOT NULL DEFAULT '{}',
  search_text TEXT NOT NULL DEFAULT '', payload JSONB NOT NULL,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), PRIMARY KEY (store_id, woo_id)
);
CREATE INDEX IF NOT EXISTS storefront_catalog_products_sku_idx ON storefront_catalog_products (store_id, sku);
CREATE INDEX IF NOT EXISTS storefront_catalog_products_date_idx ON storefront_catalog_products (store_id, date_created DESC);
CREATE INDEX IF NOT EXISTS storefront_catalog_products_price_idx ON storefront_catalog_products (store_id, price);
CREATE INDEX IF NOT EXISTS storefront_catalog_products_categories_idx ON storefront_catalog_products USING GIN (category_ids);
CREATE TABLE IF NOT EXISTS storefront_catalog_categories (
  store_id TEXT NOT NULL DEFAULT 'MX', woo_id BIGINT NOT NULL, slug TEXT,
  name TEXT NOT NULL DEFAULT '', product_count INTEGER NOT NULL DEFAULT 0,
  payload JSONB NOT NULL, synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (store_id, woo_id)
);
CREATE INDEX IF NOT EXISTS storefront_catalog_categories_slug_idx ON storefront_catalog_categories (store_id, slug);
CREATE TABLE IF NOT EXISTS storefront_catalog_sync_runs (
  id BIGSERIAL PRIMARY KEY, store_id TEXT NOT NULL DEFAULT 'MX', trigger_name TEXT NOT NULL,
  status TEXT NOT NULL, product_count INTEGER NOT NULL DEFAULT 0,
  category_count INTEGER NOT NULL DEFAULT 0, started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ, error_message TEXT
);
CREATE TABLE IF NOT EXISTS product_price_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_code TEXT NOT NULL CHECK (store_code IN ('MX', 'US')),
  woo_product_id BIGINT NOT NULL,
  external_id TEXT,
  sku TEXT,
  raw_price NUMERIC(14, 4) NOT NULL CHECK (raw_price >= 0),
  raw_currency CHAR(3) NOT NULL CHECK (raw_currency IN ('MXN', 'USD')),
  exchange_rate NUMERIC(20, 8) NOT NULL CHECK (exchange_rate > 0),
  final_price NUMERIC(14, 4) NOT NULL CHECK (final_price >= 0),
  final_currency CHAR(3) NOT NULL CHECK (final_currency IN ('MXN', 'USD')),
  decision_source TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  evidence JSONB NOT NULL DEFAULT '{}'::JSONB,
  first_recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (store_code, woo_product_id)
);`;

let schemaPromise;

export const ensureCatalogSchema = () => {
  if (!schemaPromise) {
    schemaPromise = query(schemaSql).catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
};

const numberOrNull = (value) => {
  if (value === '' || value === null || value === undefined) return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const integerOrZero = (value) => {
  const numeric = Number.parseInt(value, 10);
  return Number.isFinite(numeric) ? numeric : 0;
};

const plainText = (value) => String(value || '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z0-9#]+;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const productRecord = (product) => {
  const categories = Array.isArray(product?.categories) ? product.categories : [];
  const categoryIds = categories
    .map((category) => Number.parseInt(category?.id, 10))
    .filter(Number.isFinite);
  const searchText = [
    product?.name,
    product?.sku,
    product?.slug,
    product?.description,
    product?.short_description,
    ...categories.flatMap((category) => [category?.name, category?.slug]),
  ].map(plainText).filter(Boolean).join(' ');

  return {
    id: Number(product?.id),
    sku: String(product?.sku || '').trim() || null,
    slug: String(product?.slug || '').trim() || null,
    name: String(product?.name || ''),
    status: String(product?.status || 'publish'),
    price: numberOrNull(product?.price),
    regularPrice: numberOrNull(product?.regular_price),
    salePrice: numberOrNull(product?.sale_price),
    onSale: Boolean(product?.on_sale),
    featured: Boolean(product?.featured),
    stockStatus: String(product?.stock_status || ''),
    totalSales: integerOrZero(product?.total_sales),
    averageRating: numberOrNull(product?.average_rating) || 0,
    dateCreated: product?.date_created || product?.date_created_gmt || null,
    dateModified: product?.date_modified || product?.date_modified_gmt || null,
    categoryIds,
    searchText,
    payload: product,
  };
};

const upsertProductWithClient = async (client, product) => {
  const record = productRecord(product);
  if (!Number.isFinite(record.id)) throw new Error('Cannot cache a product without a numeric WooCommerce ID.');

  await client.query(`
    INSERT INTO storefront_catalog_products (
      store_id, woo_id, sku, slug, name, status, price, regular_price, sale_price,
      on_sale, featured, stock_status, total_sales, average_rating, date_created,
      date_modified, category_ids, search_text, payload, synced_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
      $15, $16, $17, $18, $19::jsonb, NOW()
    )
    ON CONFLICT (store_id, woo_id) DO UPDATE SET
      sku = EXCLUDED.sku, slug = EXCLUDED.slug, name = EXCLUDED.name,
      status = EXCLUDED.status, price = EXCLUDED.price,
      regular_price = EXCLUDED.regular_price, sale_price = EXCLUDED.sale_price,
      on_sale = EXCLUDED.on_sale, featured = EXCLUDED.featured,
      stock_status = EXCLUDED.stock_status, total_sales = EXCLUDED.total_sales,
      average_rating = EXCLUDED.average_rating, date_created = EXCLUDED.date_created,
      date_modified = EXCLUDED.date_modified, category_ids = EXCLUDED.category_ids,
      search_text = EXCLUDED.search_text, payload = EXCLUDED.payload, synced_at = NOW()
  `, [
    STORE_ID, record.id, record.sku, record.slug, record.name, record.status,
    record.price, record.regularPrice, record.salePrice, record.onSale,
    record.featured, record.stockStatus, record.totalSales, record.averageRating,
    record.dateCreated, record.dateModified, record.categoryIds, record.searchText,
    JSON.stringify(record.payload),
  ]);
};

const upsertCategoryWithClient = async (client, category) => {
  const id = Number(category?.id);
  if (!Number.isFinite(id)) throw new Error('Cannot cache a category without a numeric WooCommerce ID.');

  await client.query(`
    INSERT INTO storefront_catalog_categories (
      store_id, woo_id, slug, name, product_count, payload, synced_at
    ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, NOW())
    ON CONFLICT (store_id, woo_id) DO UPDATE SET
      slug = EXCLUDED.slug, name = EXCLUDED.name,
      product_count = EXCLUDED.product_count, payload = EXCLUDED.payload, synced_at = NOW()
  `, [
    STORE_ID, id, String(category?.slug || ''), String(category?.name || ''),
    integerOrZero(category?.count), JSON.stringify(category),
  ]);
};

export const replaceCatalogSnapshot = async (products, categories, triggerName = 'manual') => {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('WooCommerce returned no products; the existing catalog was preserved.');
  }
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error('WooCommerce returned no categories; the existing catalog was preserved.');
  }

  await ensureCatalogSchema();
  const run = await query(`
    INSERT INTO storefront_catalog_sync_runs (store_id, trigger_name, status)
    VALUES ($1, $2, 'running') RETURNING id
  `, [STORE_ID, triggerName]);
  const runId = run.rows[0].id;

  try {
    await withTransaction(async (client) => {
      for (const category of categories) await upsertCategoryWithClient(client, category);
      for (const product of products) await upsertProductWithClient(client, product);

      const productIds = products.map((product) => Number(product.id)).filter(Number.isFinite);
      const categoryIds = categories.map((category) => Number(category.id)).filter(Number.isFinite);
      await client.query(
        'DELETE FROM storefront_catalog_products WHERE store_id = $1 AND NOT (woo_id = ANY($2::bigint[]))',
        [STORE_ID, productIds]
      );
      await client.query(
        'DELETE FROM storefront_catalog_categories WHERE store_id = $1 AND NOT (woo_id = ANY($2::bigint[]))',
        [STORE_ID, categoryIds]
      );
    });

    await query(`
      UPDATE storefront_catalog_sync_runs SET status = 'complete', product_count = $2,
      category_count = $3, completed_at = NOW() WHERE id = $1
    `, [runId, products.length, categories.length]);
  } catch (error) {
    await query(`
      UPDATE storefront_catalog_sync_runs SET status = 'failed', error_message = $2,
      completed_at = NOW() WHERE id = $1
    `, [runId, String(error?.message || error).slice(0, 2000)]);
    throw error;
  }

  return { products: products.length, categories: categories.length, runId };
};

export const upsertCatalogProduct = async (product) => {
  await ensureCatalogSchema();
  return withTransaction((client) => upsertProductWithClient(client, product));
};

export const deleteCatalogProduct = async (id) => {
  await ensureCatalogSchema();
  await query('DELETE FROM storefront_catalog_products WHERE store_id = $1 AND woo_id = $2', [STORE_ID, id]);
};

export const getCatalogProducts = async (options = {}) => {
  await ensureCatalogSchema();
  const values = [STORE_ID];
  const conditions = [
    'storefront_catalog_products.store_id = $1',
    "storefront_catalog_products.status = 'publish'",
  ];
  const addValue = (value) => {
    values.push(value);
    return `$${values.length}`;
  };

  if (options.category) {
    const categoryId = Number.parseInt(options.category, 10);
    if (Number.isFinite(categoryId)) conditions.push(`storefront_catalog_products.category_ids @> ARRAY[${addValue(categoryId)}]::bigint[]`);
  }
  if (options.sku) conditions.push(`LOWER(storefront_catalog_products.sku) = LOWER(${addValue(String(options.sku).trim())})`);
  if (options.search) conditions.push(`storefront_catalog_products.search_text ILIKE ${addValue(`%${String(options.search).trim()}%`)}`);
  if (options.onSale !== undefined) conditions.push(`storefront_catalog_products.on_sale = ${addValue(Boolean(options.onSale))}`);
  if (options.featured !== undefined) conditions.push(`storefront_catalog_products.featured = ${addValue(Boolean(options.featured))}`);

  const orderColumns = {
    date: 'storefront_catalog_products.date_created',
    price: 'COALESCE(product_price_registry.final_price, storefront_catalog_products.price)',
    popularity: 'storefront_catalog_products.total_sales',
    rating: 'storefront_catalog_products.average_rating',
    title: 'storefront_catalog_products.name',
  };
  const orderColumn = orderColumns[options.orderby] || orderColumns.date;
  const orderDirection = String(options.order).toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  const pagination = options.all
    ? ''
    : ` LIMIT ${addValue(options.perPage || 24)} OFFSET ${addValue(((options.page || 1) - 1) * (options.perPage || 24))}`;

  const result = await query(`
    SELECT storefront_catalog_products.payload,
           product_price_registry.raw_price,
           product_price_registry.raw_currency,
           product_price_registry.exchange_rate,
           product_price_registry.final_price,
           product_price_registry.final_currency,
           product_price_registry.decision_source,
           product_price_registry.verified,
           product_price_registry.updated_at
    FROM storefront_catalog_products
    LEFT JOIN product_price_registry
      ON product_price_registry.store_code = storefront_catalog_products.store_id
     AND product_price_registry.woo_product_id = storefront_catalog_products.woo_id
    WHERE ${conditions.join(' AND ')}
    ORDER BY ${orderColumn} ${orderDirection} NULLS LAST, storefront_catalog_products.woo_id DESC${pagination}
  `, values);
  return result.rows.map((row) => applyRailwayPriceRegistry(
    row.payload,
    row.raw_currency ? row : null,
  ));
};

export const getCatalogProduct = async (id) => {
  await ensureCatalogSchema();
  const result = await query(`
    SELECT storefront_catalog_products.payload,
           product_price_registry.raw_price,
           product_price_registry.raw_currency,
           product_price_registry.exchange_rate,
           product_price_registry.final_price,
           product_price_registry.final_currency,
           product_price_registry.decision_source,
           product_price_registry.verified,
           product_price_registry.updated_at
    FROM storefront_catalog_products
    LEFT JOIN product_price_registry
      ON product_price_registry.store_code = storefront_catalog_products.store_id
     AND product_price_registry.woo_product_id = storefront_catalog_products.woo_id
    WHERE storefront_catalog_products.store_id = $1
      AND storefront_catalog_products.woo_id = $2
      AND storefront_catalog_products.status = 'publish'
    LIMIT 1
  `, [STORE_ID, id]);
  const row = result.rows[0];
  return row ? applyRailwayPriceRegistry(row.payload, row.raw_currency ? row : null) : null;
};

export const getCatalogCategories = async ({ hideEmpty = false } = {}) => {
  await ensureCatalogSchema();
  const result = await query(`
    SELECT payload FROM storefront_catalog_categories
    WHERE store_id = $1 ${hideEmpty ? 'AND product_count > 0' : ''}
    ORDER BY name ASC
  `, [STORE_ID]);
  return result.rows.map((row) => row.payload);
};

export const findCatalogCategory = async (term) => {
  await ensureCatalogSchema();
  const result = await query(`
    SELECT payload FROM storefront_catalog_categories
    WHERE store_id = $1 AND (LOWER(name) = LOWER($2) OR LOWER(slug) = LOWER($2))
    LIMIT 1
  `, [STORE_ID, String(term || '').trim()]);
  return result.rows[0]?.payload || null;
};
