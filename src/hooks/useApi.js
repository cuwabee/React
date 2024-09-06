import { useState, useCallback } from 'react';
import api from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api[method](url, data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  }, []);

  return { loading, error, request };
};