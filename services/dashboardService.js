/**
 * dashboardService.js
 * ─────────────────────────────────────────────────────────
 * Dashboard data fetching — uses business + reviews APIs.
 * No dedicated dashboard endpoint in the backend.
 * ─────────────────────────────────────────────────────────
 */

import { getBusinessById } from './businessService';
import { getReviewsByBusiness } from './reviewsService';

export async function getDashboardData(businessId) {
  if (!businessId) return { business: null, reviews: [] };

  const [business, reviewsData] = await Promise.all([
    getBusinessById(businessId).catch(() => null),
    getReviewsByBusiness(businessId, { limit: 5, page: 1 }).catch(() => null),
  ]);

  return {
    business,
    reviews: reviewsData?.reviews || [],
  };
}
