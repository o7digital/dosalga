/**
 * Hook personnalisé pour gérer les produits WooCommerce
 */
import { useState, useEffect } from 'react';
import { getProducts, getProduct, searchProducts } from '../lib/woocommerce';

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts(initialParams);
  }, []);

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      const data = await getProducts(params);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = (params = {}) => {
    fetchProducts(params);
  };

  return { products, loading, error, refetch };
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(productId);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

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
      const data = await searchProducts(searchTerm, params);
      setResults(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};
