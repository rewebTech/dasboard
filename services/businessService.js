import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

export async function getBusinessProfile() {
  return axiosInstance.get(ENDPOINTS.BUSINESS.PROFILE);
}

export async function updateBusinessProfile(data) {
  return axiosInstance.put(ENDPOINTS.BUSINESS.PROFILE, data);
}

export async function uploadGalleryImage(formData) {
  return axiosInstance.post(ENDPOINTS.BUSINESS.GALLERY, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
