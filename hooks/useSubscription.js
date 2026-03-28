'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSubscription, getPlans, upgradePlan, getBillingPortalUrl } from '@/services/subscriptionService';

export function useSubscription() {
  const [subscription, setSubscription] = useState(null);
  const [plans,        setPlans]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [subRes, plansRes] = await Promise.all([
        getSubscription(),
        getPlans(),
      ]);
      setSubscription(subRes);
      setPlans(plansRes?.plans || plansRes || []);
    } catch (err) {
      setError(err.message || 'Failed to load subscription');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const upgrade = useCallback(async (planId) => {
    try {
      await upgradePlan(planId);
      await fetchData();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [fetchData]);

  const openBillingPortal = useCallback(async () => {
    try {
      const res = await getBillingPortalUrl();
      if (res?.url) window.location.href = res.url;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  return { subscription, plans, loading, error, upgrade, openBillingPortal, refresh: fetchData };
}
