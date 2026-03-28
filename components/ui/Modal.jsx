/**
 * Modal.jsx
 * ─────────────────────────────────────────────────────────
 * Accessible modal dialog with overlay, header, body, footer.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/helpers';
import Button from './Button';

export default function Modal({ isOpen, onClose, title, children, footer, size = 'md' }) {
  const SIZE = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' };

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={cn('w-full bg-surface border border-dark-700 rounded-lg shadow-modal animate-slide-up', SIZE[size] || SIZE.md)}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-800">
          <h2 className="text-md font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded text-dark-400 hover:bg-dark-800 hover:text-white transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-5 py-4 border-t border-dark-800 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
