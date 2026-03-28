/**
 * authService.js
 * ─────────────────────────────────────────────────────────
 * Handles all authentication-related API calls.
 * Uses axiosInstance (token auto-attached via interceptor).
 * Components never call this directly — use useAuth() hook.
 * ─────────────────────────────────────────────────────────
 */

import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { setToken, removeToken } from '@/lib/helpers';

/**
 * Login user with email and password.
 * Saves token to localStorage on success.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ user: object, token: string }>}
 */
export async function loginUser(credentials) {
  const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials);
  if (response.token) {
    setToken(response.token);
  }
  return response;
}

/**
 * Logout the current user.
 * Removes token from localStorage and calls backend.
 *
 * @returns {Promise<void>}
 */
export async function logoutUser() {
  try {
    await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);
  } finally {
    removeToken(); // Always clear token, even if API call fails
  }
}

/**
 * Get the currently authenticated user's profile.
 * Used for session hydration on app load.
 *
 * @returns {Promise<object>} User object
 */
export async function getCurrentUser() {
  return axiosInstance.get(ENDPOINTS.AUTH.ME);
}

/**
 * Refresh the auth token.
 * Call this before token expiry to keep the session alive.
 *
 * @returns {Promise<{ token: string }>}
 */
export async function refreshToken() {
  const response = await axiosInstance.post(ENDPOINTS.AUTH.REFRESH);
  if (response.token) {
    setToken(response.token);
  }
  return response;
}
