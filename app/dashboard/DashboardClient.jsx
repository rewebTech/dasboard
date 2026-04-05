/**
 * DashboardClient.jsx
 * ─────────────────────────────────────────────────────────
 * Client dashboard view.
 * Shows business overview from session + API data.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect } from 'react';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { StatCardSkeleton } from '@/components/ui/Skeleton';
import { formatNumber, getUserSession, formatDate } from '@/lib/helpers';
import { getBusinessById } from '@/services/businessService';

export default function DashboardClient() {
  const [business, setBusiness]   = useState(null);
  const [session, setSession]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const sess = getUserSession();
        setSession(sess);

        const businessId = sess.dashboard?.business_id;
        if (businessId) {
          const bizData = await getBusinessById(businessId).catch(() => null);
          if (bizData) setBusiness(bizData);
        }
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const refresh = () => window.location.reload();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-dark-400 text-sm">{error}</p>
        <Button variant="outline" size="sm" onClick={refresh}>Retry</Button>
      </div>
    );
  }

  const userName = session?.user?.name || 'there';
  const dashboardData = session?.dashboard;
  const subscriptionData = session?.subscription;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-sm text-dark-400">
          Welcome back, {userName}! Here&apos;s your business overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-5">
        {loading ? (
          Array.from({ length: 1 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard
              label="Business Status"
              value={dashboardData?.is_active ? 'Active' : 'Inactive'}
              icon={<StatusIcon />}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] gap-4">
        {/* Business Info */}
        <Card>
          <CardHeader title="Business Details" />
          {loading ? (
            <CardBody>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-dark-800 last:border-0">
                  <div className="w-8 h-8 rounded bg-dark-800 animate-shimmer flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-dark-800 rounded animate-shimmer w-1/2" />
                    <div className="h-2.5 bg-dark-800 rounded animate-shimmer w-1/3" />
                  </div>
                </div>
              ))}
            </CardBody>
          ) : business ? (
            <div>
              <InfoRow label="Business Name" value={business.name || dashboardData?.business_name} />
              <InfoRow label="Category" value={business.category_name} />
              <InfoRow label="City" value={business.city_name} />
              <InfoRow label="Contact" value={business.contact} />
              <InfoRow label="WhatsApp" value={business.whatsapp_no} />
              <InfoRow label="Address" value={business.address} />
            </div>
          ) : (
            <CardBody>
              <div className="text-center py-8">
                <p className="text-dark-400 text-sm mb-3">No business profile yet.</p>
                <a href="/business-profile">
                  <Button size="sm">Create Business Profile</Button>
                </a>
              </div>
            </CardBody>
          )}

        </Card>

        {/* Quick Actions + Subscription */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="Quick Actions" />
            <CardBody className="p-3 space-y-2">
              {[
                { label: 'Edit Business', icon: <EditIcon />, href: '/business-profile' },
                { label: 'Subscription', icon: <CardIcon />, href: '/subscription' },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded border border-dark-700 text-white text-sm font-medium hover:bg-dark-800 hover:border-dark-600 transition-colors"
                >
                  <span className="text-dark-400 w-4 h-4">{action.icon}</span>
                  {action.label}
                </a>
              ))}
            </CardBody>
          </Card>

          {/* Subscription Status */}
          {subscriptionData && (
            <Card>
              <CardHeader title="Subscription" />
              <CardBody className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-dark-400">Plan</span>
                  <span className="text-xs font-semibold text-white capitalize">{subscriptionData.plan?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-dark-400">Status</span>
                  <span className={`text-xs font-semibold ${subscriptionData.status === 'active' ? 'text-status-success' : 'text-status-error'}`}>
                    {subscriptionData.status?.charAt(0).toUpperCase() + subscriptionData.status?.slice(1)}
                  </span>
                </div>
                {subscriptionData.end_date && (
                  <div className="flex justify-between">
                    <span className="text-xs text-dark-400">Expires</span>
                    <span className="text-xs font-semibold text-white">{formatDate(subscriptionData.end_date)}</span>
                  </div>
                )}
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 px-5 py-3 border-b border-dark-800 last:border-0">
      <span className="text-xs text-dark-500 w-24 flex-shrink-0">{label}</span>
      <span className="text-sm text-white">{value}</span>
    </div>
  );
}

function StatusIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>; }
function EditIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>; }
function CardIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>; }
