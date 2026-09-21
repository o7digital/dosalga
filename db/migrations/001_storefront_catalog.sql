CREATE TABLE IF NOT EXISTS storefront_catalog_products (
  store_id TEXT NOT NULL DEFAULT 'MX',
  woo_id BIGINT NOT NULL,
  sku TEXT,
  slug TEXT,
  name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'publish',
  price NUMERIC(18, 4),
  regular_price NUMERIC(18, 4),
  sale_price NUMERIC(18, 4),
  on_sale BOOLEAN NOT NULL DEFAULT FALSE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  stock_status TEXT,
  total_sales INTEGER NOT NULL DEFAULT 0,
  average_rating NUMERIC(8, 4) NOT NULL DEFAULT 0,
  date_created TIMESTAMPTZ,
  date_modified TIMESTAMPTZ,
  category_ids BIGINT[] NOT NULL DEFAULT '{}',
  search_text TEXT NOT NULL DEFAULT '',
  payload JSONB NOT NULL,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (store_id, woo_id)
);

CREATE INDEX IF NOT EXISTS storefront_catalog_products_sku_idx
  ON storefront_catalog_products (store_id, sku);
CREATE INDEX IF NOT EXISTS storefront_catalog_products_date_idx
  ON storefront_catalog_products (store_id, date_created DESC);
CREATE INDEX IF NOT EXISTS storefront_catalog_products_price_idx
  ON storefront_catalog_products (store_id, price);
CREATE INDEX IF NOT EXISTS storefront_catalog_products_categories_idx
  ON storefront_catalog_products USING GIN (category_ids);

CREATE TABLE IF NOT EXISTS storefront_catalog_categories (
  store_id TEXT NOT NULL DEFAULT 'MX',
  woo_id BIGINT NOT NULL,
  slug TEXT,
  name TEXT NOT NULL DEFAULT '',
  product_count INTEGER NOT NULL DEFAULT 0,
  payload JSONB NOT NULL,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (store_id, woo_id)
);

CREATE INDEX IF NOT EXISTS storefront_catalog_categories_slug_idx
  ON storefront_catalog_categories (store_id, slug);

CREATE TABLE IF NOT EXISTS storefront_catalog_sync_runs (
  id BIGSERIAL PRIMARY KEY,
  store_id TEXT NOT NULL DEFAULT 'MX',
  trigger_name TEXT NOT NULL,
  status TEXT NOT NULL,
  product_count INTEGER NOT NULL DEFAULT 0,
  category_count INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  error_message TEXT
);
