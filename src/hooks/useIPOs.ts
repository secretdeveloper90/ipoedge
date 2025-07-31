import { useState, useEffect, useCallback } from 'react';
import type { IPO, IPOFilters } from '../types';
import { ipoAPI } from '../services/api';

interface UseIPOsParams {
  page?: number;
  limit?: number;
  filters?: IPOFilters;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  autoFetch?: boolean;
}

interface UseIPOsReturn {
  ipos: IPO[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  refetch: () => Promise<void>;
  fetchMore: () => Promise<void>;
  hasMore: boolean;
}

export const useIPOs = (params: UseIPOsParams = {}): UseIPOsReturn => {
  const {
    page = 1,
    limit = 12,
    filters,
    search,
    sortBy,
    sortOrder,
    autoFetch = true
  } = params;

  const [ipos, setIPOs] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null>(null);

  const fetchIPOs = useCallback(async (resetData = true) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ipoAPI.getIPOs({
        page,
        limit,
        filters,
        search,
        sortBy,
        sortOrder
      });

      if (response.success) {
        if (resetData) {
          setIPOs(response.data);
        } else {
          // For pagination, append new data
          setIPOs(prev => [...prev, ...response.data]);
        }
        setPagination(response.pagination || null);
      } else {
        setError(response.message || 'Failed to fetch IPOs');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters, search, sortBy, sortOrder]);

  const fetchMore = useCallback(async () => {
    if (!pagination || pagination.page >= pagination.totalPages) return;
    
    try {
      const response = await ipoAPI.getIPOs({
        page: pagination.page + 1,
        limit,
        filters,
        search,
        sortBy,
        sortOrder
      });

      if (response.success) {
        setIPOs(prev => [...prev, ...response.data]);
        setPagination(response.pagination || null);
      }
    } catch {
      setError('Failed to load more IPOs');
    }
  }, [pagination, limit, filters, search, sortBy, sortOrder]);

  const refetch = useCallback(() => fetchIPOs(true), [fetchIPOs]);

  const hasMore = pagination ? pagination.page < pagination.totalPages : false;

  useEffect(() => {
    if (autoFetch) {
      fetchIPOs(true);
    }
  }, [fetchIPOs, autoFetch]);

  return {
    ipos,
    loading,
    error,
    pagination,
    refetch,
    fetchMore,
    hasMore
  };
};

// Hook for getting a single IPO by ID
export const useIPO = (id: string) => {
  const [ipo, setIPO] = useState<IPO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIPO = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await ipoAPI.getIPOById(id);

      if (response.success) {
        setIPO(response.data);
      } else {
        setError(response.message || 'IPO not found');
      }
    } catch {
      setError('Failed to fetch IPO details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchIPO();
  }, [fetchIPO]);

  return {
    ipo,
    loading,
    error,
    refetch: fetchIPO
  };
};

// Hook for getting a single IPO by name/slug
export const useIPOByName = (name: string) => {
  const [ipo, setIPO] = useState<IPO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIPO = useCallback(async () => {
    if (!name) return;

    setLoading(true);
    setError(null);

    try {
      const response = await ipoAPI.getIPOByName(name);

      if (response.success) {
        setIPO(response.data);
      } else {
        setError(response.message || 'IPO not found');
      }
    } catch {
      setError('Failed to fetch IPO details');
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchIPO();
  }, [fetchIPO]);

  return {
    ipo,
    loading,
    error,
    refetch: fetchIPO
  };
};

// Hook for getting IPOs by status
export const useIPOsByStatus = (status: string) => {
  const [ipos, setIPOs] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIPOsByStatus = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await ipoAPI.getIPOsByStatus(status);
      
      if (response.success) {
        setIPOs(response.data);
      } else {
        setError(response.message || 'Failed to fetch IPOs');
      }
    } catch {
      setError('Failed to fetch IPOs by status');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (status) {
      fetchIPOsByStatus();
    }
  }, [fetchIPOsByStatus, status]);

  return {
    ipos,
    loading,
    error,
    refetch: fetchIPOsByStatus
  };
};

// Hook for getting IPOs by category
export const useIPOsByCategory = (category: string) => {
  const [ipos, setIPOs] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIPOsByCategory = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await ipoAPI.getIPOsByCategory(category);
      
      if (response.success) {
        setIPOs(response.data);
      } else {
        setError(response.message || 'Failed to fetch IPOs');
      }
    } catch {
      setError('Failed to fetch IPOs by category');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    if (category) {
      fetchIPOsByCategory();
    }
  }, [fetchIPOsByCategory, category]);

  return {
    ipos,
    loading,
    error,
    refetch: fetchIPOsByCategory
  };
};
