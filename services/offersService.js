import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { buildUrl } from '@/api/urlBuilder';

export async function getOffers(params = {}) {
  const url = buildUrl(ENDPOINTS.OFFERS.LIST, params);
  return axiosInstance.get(url);
}

export async function createOffer(data) {
  return axiosInstance.post(ENDPOINTS.OFFERS.LIST, data);
}

export async function toggleOffer(id, enabled) {
  return axiosInstance.patch(ENDPOINTS.OFFERS.TOGGLE(id), { enabled });
}

export async function deleteOffer(id) {
  return axiosInstance.delete(ENDPOINTS.OFFERS.DETAIL(id));
}
