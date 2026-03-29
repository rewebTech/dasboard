import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

export async function getAllCities() {
  const response = await axiosInstance.get(ENDPOINTS.CITIES.LIST);
  return response.data;
}
