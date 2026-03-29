/**
 * axiosInstance.js
 * ─────────────────────────────────────────────────────────
 * Centralized Axios instance for all API calls.
 * Base URL: http://localhost:5000/api/v1
 * ─────────────────────────────────────────────────────────
 */

import axios from 'axios';
import { BASE_URL } from './endpoints';
import { getToken, removeToken, clearUserSession } from '@/lib/helpers';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
});

// ── Request Interceptor ──────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log('[API Request] URL:', config.url); // Debug URL
    console.log('[API Request] Token available:', !!token); // Debug token existence
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[API Request] Authorization header added'); // Confirm header added
    } else {
      console.warn('[API Request] No token found - request will be unauthenticated');
    }
    
    console.log('[API Request] Headers:', config.headers); // Debug all headers
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ─────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the API response body ({ success, message, data })
    return response.data;
  },
  (error) => {
    const status  = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // 401: Clear all auth state and redirect
    if (status === 401) {
      removeToken();
      clearUserSession();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    if (status === 403) {
      console.warn('[API] Access forbidden:', error.config?.url, message);
    }

    if (status >= 500) {
      console.error('[API] Server error:', error.config?.url, message);
    }

    return Promise.reject({
      status:  status || 0,
      message,
      data:    error.response?.data || null,
      isAxiosError: true,
    });
  }
);

export default axiosInstance;
