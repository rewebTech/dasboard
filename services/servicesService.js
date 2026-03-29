/**
 * servicesService.js
 * ─────────────────────────────────────────────────────────
 * Services CRUD operations.
 * Fetches services and creates new services.
 * ─────────────────────────────────────────────────────────
 */

import { ENDPOINTS } from '@/api/endpoints';
import { getUserSession } from '@/lib/helpers';
import axiosInstance from '@/api/axiosInstance';

export async function getServices(params={}) {
  const session = getUserSession();
  const businessId = session.dashboard?.business_id;
  if (!businessId) return [];

  const query = new URLSearchParams(params).toString();
  const url =
    ENDPOINTS.SERVICES.LIST(businessId) + (query ? `?${query}` : "");
  const response = await axiosInstance.get(url);
  return response.data;
}

export async function createService(payload) {
  const session = getUserSession();
  const businessId = session.dashboard?.business_id;
  if (!businessId) throw new Error('Business ID not found');

  const requestBody = {
    business_id: businessId,
    ...payload
  };

  const response = await axiosInstance.post(ENDPOINTS.SERVICES.CREATE, requestBody);
  return response.data;
}
