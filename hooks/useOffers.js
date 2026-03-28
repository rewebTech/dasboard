'use client';

import { useState, useEffect, useCallback } from 'react';
import { getOffers, createOffer, toggleOffer, deleteOffer } from '@/services/offersService';

export function useOffers() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getOffers();
      setData(res?.items || res || []);
    } catch (err) {
      setError(err.message || 'Failed to load offers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchOffers(); }, [fetchOffers]);

  const addOffer = useCallback(async (offerData) => {
    try {
      await createOffer(offerData);
      await fetchOffers();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [fetchOffers]);

  const toggle = useCallback(async (id, enabled) => {
    try {
      await toggleOffer(id, enabled);
      setData(prev => prev.map(o => o.id === id ? { ...o, enabled } : o));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const remove = useCallback(async (id) => {
    try {
      await deleteOffer(id);
      await fetchOffers();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [fetchOffers]);

  return { data, loading, error, refresh: fetchOffers, addOffer, toggle, remove };
}
