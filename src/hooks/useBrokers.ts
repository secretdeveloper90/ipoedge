import { useState, useEffect, useCallback } from 'react';
import type { Broker } from '../types';
import { brokerAPI } from '../services/api';

export const useBrokers = () => {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBrokers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await brokerAPI.getBrokers();
      
      if (response.success) {
        setBrokers(response.data);
      } else {
        setError(response.message || 'Failed to fetch brokers');
      }
    } catch {
      setError('Failed to fetch brokers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrokers();
  }, [fetchBrokers]);

  return {
    brokers,
    loading,
    error,
    refetch: fetchBrokers
  };
};

export const useBroker = (id: string) => {
  const [broker, setBroker] = useState<Broker | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBroker = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await brokerAPI.getBrokerById(id);

      if (response.success) {
        setBroker(response.data);
      } else {
        setError(response.message || 'Broker not found');
      }
    } catch {
      setError('Failed to fetch broker details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBroker();
  }, [fetchBroker]);

  return {
    broker,
    loading,
    error,
    refetch: fetchBroker
  };
};

export const useBrokerByName = (name: string) => {
  const [broker, setBroker] = useState<Broker | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBroker = useCallback(async () => {
    if (!name) return;

    setLoading(true);
    setError(null);

    try {
      const response = await brokerAPI.getBrokerByName(name);

      if (response.success) {
        setBroker(response.data);
      } else {
        setError(response.message || 'Broker not found');
      }
    } catch {
      setError('Failed to fetch broker details');
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchBroker();
  }, [fetchBroker]);

  return {
    broker,
    loading,
    error,
    refetch: fetchBroker
  };
};
