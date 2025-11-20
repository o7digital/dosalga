/**
 * Hook personnalisé pour gérer les produits WooCommerce via les routes API
 */
import { useState, useEffect } from 'react';

/**
 * Hook pour récupérer plusieurs produits
 * @param {Object} initialParams - Paramètres initiaux (page, per_page, category, etc.)
 */
export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts(initialParams);
  }, [JSON.stringify(initialParams)]);

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Construire l'URL avec les paramètres
      const queryParams = new URLSearchParams(params).toString();
      const url = `/api/products${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url);
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
      setLoading(false);
    }
  };

  const refetch = (params = {}) => {
    fetchProducts(params);
  };

  return { products, loading, error, refetch };
};

/**
 * Hook pour récupérer un produit spécifique
 * @param {number|string} productId - ID du produit
 */
export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/products/${productId}`);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Erreur lors de la récupération du produit');
        }
        
        setProduct(result.data);
      } catch (err) {
        console.error(`Error fetching product ${productId}:`, err);
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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
      
      const queryParams = new URLSearchParams({
        search: searchTerm,
        ...params
      }).toString();
      
      const response = await fetch(`/api/products?${queryParams}`);
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
