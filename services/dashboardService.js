/**
 * dashboardService.js
 * ─────────────────────────────────────────────────────────
 * All dashboard-related API calls in one place.
 * Uses axiosInstance + ENDPOINTS + buildUrl for clean calls.
 * ─────────────────────────────────────────────────────────
 */

import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { buildUrl } from '@/api/urlBuilder';
import { getDemoDashboardData } from '@/lib/demoData';

async function withDemoFallback(requestFn, fallbackValue) {
  try {
    const data = await requestFn();
    return data ?? fallbackValue;
  } catch {
    return fallbackValue;
  }
}

/**
 * Fetch all dashboard stats (views, bookings, revenue, rating).
 * Used on the main dashboard page.
 *
 * @returns {Promise<object>} Stats object
 */
export async function getDashboardStats() {
  return withDemoFallback(
    () => axiosInstance.get(ENDPOINTS.DASHBOARD.STATS),
    getDemoDashboardData().stats
  );
}

/**
 * Fetch recent activity feed.
 *
 * @param {{ limit?: number }} [params]
 * @returns {Promise<Array>} Activity items
 */
export async function getDashboardActivity(params = {}) {
  const url = buildUrl(ENDPOINTS.DASHBOARD.ACTIVITY, params);
  return withDemoFallback(
    () => axiosInstance.get(url),
    getDemoDashboardData().activity
  );
}

/**
 * Fetch performance metrics (profile completion, response rate).
 *
 * @returns {Promise<object>}
 */
export async function getDashboardPerformance() {
  return withDemoFallback(
    () => axiosInstance.get(ENDPOINTS.DASHBOARD.PERFORMANCE),
    getDemoDashboardData().performance
  );
}
