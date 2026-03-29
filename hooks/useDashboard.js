/**
 * useDashboard.js
 * ─────────────────────────────────────────────────────────
 * Hook for dashboard data — combines session data with
 * business details and recent reviews from API.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUserSession } from '@/lib/helpers';
import { getBusinessById } from '@/services/businessService';
import { getReviewsByBusiness } from '@/services/reviewsService';

export function useDashboard() {
  const [session,  setSession]  = useState(null);
  const [business, setBusiness] = useState(null);
  const [reviews,  setReviews]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const sess = getUserSession();
      setSession(sess);

      const businessId = sess.dashboard?.business_id;
      if (businessId) {
        const [bizData, reviewData] = await Promise.all([
          getBusinessById(businessId).catch(() => null),
          getReviewsByBusiness(businessId, { limit: 5, page: 1 }).catch(() => null),
        ]);
        if (bizData) setBusiness(bizData);
        if (reviewData?.reviews) setReviews(reviewData.reviews);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { session, business, reviews, loading, error, refresh: fetchAll };
}
