/**
 * Header.jsx
 * ─────────────────────────────────────────────────────────
 * Top navigation bar with user avatar, sidebar toggle (mobile).
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { removeToken, clearUserSession } from '@/lib/helpers';

export default function Header({ user, sidebarOpen = false, onSidebarToggle }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const webQrUrl =
    user?.web_qr_url ||
    user?.webQrUrl ||
    user?.business?.web_qr_url ||
    user?.business?.webQrUrl ||
    user?.dashboard?.web_qr_url ||
    user?.dashboard?.webQrUrl ||
    '';

  const handleLogout = () => {
    removeToken();
    clearUserSession();
    router.push('/login');
  };

  return (
    <header className="h-14 bg-dark-950 border-b border-dark-800 flex items-center px-4 md:px-5 gap-3 flex-shrink-0">
      {/* Sidebar toggle - Mobile only */}
      <button
        id="sidebar-toggle"
        onClick={onSidebarToggle}
        className="md:hidden w-8 h-8 flex items-center justify-center text-dark-300 hover:text-white hover:bg-dark-800 rounded transition-colors"
        title="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1" />

      {/* Role badge + business QR */}
      <div className="flex items-center gap-2">
        <div className="bg-dark-800 rounded p-0.5 gap-0.5">
        <span className="px-3 py-1 rounded text-xs font-semibold bg-accent text-black">
          {user?.role ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}` : 'Business'}
        </span>
        </div>

        {webQrUrl && (
          <div className="relative">
            <button
              onClick={() => setShowQr(!showQr)}
              className="w-8 h-8 rounded bg-dark-800 hover:bg-dark-700 text-dark-200 hover:text-white flex items-center justify-center transition-colors"
              title="Business QR"
              aria-label="Open business QR"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm12 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 2h2v2h-2v-2zm-4 2h2v2h-2v-2z" />
              </svg>
            </button>

            {showQr && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowQr(false)} />
                <div className="absolute right-0 top-10 z-50 w-48 bg-surface border border-dark-800 rounded-lg shadow-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-white">Business QR</p>
                    <a
                      href={webQrUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 rounded bg-dark-800 hover:bg-dark-700 text-dark-200 hover:text-white flex items-center justify-center transition-colors"
                      title="Download QR"
                      aria-label="Download QR"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l4-4m-4 4l-4-4M5 19h14" />
                      </svg>
                    </a>
                  </div>
                  <img
                    src={webQrUrl}
                    alt="Business QR"
                    className="w-full h-auto rounded border border-dark-800"
                    loading="lazy"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Avatar + dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black text-xs font-bold cursor-pointer select-none"
        >
          {user?.initials || 'BO'}
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-10 z-50 w-48 bg-surface border border-dark-800 rounded-lg shadow-lg py-1">
              <div className="px-3 py-2 border-b border-dark-800">
                <p className="text-sm font-semibold text-white truncate">{user?.name || 'Business Owner'}</p>
                <p className="text-xs text-dark-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-status-error hover:bg-dark-800 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </>
        )}

      </div>
    </header>
  );
}
