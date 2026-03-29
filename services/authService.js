/**
 * authService.js
 * ─────────────────────────────────────────────────────────
 * Handles business login and profile APIs.
 * ─────────────────────────────────────────────────────────
 */

import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { setToken, removeToken, setUserSession, clearUserSession } from '@/lib/helpers';

/**
 * Business login — returns user, dashboard, subscription, token.
 */
export async function loginBusiness(credentials) {
  const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN_BUSINESS, credentials);
  const { token, user, dashboard, subscription } = response.data;
  if (token) {
    setToken(token);
    setUserSession({ user, dashboard, subscription });
  }
  return response.data;
}

/**
 * Logout — just clear local state (no backend logout endpoint).
 */
export function logoutUser() {
  removeToken();
  clearUserSession();
}

/**
 * Update user profile (name, phone, email).
 */
export async function updateProfile(data) {
  const response = await axiosInstance.patch(ENDPOINTS.AUTH.PROFILE_UPDATE, data);
  return response.data;
}

/**
 * Upload avatar with optional profile fields.
 */
export async function uploadAvatar(formData) {
  const response = await axiosInstance.post(ENDPOINTS.AUTH.PROFILE_UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}
