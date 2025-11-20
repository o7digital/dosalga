/**
 * Hook personnalisé pour gérer les catégories WooCommerce
 */
import { useState, useEffect } from 'react';

/**
 * Hook pour récupérer toutes les catégories
 * @param {Object} params - Paramètres (per_page, hide_empty, etc.)
 */
export const useCategories = (params = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [JSON.stringify(params)]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams(params).toString();
      const url = `/api/categories${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url);
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
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchCategories();
  };

  return { categories, loading, error, refetch };
};

export default useCategories;
