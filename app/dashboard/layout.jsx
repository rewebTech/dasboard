/**
 * app/dashboard/layout.jsx
 * ─────────────────────────────────────────────────────────
 * Layout for /dashboard/* routes — no SSR auth check.
 * User data hydrated on client side from localStorage.
 * ─────────────────────────────────────────────────────────
 */

import DashboardLayout from '@/components/shared/DashboardLayout';

export default function Layout({ children }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
