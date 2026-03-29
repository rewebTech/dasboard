/**
 * businessService.js
 * ─────────────────────────────────────────────────────────
 * Business CRUD APIs.
 * ─────────────────────────────────────────────────────────
 */

import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

/**
 * Create a new business profile (multipart/form-data).
 */
export async function createBusiness(formData) {
  const response = await axiosInstance.post(ENDPOINTS.BUSINESS.CREATE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

/**
 * Update existing business (multipart/form-data, all fields optional).
 */
export async function updateBusiness(formData) {
  const response = await axiosInstance.patch(ENDPOINTS.BUSINESS.UPDATE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

/**
 * Get business by ID.
 */
export async function getBusinessById(id, params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = ENDPOINTS.BUSINESS.GET_BY_ID(id) + (query ? `?${query}` : '');
  const response = await axiosInstance.get(url);
  return response.data;
}

/**
 * Get all featured businesses.
 */
export async function getAllFeaturedBusinesses(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = ENDPOINTS.BUSINESS.GET_ALL_FEATURED + (query ? `?${query}` : '');
  const response = await axiosInstance.get(url);
  return response.data;
}



