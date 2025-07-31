import { useState, useEffect, useCallback } from 'react';
import type { Buyback } from '../types';
import { buybackAPI } from '../services/api';

export const useBuybacks = (status?: string) => {
  const [buybacks, setBuybacks] = useState<Buyback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBuybacks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await buybackAPI.getBuybacks(status);
      
      if (response.success) {
        setBuybacks(response.data);
      } else {
        setError(response.message || 'Failed to fetch buybacks');
      }
    } catch {
      setError('Failed to fetch buybacks');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchBuybacks();
  }, [fetchBuybacks]);

  return {
    buybacks,
    loading,
    error,
    refetch: fetchBuybacks
  };
};

export const useBuyback = (id: string) => {
  const [buyback, setBuyback] = useState<Buyback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBuyback = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await buybackAPI.getBuybackById(id);
      
      if (response.success) {
        setBuyback(response.data);
      } else {
        setError(response.message || 'Buyback not found');
      }
    } catch {
      setError('Failed to fetch buyback details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBuyback();
  }, [fetchBuyback]);

  return {
    buyback,
    loading,
    error,
    refetch: fetchBuyback
  };
};
