import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const FALLBACK_KEY = "ck_962f8b4455545de9a9a6155616535fdf8d9eb1db";
const FALLBACK_SECRET = "cs_4242ab75e9fb88408afd2961efb76b7ce9211bc9";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://oliviers44.sg-host.com",
  consumerKey: process.env.WC_CONSUMER_KEY || FALLBACK_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET || FALLBACK_SECRET,
  version: "wc/v3",
  // Query string auth tends à mieux passer le captcha SG qu'un Basic header
  queryStringAuth: true,
  axiosConfig: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Safari/537.36',
      Accept: 'application/json'
    },
    timeout: 10000,
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
    console.error("Error fetching products:", error);
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
    console.error(`Error fetching product ${id}:`, error);
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
    console.error("Error fetching categories:", error);
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
    console.error(`Error fetching category ${id}:`, error);
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
    console.error("Error creating order:", error);
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
    console.error("Error fetching orders:", error);
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
    console.error("Error searching products:", error);
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
    console.error(`Error fetching variations for product ${productId}:`, error);
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
    console.error("Error fetching product reviews:", error);
    throw error;
  }
};
