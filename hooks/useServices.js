/**
 * useServices.js
 * ─────────────────────────────────────────────────────────
 * Hook for services — fetched from business detail.
 * No separate CRUD API exists for services.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getServices, createService } from '@/services/servicesService';

export function useServices() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const services = await getServices();
      setData(services);
    } catch (err) {
      setError(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (payload) => {
    try {
      const newService = await createService(payload);
      setData(prev => [...prev, newService]);
      return newService;
    } catch (err) {
      throw new Error(err.message || 'Failed to create service');
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  return { data, loading, error, refresh: fetchServices, create };
}
