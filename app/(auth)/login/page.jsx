/**
 * app/(auth)/login/page.jsx
 * ─────────────────────────────────────────────────────────
 * Login page — CSR form that calls useAuth().login()
 * No direct API calls — everything through the hook.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [form,  setForm]   = useState({ email: '', password: '' });
  const [error, setError]  = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(form);
    if (!res.success) setError(res.error || 'Login failed');
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-black font-bold">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white">LocalBiz</span>
        </div>

        {/* Card */}
        <div className="bg-surface border border-dark-800 rounded-lg p-7">
          <h1 className="text-xl font-bold text-white mb-1.5">Sign in</h1>
          <p className="text-sm text-dark-400 mb-6">Enter your credentials to access your dashboard.</p>

          {error && (
            <div className="bg-status-error-muted border border-status-error/30 text-status-error text-sm rounded p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="john@business.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
            />
            <Button type="submit" loading={loading} className="w-full justify-center mt-2">
              Sign in
            </Button>
          </form>

          <p className="text-xs text-dark-500 text-center mt-5">
            Demo: use any email + password to test the UI
          </p>
        </div>
      </div>
    </div>
  );
}
