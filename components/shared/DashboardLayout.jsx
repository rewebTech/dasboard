/**
 * DashboardLayout.jsx
 * ─────────────────────────────────────────────────────────
 * Master layout for all authenticated dashboard pages.
 * Renders: Sidebar + Header + main content area.
 * Responsive: Sidebar toggles on mobile.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { getUserSession, getInitials } from '@/lib/helpers';
import { getBusinessById } from '@/services/businessService';

const DEFAULT_USER = {
  name: 'Business Owner',
  email: '',
  initials: 'BO',
};

export default function DashboardLayout({ children, user: serverUser = DEFAULT_USER }) {
  const [user, setUser] = useState(serverUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrateUser = async () => {
      const session = getUserSession();
      if (!session.user || !isMounted) return;

      const sessionQrUrl =
        session.user?.web_qr_url ||
        session.user?.webQrUrl ||
        session.dashboard?.web_qr_url ||
        session.dashboard?.webQrUrl ||
        session.dashboard?.business?.web_qr_url ||
        session.dashboard?.business?.webQrUrl ||
        '';

      let businessQrUrl = '';
      const businessId = session.dashboard?.business_id;
      if (businessId) {
        const business = await getBusinessById(businessId).catch(() => null);
        businessQrUrl =
          business?.web_qr_url ||
          business?.webQrUrl ||
          business?.qr?.web_qr_url ||
          business?.qr?.webQrUrl ||
          '';
      }

      if (!isMounted) return;

      setUser({
        ...session.user,
        web_qr_url: sessionQrUrl || businessQrUrl,
        initials: getInitials(session.user.name),
      });
    };

    hydrateUser();

    return () => {
      isMounted = false;
    };
  }, []);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth < 768 && sidebarOpen) {
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('sidebar-toggle');
        if (sidebar && !sidebar.contains(e.target) && !toggleBtn?.contains(e.target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-dark-950">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile, shown on md+ */}
      <div
        id="sidebar"
        className={`fixed md:static inset-y-0 left-0 z-40 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar user={user} />
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header 
          user={user} 
          sidebarOpen={sidebarOpen} 
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-7 bg-dark-900">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
