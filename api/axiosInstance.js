/**
 * axiosInstance.js
 * ─────────────────────────────────────────────────────────
 * Centralized Axios instance.
 * ALL API calls in the app go through this instance.
 *
 * Features:
 *   - baseURL from env
 *   - Request interceptor: attaches Authorization token
 *   - Response interceptor: normalizes errors, handles 401
 *   - Timeout configuration
 * ─────────────────────────────────────────────────────────
 */

import axios from 'axios';
import { BASE_URL } from './endpoints';
import { getToken, removeToken } from '@/lib/helpers';

// ── Create instance ──────────────────────────────────────
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
});

// ── Request Interceptor ──────────────────────────────────
// Attaches the Bearer token to every outgoing request.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Request config error (rare) — reject immediately
    return Promise.reject(error);
  }
);

// ── Response Interceptor ─────────────────────────────────
// Normalize successful responses and handle common errors.
axiosInstance.interceptors.response.use(
  (response) => {
    // Unwrap data so callers get response.data directly
    return response.data;
  },
  (error) => {
    const status  = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // ── 401: Token expired / unauthorized ──
    if (status === 401) {
      removeToken();
      // Only redirect on client side
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    // ── 403: Forbidden ──
    if (status === 403) {
      console.warn('[API] Access forbidden:', error.config?.url);
    }

    // ── 500: Server error ──
    if (status >= 500) {
      console.error('[API] Server error:', error.config?.url, message);
    }

    // Normalize the error shape for consistent handling in services
    return Promise.reject({
      status:  status || 0,
      message,
      data:    error.response?.data || null,
      isAxiosError: true,
    });
  }
);

export default axiosInstance;
