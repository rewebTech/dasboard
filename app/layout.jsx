/**
 * app/layout.jsx — Root layout
 * ─────────────────────────────────────────────────────────
 * Wraps the entire app. Provides global styles + ToastProvider.
 * ─────────────────────────────────────────────────────────
 */

import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata = {
  title:       'Sunday Hundred — Business Dashboard',
  description: 'Manage your business — services, reviews, subscriptions and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
