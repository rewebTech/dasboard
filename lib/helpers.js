/**
 * helpers.js
 * ─────────────────────────────────────────────────────────
 * Pure utility functions shared across the entire app.
 * No API calls, no side-effects — only transformations.
 * ─────────────────────────────────────────────────────────
 */

// ── Token Management ─────────────────────────────────────
const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'lb_token';
const TOKEN_COOKIE_DAYS = 7;

function setCookie(name, value, days) {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const pairs = document.cookie ? document.cookie.split('; ') : [];
  const target = `${name}=`;
  for (const pair of pairs) {
    if (pair.startsWith(target)) {
      return decodeURIComponent(pair.slice(target.length));
    }
  }
  return null;
}

function removeCookie(name) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

/** Get auth token from localStorage (client only) */
export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY) || getCookie(TOKEN_KEY);
}

/** Save auth token to localStorage */
export function setToken(token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  setCookie(TOKEN_KEY, token, TOKEN_COOKIE_DAYS);
}

/** Remove auth token (logout) */
export function removeToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  removeCookie(TOKEN_KEY);
}

/** Check if user has a valid token */
export function isAuthenticated() {
  return !!getToken();
}

// ── Number Formatters ────────────────────────────────────

/** Format a number with commas: 12459 → "12,459" */
export function formatNumber(value) {
  if (value == null) return '0';
  return new Intl.NumberFormat('en-US').format(value);
}

/** Format as USD currency: 8240 → "$8,240" */
export function formatCurrency(value, currency = 'USD') {
  if (value == null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style:                 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Format percentage: 85 → "85%" */
export function formatPercent(value, decimals = 1) {
  if (value == null) return '0%';
  return `${parseFloat(value).toFixed(decimals)}%`;
}

// ── String Helpers ───────────────────────────────────────

/** Get initials from a full name: "John Doe" → "JD" */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Capitalize first letter: "active" → "Active" */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Truncate long text: "Hello world..." */
export function truncate(str, maxLength = 60) {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

// ── Date Helpers ─────────────────────────────────────────

/** Format date: "2026-03-20" → "Mar 20, 2026" */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
  });
}

/** Relative time: "2 min ago", "1 hour ago" */
export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

// ── Trend Helpers ────────────────────────────────────────

/** Returns true if a trend string is positive */
export function isPositiveTrend(trend) {
  if (!trend) return true;
  return !String(trend).startsWith('-');
}

// ── Class Helpers ────────────────────────────────────────

/** Status badge color classes */
export function statusClasses(status) {
  const map = {
    active:   'bg-status-success-muted text-status-success',
    inactive: 'bg-dark-700 text-dark-400',
    expired:  'bg-status-error-muted text-status-error',
    pending:  'bg-accent-muted text-accent',
  };
  return map[status?.toLowerCase()] || map.inactive;
}

/** Merge class names (simple version) */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ── Storage Helpers ──────────────────────────────────────

/** Get a value from localStorage safely */
export function getStorage(key, fallback = null) {
  if (typeof window === 'undefined') return fallback;
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

/** Set a value in localStorage safely */
export function setStorage(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('[Storage] Failed to save:', key, e);
  }
}
