/**
 * app/layout.jsx — Root layout
 * ─────────────────────────────────────────────────────────
 * Wraps the entire app. Provides global styles + ToastProvider.
 * ─────────────────────────────────────────────────────────
 */

import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata = {
  title:       'LocalBiz — Business Dashboard',
  description: 'Manage your local business — bookings, services, offers, reviews and more.',
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
