import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { buildUrl, mergeParams, paginationParams } from '@/api/urlBuilder';

export async function getReviews(params = {}) {
  const url = buildUrl(ENDPOINTS.REVIEWS.LIST, mergeParams(paginationParams(1, 10), params));
  return axiosInstance.get(url);
}

export async function getReviewsSummary() {
  return axiosInstance.get(ENDPOINTS.REVIEWS.SUMMARY);
}
