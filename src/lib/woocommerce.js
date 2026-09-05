import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const FALLBACK_KEY = "ck_962f8b4455545de9a9a6155616535fdf8d9eb1db";
const FALLBACK_SECRET = "cs_4242ab75e9fb88408afd2961efb76b7ce9211bc9";
const FALLBACK_WORDPRESS_URL = "https://oliviers44.sg-host.com";
const MAX_PRODUCTS_PER_PAGE = 100;
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

const api = new WooCommerceRestApi({
  url: normalizeWordPressUrl(
    process.env.WORDPRESS_URL
    || process.env.WOOCOMMERCE_URL
    || process.env.NEXT_PUBLIC_WORDPRESS_URL
  ),
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
    const response = await api.get("products", params);
    return response.data;
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

    const firstResponse = await api.get("products", firstPageParams);
    const firstPageProducts = firstResponse.data;

    if (!Array.isArray(firstPageProducts)) {
      throw new Error("WooCommerce API returned an unexpected payload for page 1.");
    }

    const totalPages = Number.parseInt(firstResponse.headers?.["x-wp-totalpages"] || "1", 10);

    if (!Number.isFinite(totalPages) || totalPages <= 1) {
      return firstPageProducts;
    }

    const remainingPageRequests = [];

    for (let page = 2; page <= totalPages; page += 1) {
      remainingPageRequests.push(
        api.get("products", {
          ...firstPageParams,
          page,
        })
      );
    }

    const remainingResponses = await Promise.all(remainingPageRequests);
    const remainingProducts = remainingResponses.flatMap((response, index) => {
      if (!Array.isArray(response.data)) {
        throw new Error(`WooCommerce API returned an unexpected payload for page ${index + 2}.`);
      }

      return response.data;
    });

    return [...firstPageProducts, ...remainingProducts];
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
    const response = await api.get(`products/${id}`);
    return response.data;
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
    const response = await api.get("products/categories", params);
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
    const response = await api.get(`products/categories/${id}`);
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
    const response = await api.get("products", {
      search: searchTerm,
      ...params
    });
    return response.data;
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
    const response = await api.get(`products/${productId}/variations`, params);
    return response.data;
  } catch (error) {
    logWooCommerceError(`Error fetching variations for product ${productId}:`, error);
    throw error;
  }
};

/**
 * Récupérer les avis de produits
 */
export const getProductReviews = async (params = {}) => {
  try {
    const response = await api.get("products/reviews", params);
    return response.data;
  } catch (error) {
    logWooCommerceError("Error fetching product reviews:", error);
    throw error;
  }
};

export const getAllProductReviews = async (params = {}) => {
  try {
    const perPage = normalizePerPage(params.per_page);
    const firstResponse = await api.get("products/reviews", {
      ...params,
      page: 1,
      per_page: perPage,
    });

    const firstPageReviews = firstResponse.data;
    if (!Array.isArray(firstPageReviews)) {
      throw new Error("WooCommerce API returned an unexpected reviews payload for page 1.");
    }

    const totalPages = Number.parseInt(firstResponse.headers?.["x-wp-totalpages"] || "1", 10);
    if (!Number.isFinite(totalPages) || totalPages <= 1) {
      return firstPageReviews;
    }

    const remainingReviews = [];
    for (let page = 2; page <= totalPages; page += 1) {
      // Fetch sequentially to avoid saturating slower WordPress backends.
      const response = await api.get("products/reviews", {
        ...params,
        page,
        per_page: perPage,
      });

      if (!Array.isArray(response.data)) {
        throw new Error(`WooCommerce API returned an unexpected reviews payload for page ${page}.`);
      }

      remainingReviews.push(...response.data);
    }

    return [...firstPageReviews, ...remainingReviews];
  } catch (error) {
    logWooCommerceError("Error fetching all product reviews:", error);
    throw error;
  }
};
