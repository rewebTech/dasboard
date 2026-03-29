/**
 * useReviews.js
 * ─────────────────────────────────────────────────────────
 * Hook for fetching reviews by business ID from session.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUserSession } from '@/lib/helpers';
import { getReviewsByBusiness } from '@/services/reviewsService';

export function useReviews(page = 1, limit = 10) {
  const [reviews,    setReviews]    = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const session = getUserSession();
      const businessId = session.dashboard?.business_id;
      if (!businessId) {
        setError('No business found');
        setLoading(false);
        return;
      }
      const data = await getReviewsByBusiness(businessId, { limit, page });
      setReviews(data?.reviews || []);
      setPagination(data?.pagination || null);
    } catch (err) {
      setError(err.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  return { reviews, pagination, loading, error, refresh: fetchReviews };
}
