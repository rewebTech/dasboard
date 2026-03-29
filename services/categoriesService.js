import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

export async function getAllCategories() {
  const response = await axiosInstance.get(ENDPOINTS.CATEGORIES.LIST);
  return response.data;
}
