/**
 * Button.jsx
 * ─────────────────────────────────────────────────────────
 * Reusable button component with variant, size, loading state.
 * Use this everywhere — never write raw button styles.
 *
 * Variants: primary | secondary | danger | ghost | outline
 * Sizes:    sm | md | lg
 * ─────────────────────────────────────────────────────────
 */

import { cn } from '@/lib/helpers';

const VARIANTS = {
  primary:   'bg-accent hover:bg-accent-dark text-black font-semibold',
  secondary: 'bg-dark-700 hover:bg-dark-600 text-white font-medium',
  danger:    'bg-status-error hover:bg-red-600 text-white font-semibold',
  ghost:     'bg-transparent hover:bg-dark-800 text-dark-300 hover:text-white font-medium',
  outline:   'bg-transparent border border-dark-700 hover:border-dark-500 hover:bg-dark-800 text-white font-medium',
};

const LIGHT_VARIANTS = {
  primary:   'bg-blue-600 hover:bg-blue-700 text-white font-semibold',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium',
  danger:    'bg-red-500 hover:bg-red-600 text-white font-semibold',
  ghost:     'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900 font-medium',
  outline:   'bg-transparent border border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-800 font-medium',
};

const SIZES = {
  sm: 'text-xs px-3 py-1.5 rounded gap-1.5',
  md: 'text-sm px-4 py-2 rounded gap-2',
  lg: 'text-base px-5 py-2.5 rounded gap-2',
};

export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  disabled = false,
  icon,
  iconRight,
  className,
  onClick,
  type     = 'button',
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-150 cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-accent/40',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANTS[variant] || VARIANTS.primary,
        SIZES[size]       || SIZES.md,
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}

      {children}

      {iconRight && !loading && (
        <span className="flex-shrink-0">{iconRight}</span>
      )}
    </button>
  );
}
