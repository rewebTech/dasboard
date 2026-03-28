/**
 * useAuth.js
 * ─────────────────────────────────────────────────────────
 * Custom hook for authentication state and actions.
 * Components use this — NEVER call authService directly.
 *
 * Provides: { user, loading, error, login, logout, isAuthenticated }
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, logoutUser, getCurrentUser } from '@/services/authService';
import { isAuthenticated, removeToken } from '@/lib/helpers';

export function useAuth() {
  const router = useRouter();
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ── Hydrate user on mount ──────────────────────────────
  useEffect(() => {
    async function hydrate() {
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch {
        removeToken(); // Token invalid — clear it
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    hydrate();
  }, []);

  // ── Login ──────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(credentials);
      setUser(data.user);
      router.push('/dashboard');
      return { success: true };
    } catch (err) {
      const msg = err.message || 'Login failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, [router]);

  // ── Logout ─────────────────────────────────────────────
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setLoading(false);
      router.push('/login');
    }
  }, [router]);

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
