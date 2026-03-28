/**
 * Input.jsx
 * ─────────────────────────────────────────────────────────
 * Reusable form input with label, error, helper text.
 * Also exports Textarea for multi-line inputs.
 * ─────────────────────────────────────────────────────────
 */

import { cn } from '@/lib/helpers';

const BASE =
  'w-full bg-surface-2 border border-dark-700 rounded text-white text-sm ' +
  'placeholder-dark-500 px-3 py-2 outline-none transition-colors duration-150 ' +
  'focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed';

export default function Input({
  label,
  error,
  helper,
  className,
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-dark-400">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(BASE, error && 'border-status-error focus:border-status-error', className)}
        {...props}
      />
      {error  && <p className="text-xs text-status-error">{error}</p>}
      {helper && !error && <p className="text-xs text-dark-500">{helper}</p>}
    </div>
  );
}

export function Textarea({ label, error, helper, className, id, rows = 4, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-dark-400">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={cn(BASE, 'resize-y', error && 'border-status-error', className)}
        {...props}
      />
      {error  && <p className="text-xs text-status-error">{error}</p>}
      {helper && !error && <p className="text-xs text-dark-500">{helper}</p>}
    </div>
  );
}
