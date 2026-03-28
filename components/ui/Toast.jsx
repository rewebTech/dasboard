/**
 * Toast.jsx
 * ─────────────────────────────────────────────────────────
 * Global toast notification system.
 * Usage: import { useToast } from '@/components/ui/Toast'
 *        const { toast } = useToast();
 *        toast.success('Saved!') | toast.error('Failed!')
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/lib/helpers';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error:   (msg) => addToast(msg, 'error'),
    info:    (msg) => addToast(msg, 'info'),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
        {toasts.map(t => (
          <div
            key={t.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded border text-sm font-medium shadow-modal animate-slide-up min-w-[240px]',
              t.type === 'success' && 'bg-surface border-status-success/40 text-white border-l-4 border-l-status-success',
              t.type === 'error'   && 'bg-surface border-status-error/40   text-white border-l-4 border-l-status-error',
              t.type === 'info'    && 'bg-surface border-status-info/40    text-white border-l-4 border-l-status-info',
            )}
          >
            <span>
              {t.type === 'success' && '✓'}
              {t.type === 'error'   && '✕'}
              {t.type === 'info'    && 'ℹ'}
            </span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
