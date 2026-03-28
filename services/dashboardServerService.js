import 'server-only';

import { BASE_URL, ENDPOINTS } from '@/api/endpoints';
import { getDemoDashboardData } from '@/lib/demoData';

async function serverGet(endpoint, token, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Dashboard request failed (${response.status})`);
  }

  return response.json();
}

function fallbackDashboardData() {
  return getDemoDashboardData();
}

export async function getServerDashboardData(token) {
  try {
    const [stats, activity, performance] = await Promise.all([
      serverGet(ENDPOINTS.DASHBOARD.STATS, token),
      serverGet(ENDPOINTS.DASHBOARD.ACTIVITY, token, { limit: 10 }),
      serverGet(ENDPOINTS.DASHBOARD.PERFORMANCE, token),
    ]);

    return {
      stats: stats || fallbackDashboardData().stats,
      activity: activity?.items || activity || [],
      performance: performance || fallbackDashboardData().performance,
    };
  } catch {
    return fallbackDashboardData();
  }
}
