/**
 * useSubscription.js
 * ─────────────────────────────────────────────────────────
 * Hook for subscription detail.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSubscriptionDetail } from '@/services/subscriptionService';

export function useSubscription() {
  const [subscription, setSubscription] = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSubscriptionDetail();
      setSubscription(data);
    } catch (err) {
      setError(err.message || 'Failed to load subscription');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { subscription, loading, error, refresh: fetchData };
}
