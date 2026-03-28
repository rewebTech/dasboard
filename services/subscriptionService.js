import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

export async function getSubscription() {
  return axiosInstance.get(ENDPOINTS.SUBSCRIPTION.CURRENT);
}

export async function getPlans() {
  return axiosInstance.get(ENDPOINTS.SUBSCRIPTION.PLANS);
}

export async function upgradePlan(planId) {
  return axiosInstance.post(ENDPOINTS.SUBSCRIPTION.UPGRADE, { planId });
}

export async function getBillingPortalUrl() {
  return axiosInstance.post(ENDPOINTS.SUBSCRIPTION.BILLING_PORTAL);
}
