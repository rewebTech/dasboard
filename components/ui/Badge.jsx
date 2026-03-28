/**
 * Badge.jsx — Status/label pills.
 * Variants: active | inactive | expired | pending | info
 */

import { cn } from '@/lib/helpers';

const VARIANTS = {
  active:   'bg-status-success-muted text-status-success',
  inactive: 'bg-dark-800 text-dark-400',
  expired:  'bg-status-error-muted text-status-error',
  pending:  'bg-accent-muted text-accent',
  info:     'bg-status-info-muted text-status-info',
};

export default function Badge({ label, variant = 'inactive', className }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', VARIANTS[variant] || VARIANTS.inactive, className)}>
      {label}
    </span>
  );
}
