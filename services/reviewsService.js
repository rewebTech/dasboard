/**
 * reviewsService.js
 * ─────────────────────────────────────────────────────────
 * Reviews API — fetches reviews by business ID.
 * ─────────────────────────────────────────────────────────
 */

import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

/**
 * Get reviews for a business with pagination.
 */
export async function getReviewsByBusiness(businessId, params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = ENDPOINTS.REVIEWS.BY_BUSINESS(businessId) + (query ? `?${query}` : '');
  const response = await axiosInstance.get(url);
  return response.data;
}
