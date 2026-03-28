/**
 * Card.jsx
 * ─────────────────────────────────────────────────────────
 * Reusable card container with optional header/footer.
 * ─────────────────────────────────────────────────────────
 */

import { cn } from '@/lib/helpers';

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-surface border border-dark-800 rounded overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className }) {
  return (
    <div className={cn('flex items-center justify-between px-5 py-4 border-b border-dark-800', className)}>
      <div>
        <h3 className="text-md font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-dark-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardBody({ children, className }) {
  return (
    <div className={cn('p-5', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('px-5 py-4 border-t border-dark-800 flex items-center justify-end gap-3', className)}>
      {children}
    </div>
  );
}
