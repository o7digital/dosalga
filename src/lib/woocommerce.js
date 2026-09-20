import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const FALLBACK_KEY = "ck_962f8b4455545de9a9a6155616535fdf8d9eb1db";
const FALLBACK_SECRET = "cs_4242ab75e9fb88408afd2961efb76b7ce9211bc9";
const FALLBACK_WORDPRESS_URL = "https://wp-dosalga-mx.o7digitalgroup.com";
const MAX_PRODUCTS_PER_PAGE = 100;
const STORE_API_PRODUCT_PARAMS = [
  "page",
  "per_page",
  "search",
  "orderby",
  "order",
  "category",
  "on_sale",
  "featured",
  "include",
  "exclude",
  "parent",
  "sku",
  "stock_status",
];
const parsedTimeoutMs = Number.parseInt(process.env.WOOCOMMERCE_TIMEOUT_MS || "30000", 10);
const requestTimeoutMs = Number.isFinite(parsedTimeoutMs) && parsedTimeoutMs > 0
  ? parsedTimeoutMs
  : 30000;

const applicationUsername = String(process.env.WP_APPLICATION_USERNAME || "").trim();
const applicationPassword = String(process.env.WP_APPLICATION_PASSWORD || "").replace(/\s+/g, "");
const hasApplicationPasswordAuth = Boolean(applicationUsername && applicationPassword);

export const getWooCommerceErrorDetails = (error) => ({
  message: error?.message || "Unknown WooCommerce error",
  code: error?.code || null,
  status: error?.response?.status || error?.status || null,
  endpoint: (() => {
    try {
      return new URL(error?.config?.url).pathname;
    } catch {
      return null;
    }
  })(),
});

const logWooCommerceError = (message, error) => {
  console.error(message, getWooCommerceErrorDetails(error));
};

const normalizeWordPressUrl = (value) => {
  const rawUrl = String(value || "").trim();

  if (!rawUrl) {
    return FALLBACK_WORDPRESS_URL;
  }

  try {
    const parsedUrl = new URL(rawUrl);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    if (
      hostname === "dosalga.store"
      || hostname.endsWith(".vercel.app")
    ) {
      return FALLBACK_WORDPRESS_URL;
    }

    parsedUrl.protocol = "https:";
    return parsedUrl.origin;
  } catch {
    return FALLBACK_WORDPRESS_URL;
  }
};

const normalizePerPage = (value, fallback = MAX_PRODUCTS_PER_PAGE) => {
  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return Math.min(parsedValue, MAX_PRODUCTS_PER_PAGE);
};

const wordpressUrl = normalizeWordPressUrl(
  process.env.WORDPRESS_URL
  || process.env.WOOCOMMERCE_URL
  || process.env.NEXT_PUBLIC_WORDPRESS_URL
);

const getStoreApiUrl = (path, params = {}) => {
  const url = new URL(`/wp-json/wc/store/v1/${path}`, wordpressUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, String(value));
  });

  return url;
};

const storeApiRequest = async (path, params = {}) => {
  const response = await fetch(getStoreApiUrl(path, params), {
    headers: {
      Accept: "application/json",
      "User-Agent": "Dosalga-MX/1.0",
    },
    signal: AbortSignal.timeout(Math.min(requestTimeoutMs, 15000)),
  });

  if (!response.ok) {
    const error = new Error(`WooCommerce Store API returned ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return {
    data: await response.json(),
    total: Number.parseInt(response.headers.get("x-wp-total") || "0", 10),
  };
};

const getStorePrice = (prices, key) => {
  const rawValue = prices?.[key];
  if (rawValue === undefined || rawValue === null || rawValue === "") return "";

  const minorUnit = Number.parseInt(prices?.currency_minor_unit ?? 2, 10);
  const divisor = 10 ** (Number.isFinite(minorUnit) ? minorUnit : 2);
  const numeric = Number(rawValue);
  return Number.isFinite(numeric) ? (numeric / divisor).toFixed(2) : "";
};

const normalizeStoreAttribute = (attribute) => ({
  id: attribute?.id || 0,
  name: attribute?.name || "",
  slug: attribute?.taxonomy || attribute?.name || "",
  variation: Boolean(attribute?.has_variations),
  visible: true,
  options: Array.isArray(attribute?.terms)
    ? attribute.terms.map((term) => term?.name).filter(Boolean)
    : [],
});

const normalizeStoreProduct = (product) => {
  if (!product || typeof product !== "object" || Array.isArray(product)) return product;

  const price = getStorePrice(product.prices, "price");
  const regularPrice = getStorePrice(product.prices, "regular_price");
  const salePrice = getStorePrice(product.prices, "sale_price");
  const onSale = Boolean(product.on_sale) || (
    Boolean(regularPrice)
    && Boolean(salePrice)
    && Number(salePrice) < Number(regularPrice)
  );

  return {
    ...product,
    price,
    regular_price: regularPrice,
    sale_price: onSale ? salePrice : "",
    on_sale: onSale,
    price_html: "",
    purchasable: product.is_purchasable !== false,
    stock_status: product.is_in_stock === false ? "outofstock" : "instock",
    average_rating: String(product.average_rating || "0"),
    rating_count: Number(product.review_count || 0),
    attributes: Array.isArray(product.attributes)
      ? product.attributes.map(normalizeStoreAttribute)
      : [],
    images: Array.isArray(product.images) ? product.images : [],
    meta_data: Array.isArray(product.meta_data) ? product.meta_data : [],
  };
};

const normalizeStoreVariation = (variation, reference = {}) => ({
  ...normalizeStoreProduct(variation),
  attributes: Array.isArray(reference.attributes)
    ? reference.attributes.map((attribute) => ({
        id: 0,
        name: attribute?.name || "",
        slug: attribute?.name || "",
        option: attribute?.value || "",
      }))
    : [],
  image: Array.isArray(variation?.images) ? variation.images[0] || null : null,
});

const getStoreProductParams = (params = {}) => (
  STORE_API_PRODUCT_PARAMS.reduce((result, key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      result[key] = params[key];
    }
    return result;
  }, {})
);

const api = new WooCommerceRestApi({
  url: wordpressUrl,
  // WooCommerce accepts WordPress Application Passwords through HTTPS Basic Auth.
  consumerKey: hasApplicationPasswordAuth
    ? applicationUsername
    : process.env.WC_CONSUMER_KEY || FALLBACK_KEY,
  consumerSecret: hasApplicationPasswordAuth
    ? applicationPassword
    : process.env.WC_CONSUMER_SECRET || FALLBACK_SECRET,
  version: "wc/v3",
  // Consumer keys can use query-string auth; application passwords must use Basic Auth.
  queryStringAuth: !hasApplicationPasswordAuth,
  axiosConfig: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Safari/537.36',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: requestTimeoutMs,
  }
});

export default api;

/**
 * Récupérer tous les produits
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await storeApiRequest("products", getStoreProductParams(params));
    return Array.isArray(response.data) ? response.data.map(normalizeStoreProduct) : response.data;
  } catch (error) {
    logWooCommerceError("Error fetching products:", error);
    throw error;
  }
};

/**
 * Récupérer tous les produits sur toutes les pages WooCommerce
 */
export const getAllProducts = async (params = {}) => {
  try {
    const perPage = normalizePerPage(params.per_page);
    const firstPageParams = {
      ...params,
      page: 1,
      per_page: perPage,
    };

    const firstResponse = await storeApiRequest("products", getStoreProductParams(firstPageParams));
    const firstPageProducts = firstResponse.data;

    if (!Array.isArray(firstPageProducts)) {
      throw new Error("WooCommerce API returned an unexpected payload for page 1.");
    }

    const totalPages = Math.max(1, Math.ceil(firstResponse.total / perPage));

    if (!Number.isFinite(totalPages) || totalPages <= 1) {
      return firstPageProducts.map(normalizeStoreProduct);
    }

    const remainingPageRequests = [];

    for (let page = 2; page <= totalPages; page += 1) {
      remainingPageRequests.push(
        storeApiRequest("products", getStoreProductParams({
          ...firstPageParams,
          page,
        }))
      );
    }

    const remainingResponses = await Promise.all(remainingPageRequests);
    const remainingProducts = remainingResponses.flatMap((response, index) => {
      if (!Array.isArray(response.data)) {
        throw new Error(`WooCommerce API returned an unexpected payload for page ${index + 2}.`);
      }

      return response.data;
    });

    return [...firstPageProducts, ...remainingProducts].map(normalizeStoreProduct);
  } catch (error) {
    logWooCommerceError("Error fetching all products:", error);
    throw error;
  }
};

/**
 * Récupérer un produit par ID
 */
export const getProduct = async (id) => {
  try {
    const response = await storeApiRequest(`products/${id}`);
    return normalizeStoreProduct(response.data);
  } catch (error) {
    logWooCommerceError(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Récupérer les catégories de produits
 */
export const getCategories = async (params = {}) => {
  try {
    const response = await storeApiRequest("products/categories", params);
    return response.data;
  } catch (error) {
    logWooCommerceError("Error fetching categories:", error);
    throw error;
  }
};

/**
 * Récupérer une catégorie par ID
 */
export const getCategory = async (id) => {
  try {
    const response = await storeApiRequest(`products/categories/${id}`);
    return response.data;
  } catch (error) {
    logWooCommerceError(`Error fetching category ${id}:`, error);
    throw error;
  }
};

/**
 * Créer une commande
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("orders", orderData);
    return response.data;
  } catch (error) {
    logWooCommerceError("Error creating order:", error);
    throw error;
  }
};

/**
 * Récupérer les commandes
 */
export const getOrders = async (params = {}) => {
  try {
    const response = await api.get("orders", params);
    return response.data;
  } catch (error) {
    logWooCommerceError("Error fetching orders:", error);
    throw error;
  }
};

/**
 * Rechercher des produits
 */
export const searchProducts = async (searchTerm, params = {}) => {
  try {
    const response = await storeApiRequest("products", getStoreProductParams({
      search: searchTerm,
      ...params
    }));
    return Array.isArray(response.data) ? response.data.map(normalizeStoreProduct) : response.data;
  } catch (error) {
    logWooCommerceError("Error searching products:", error);
    throw error;
  }
};

/**
 * Récupérer les variations d'un produit
 */
export const getProductVariations = async (productId, params = {}) => {
  try {
    const productResponse = await storeApiRequest(`products/${productId}`);
    const references = Array.isArray(productResponse.data?.variations)
      ? productResponse.data.variations
      : [];
    const limit = normalizePerPage(params.per_page, MAX_PRODUCTS_PER_PAGE);
    const selectedReferences = references.slice(0, limit);
    const responses = await Promise.all(
      selectedReferences.map((reference) => storeApiRequest(`products/${reference.id}`))
    );

    return responses.map((response, index) => (
      normalizeStoreVariation(response.data, selectedReferences[index])
    ));
  } catch (error) {
    logWooCommerceError(`Error fetching variations for product ${productId}:`, error);
    throw error;
  }
};

/**
 * Récupérer les avis de produits
 */
export const getProductReviews = async (params = {}) => {
  return [];
};

export const getAllProductReviews = async (params = {}) => {
  return [];
};
