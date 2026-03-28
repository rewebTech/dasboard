/**
 * useDashboard.js
 * ─────────────────────────────────────────────────────────
 * Custom hook for dashboard data.
 * Handles loading, error, and refresh states.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getDashboardStats,
  getDashboardActivity,
  getDashboardPerformance,
} from '@/services/dashboardService';

export function useDashboard(initialData = null) {
  const hasInitialData = !!initialData;

  const [stats,       setStats]       = useState(initialData?.stats || null);
  const [activity,    setActivity]    = useState(initialData?.activity || []);
  const [performance, setPerformance] = useState(initialData?.performance || null);
  const [loading,     setLoading]     = useState(!hasInitialData);
  const [error,       setError]       = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, activityData, perfData] = await Promise.all([
        getDashboardStats(),
        getDashboardActivity({ limit: 10 }),
        getDashboardPerformance(),
      ]);
      setStats(statsData);
      setActivity(activityData?.items || activityData || []);
      setPerformance(perfData);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasInitialData) {
      fetchAll();
    }
  }, [fetchAll, hasInitialData]);

  return { stats, activity, performance, loading, error, refresh: fetchAll };
}
