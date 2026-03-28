'use client';

import { useState, useEffect, useCallback } from 'react';
import { getServices, createService, deleteService } from '@/services/servicesService';

export function useServices() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getServices();
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const addService = useCallback(async (serviceData) => {
    try {
      await createService(serviceData);
      await fetchServices(); // refresh list
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [fetchServices]);

  const removeService = useCallback(async (id) => {
    try {
      await deleteService(id);
      await fetchServices();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [fetchServices]);

  return { data, loading, error, refresh: fetchServices, addService, removeService };
}
