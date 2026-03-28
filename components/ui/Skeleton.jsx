/**
 * Skeleton.jsx — Loading placeholder components.
 */

import { cn } from '@/lib/helpers';

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'rounded bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 bg-[length:200%_100%] animate-shimmer',
        className
      )}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-surface border border-dark-800 rounded p-5">
      <div className="flex justify-between mb-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
      <Skeleton className="h-7 w-20 mb-2" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton className="h-3 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}

export function CardSkeleton({ lines = 4 }) {
  return (
    <div className="bg-surface border border-dark-800 rounded p-5 space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-3" style={{ width: `${60 + Math.random() * 35}%` }} />
      ))}
    </div>
  );
}
