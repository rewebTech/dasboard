/**
 * StatCard.jsx
 * ─────────────────────────────────────────────────────────
 * Dashboard KPI card: label, value, trend, icon.
 * ─────────────────────────────────────────────────────────
 */

import { cn, isPositiveTrend } from '@/lib/helpers';

export default function StatCard({ label, value, trend, icon }) {
  const positive = isPositiveTrend(trend);

  return (
    <div className="bg-surface border border-dark-800 rounded p-5 hover:border-dark-700 transition-colors">
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-dark-400 font-medium">{label}</span>
        {icon && (
          <div className="w-8 h-8 rounded bg-accent-muted flex items-center justify-center text-accent flex-shrink-0">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="text-3xl font-bold text-white mb-2 leading-none">{value}</div>

      {/* Trend */}
      {trend && (
        <div className={cn('text-xs font-medium', positive ? 'text-status-success' : 'text-status-error')}>
          {trend}
        </div>
      )}
    </div>
  );
}
