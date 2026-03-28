/**
 * ProtectedRoute.jsx
 * ─────────────────────────────────────────────────────────
 * Wraps pages that require authentication.
 * Redirects to /login if no token found.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/helpers';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  // While checking auth, show nothing (or a spinner)
  if (typeof window !== 'undefined' && !isAuthenticated()) {
    return (
      <div className="flex items-center justify-center h-screen bg-dark-950">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return children;
}
