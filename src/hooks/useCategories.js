/**
 * Hook personnalisé pour gérer les catégories WooCommerce
 */
import { useState, useEffect } from 'react';
import { getWooCommerceRefreshIntervalMs } from '@/src/lib/liveRefresh';

/**
 * Hook pour récupérer toutes les catégories
 * @param {Object} params - Paramètres (per_page, hide_empty, etc.)
 */
export const useCategories = (params = {}, options = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const paramsKey = JSON.stringify(params);
  const refreshIntervalMs = options.refreshIntervalMs ?? getWooCommerceRefreshIntervalMs();

  const fetchCategories = async (fetchOptions = {}) => {
    const { silent = false } = fetchOptions;

    try {
      if (!silent) {
        setLoading(true);
      }
      setError(null);
      
      const queryParams = new URLSearchParams(params).toString();
      const url = `/api/categories${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, { cache: 'no-store' });
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la récupération des catégories');
      }
      
      setCategories(result.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message);
      setCategories([]);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCategories();

    if (!refreshIntervalMs) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      fetchCategories({ silent: true });
    }, refreshIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [paramsKey, refreshIntervalMs]);

  const refetch = () => {
    fetchCategories();
  };

  return { categories, loading, error, refetch };
};

export default useCategories;
