/**
 * subscriptionService.js
 * ─────────────────────────────────────────────────────────
 * Subscription registration (Razorpay) + detail APIs.
 * ─────────────────────────────────────────────────────────
 */

import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

/**
 * Register business + create Razorpay order.
 * Returns: { order_id, amount, currency, key_id, user }
 */
export async function registerAndCreateOrder(data) {
  const response = await axiosInstance.post(ENDPOINTS.SUBSCRIPTION.REGISTER, data);
  return response.data;
}

/**
 * Verify Razorpay payment after checkout.
 */
export async function verifyPayment(paymentData) {
  const response = await axiosInstance.post(ENDPOINTS.SUBSCRIPTION.VERIFY, paymentData);
  return response.data;
}

/**
 * Get subscription detail for logged-in business user.
 */
export async function getSubscriptionDetail() {
  const response = await axiosInstance.get(ENDPOINTS.SUBSCRIPTION.DETAIL);
  return response.data;
}
