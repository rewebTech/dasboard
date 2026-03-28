/**
 * endpoints.js
 * ─────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for every API endpoint.
 * Never hardcode a URL anywhere else in the app.
 * If a backend route changes, update it here ONLY.
 * ─────────────────────────────────────────────────────────
 */

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export const ENDPOINTS = {
  // ── Auth ──────────────────────────────────────────────
  AUTH: {
    LOGIN:   '/auth/login',
    LOGOUT:  '/auth/logout',
    ME:      '/auth/me',
    REFRESH: '/auth/refresh',
  },

  // ── Dashboard ─────────────────────────────────────────
  DASHBOARD: {
    STATS:       '/dashboard/stats',
    ACTIVITY:    '/dashboard/activity',
    PERFORMANCE: '/dashboard/performance',
  },

  // ── Business Profile ──────────────────────────────────
  BUSINESS: {
    PROFILE: '/business/profile',
    GALLERY: '/business/gallery',
  },

  // ── Services ──────────────────────────────────────────
  SERVICES: {
    LIST:   '/services',
    DETAIL: (id) => `/services/${id}`,
    STATS:  '/services/stats',
  },

  // ── Offers ────────────────────────────────────────────
  OFFERS: {
    LIST:   '/offers',
    DETAIL: (id) => `/offers/${id}`,
    TOGGLE: (id) => `/offers/${id}/toggle`,
  },

  // ── Reviews ───────────────────────────────────────────
  REVIEWS: {
    LIST:    '/reviews',
    SUMMARY: '/reviews/summary',
  },

  // ── Subscription ──────────────────────────────────────
  SUBSCRIPTION: {
    CURRENT:        '/subscription',
    PLANS:          '/subscription/plans',
    UPGRADE:        '/subscription/upgrade',
    BILLING_PORTAL: '/subscription/billing-portal',
  },
};
