/**
 * servicesService.js
 * ─────────────────────────────────────────────────────────
 * Business services CRUD API calls.
 * ─────────────────────────────────────────────────────────
 */

import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { buildUrl, mergeParams, paginationParams } from '@/api/urlBuilder';

export async function getServices(params = {}) {
  const url = buildUrl(ENDPOINTS.SERVICES.LIST, mergeParams(paginationParams(), params));
  return axiosInstance.get(url);
}

export async function getServiceById(id) {
  return axiosInstance.get(ENDPOINTS.SERVICES.DETAIL(id));
}

export async function createService(data) {
  return axiosInstance.post(ENDPOINTS.SERVICES.LIST, data);
}

export async function updateService(id, data) {
  return axiosInstance.put(ENDPOINTS.SERVICES.DETAIL(id), data);
}

export async function deleteService(id) {
  return axiosInstance.delete(ENDPOINTS.SERVICES.DETAIL(id));
}
