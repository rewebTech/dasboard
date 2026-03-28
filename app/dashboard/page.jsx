/**
 * app/dashboard/page.jsx
 * Server entry for dashboard route.
 * Fetches initial dashboard data on the server (SSR), then hydrates the client view.
 */

import { cookies } from 'next/headers';
import DashboardClient from './DashboardClient';
import { getServerDashboardData } from '@/services/dashboardServerService';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const token = cookies().get('lb_token')?.value;
  const initialData = await getServerDashboardData(token);

  return <DashboardClient initialData={initialData} />;
}
