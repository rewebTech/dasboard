'use client';

import { useState, useEffect, useCallback } from 'react';
import { getReviews, getReviewsSummary } from '@/services/reviewsService';

export function useReviews() {
  const [reviews,  setReviews]  = useState([]);
  const [summary,  setSummary]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [reviewsRes, summaryRes] = await Promise.all([
        getReviews(),
        getReviewsSummary(),
      ]);
      setReviews(reviewsRes?.items || reviewsRes || []);
      setSummary(summaryRes);
    } catch (err) {
      setError(err.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  return { reviews, summary, loading, error, refresh: fetchReviews };
}
