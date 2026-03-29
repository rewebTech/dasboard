/**
 * endpoints.js
 * ─────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for every API endpoint.
 * Backend: http://localhost:5000/api/v1
 * ─────────────────────────────────────────────────────────
 */

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export const ENDPOINTS = {
  // ── Auth ──────────────────────────────────────────────
  AUTH: {
    LOGIN_BUSINESS: "/users/login-business",
    SIGNUP: "/users/signup",
    PROFILE_UPLOAD: "/users/profile-upload",
    PROFILE_UPDATE: "/users/profile-update",
  },

  // ── Subscriptions (Razorpay) ──────────────────────────
  SUBSCRIPTION: {
    REGISTER: "/subscriptions/register",
    VERIFY: "/subscriptions/verify",
    DETAIL: "/subscriptions/detail",
  },

  // ── Business ──────────────────────────────────────────
  BUSINESS: {
    CREATE: "/business/createBusiness",
    UPDATE: "/business/updateBusiness",
    GET_ALL_FEATURED: "/business/getAllFeatureBusiness",
    GET_BY_ID: (id) => `/business/getBusinessById/${id}`,
  },

  // ── Categories ────────────────────────────────────────
  CATEGORIES: {
    LIST: "/categories/",
  },

  // ── Cities ────────────────────────────────────────────
  CITIES: {
    LIST: "/cities/",
  },

  // ── Reviews ───────────────────────────────────────────
  REVIEWS: {
    BY_BUSINESS: (businessId) => `/reviews/${businessId}`,
  },

  // ── SERVICES ───────────────────────────────────────────
  SERVICES: {
    LIST: (businessId) => `services/get_service/${businessId}`,
    CREATE: "/services/create_service",
  },
};
