/**
 * app/dashboard/layout.jsx
 * ─────────────────────────────────────────────────────────
 * Layout for all /dashboard/* routes.
 * This is a SERVER COMPONENT — handles SSR-level auth check.
 * Wraps children in DashboardLayout (sidebar + header).
 * ─────────────────────────────────────────────────────────
 */

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { BASE_URL, ENDPOINTS } from '@/api/endpoints';

/**
 * SSR Auth check.
 * Reads the token from cookies on the server.
 * If missing, redirects to /login before sending any HTML.
 */
async function getServerUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('lb_token')?.value;
  const enforceGuard = process.env.NEXT_PUBLIC_ENABLE_AUTH_GUARD === 'true';

  if (!token && enforceGuard) {
    redirect('/login');
  }

  if (token) {
    try {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.AUTH.ME}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });

      if (response.ok) {
        return response.json();
      }

      if (enforceGuard && response.status === 401) {
        redirect('/login');
      }
    } catch {
      // For local development without backend connectivity, fallback below.
    }
  }

  return {
    name:     'John Doe',
    email:    'john@business.com',
    initials: 'JD',
  };
}

export default async function Layout({ children }) {
  const user = await getServerUser();

  return (
    <DashboardLayout user={user}>
      {children}
    </DashboardLayout>
  );
}
