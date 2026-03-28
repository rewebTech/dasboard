/**
 * DashboardLayout.jsx
 * ─────────────────────────────────────────────────────────
 * Master layout for all authenticated dashboard pages.
 * Renders: Sidebar + Header + main content area.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

// Default user — replace with real user from useAuth() at page level
const DEFAULT_USER = {
  name: 'John Doe',
  email: 'john@business.com',
  initials: 'JD',
};

export default function DashboardLayout({ children, user = DEFAULT_USER }) {
  return (
    <div className="flex h-screen overflow-hidden bg-dark-950">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header user={user} />

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto p-7 bg-dark-900">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
