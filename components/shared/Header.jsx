/**
 * Header.jsx
 * ─────────────────────────────────────────────────────────
 * Top navigation bar.
 * Props: user, onThemeToggle, theme
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState } from 'react';
import { cn } from '@/lib/helpers';

export default function Header({ user, activeRole = 'business', onRoleChange }) {
  const [role, setRole] = useState(activeRole);

  const handleRole = (r) => {
    setRole(r);
    onRoleChange?.(r);
  };

  return (
    <header className="h-14 bg-dark-950 border-b border-dark-800 flex items-center px-5 gap-3 flex-shrink-0">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-8 bg-dark-800 border border-dark-700 rounded text-sm text-white placeholder-dark-500 pl-8 pr-3 outline-none focus:border-dark-600 transition-colors"
        />
      </div>

      <div className="flex-1" />

      {/* Role toggle */}
      <div className="flex bg-dark-800 rounded p-0.5 gap-0.5">
        {['business', 'admin'].map((r) => (
          <button
            key={r}
            onClick={() => handleRole(r)}
            className={cn(
              'px-3 py-1 rounded text-xs font-semibold transition-all duration-150 capitalize',
              role === r
                ? 'bg-accent text-black'
                : 'text-dark-400 hover:text-white'
            )}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* Theme toggle */}
      <button className="w-8 h-8 flex items-center justify-center rounded text-dark-400 hover:bg-dark-800 hover:text-white transition-colors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </button>

      {/* Notification bell */}
      <button className="relative w-8 h-8 flex items-center justify-center rounded text-dark-400 hover:bg-dark-800 hover:text-white transition-colors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-status-error rounded-full" />
      </button>

      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black text-xs font-bold cursor-pointer select-none">
        {user?.initials || 'JD'}
      </div>
    </header>
  );
}
