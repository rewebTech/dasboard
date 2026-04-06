/**
 * app/layout.jsx — Root layout
 * ─────────────────────────────────────────────────────────
 * Wraps the entire app. Provides global styles + ToastProvider.
 * ─────────────────────────────────────────────────────────
 */

import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata = {
  metadataBase: new URL('https://app.sundayhundred.com'),
  title: {
    default: 'Sunday Hundred Dashboard',
    template: '%s | Sunday Hundred',
  },
  description: 'Manage your business — services, reviews, subscriptions and more.',
  applicationName: 'Sunday Hundred',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Sunday Hundred Dashboard',
    description: 'Manage your business — services, reviews, subscriptions and more.',
    url: '/',
    siteName: 'Sunday Hundred',
    type: 'website',
    images: [
      {
        url: '/sundayhundred.jpeg',
        width: 1200,
        height: 630,
        alt: 'Sunday Hundred dashboard preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunday Hundred Dashboard',
    description: 'Manage your business — services, reviews, subscriptions and more.',
    images: ['/sundayhundred.jpeg'],
  },
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
