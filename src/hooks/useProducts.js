/**
 * Hook personnalisé pour gérer les produits WooCommerce via les routes API
 */
import { useState, useEffect } from 'react';
import { getWooCommerceRefreshIntervalMs } from '@/src/lib/liveRefresh';

const buildQueryString = (params = {}) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    queryParams.append(key, String(value));
  });

  return queryParams.toString();
};

/**
 * Hook pour récupérer plusieurs produits
 * @param {Object} initialParams - Paramètres initiaux (page, per_page, category, etc.)
 */
export const useProducts = (initialParams = {}, options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const paramsKey = JSON.stringify(initialParams);
  const refreshIntervalMs = options.refreshIntervalMs ?? getWooCommerceRefreshIntervalMs();

  const fetchProducts = async (params = {}, fetchOptions = {}) => {
    const { silent = false } = fetchOptions;

    try {
      if (!silent) {
        setLoading(true);
      }
      setError(null);
      
      // Construire l'URL avec les paramètres
      const queryParams = buildQueryString(params);
      const url = `/api/products${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, { cache: 'no-store' });
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la récupération des produits');
      }
      
      setProducts(result.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProducts(initialParams);

    if (!refreshIntervalMs) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      fetchProducts(initialParams, { silent: true });
    }, refreshIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [paramsKey, refreshIntervalMs]);

  const refetch = (params = {}) => {
    fetchProducts(params);
  };

  return { products, loading, error, refetch };
};

/**
 * Hook pour récupérer un produit spécifique
 * @param {number|string} productId - ID du produit
 */
export const useProduct = (productId, options = {}) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refreshIntervalMs = options.refreshIntervalMs ?? getWooCommerceRefreshIntervalMs();
  const lang = options.lang;

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async (fetchOptions = {}) => {
      const { silent = false } = fetchOptions;

      try {
        if (!silent) {
          setLoading(true);
        }
        setError(null);
        
        const queryParams = buildQueryString({ lang });
        const response = await fetch(`/api/products/${productId}${queryParams ? `?${queryParams}` : ''}`, { cache: 'no-store' });
        let result;
        try {
          result = await response.json();
        } catch (parseErr) {
          throw new Error('Réponse produit invalide (captcha ou HTML).');
        }
        
        if (!response.ok || !result?.data) {
          throw new Error(result?.message || 'Erreur lors de la récupération du produit');
        }
        
        setProduct(result.data);
      } catch (err) {
        console.error(`Error fetching product ${productId}:`, err);
        setError(err.message);
        setProduct(null);
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    if (!refreshIntervalMs) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      fetchProduct({ silent: true });
    }, refreshIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [productId, refreshIntervalMs, lang]);

  return { product, loading, error };
};

/**
 * Hook pour rechercher des produits
 */
export const useProductSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (searchTerm, params = {}) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const queryParams = buildQueryString({
        search: searchTerm,
        ...params
      });
      
      const response = await fetch(`/api/products?${queryParams}`, { cache: 'no-store' });
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la recherche');
      }
      
      setResults(result.data || []);
    } catch (err) {
      console.error('Error searching products:', err);
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};
