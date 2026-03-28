'use client';

import { useMemo, useState } from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatNumber, formatPercent } from '@/lib/helpers';

const PERIODS = [
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' },
];

export default function DashboardAnalyticsPage() {
  const [period, setPeriod] = useState('30d');
  const { stats, activity, performance, loading, error, refresh } = useDashboard();

  const activitySummary = useMemo(() => {
    if (!Array.isArray(activity)) return { total: 0, reviews: 0, bookings: 0 };

    const reviews = activity.filter((item) => item.icon === 'star').length;
    const bookings = activity.filter((item) => item.icon === 'calendar').length;

    return {
      total: activity.length,
      reviews,
      bookings,
    };
  }, [activity]);

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard Analytics</h1>
          <p className="text-sm text-dark-400">Interactive analytics view for trend monitoring and planning.</p>
        </div>

        <div className="flex items-center gap-2">
          {PERIODS.map((item) => (
            <Button
              key={item.value}
              size="sm"
              variant={period === item.value ? 'primary' : 'outline'}
              onClick={() => setPeriod(item.value)}
            >
              {item.label}
            </Button>
          ))}
          <Button size="sm" variant="ghost" onClick={refresh}>Refresh</Button>
        </div>
      </div>

      {error && (
        <Card>
          <CardBody>
            <p className="text-sm text-status-error">{error}</p>
          </CardBody>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard title="Views" value={loading ? '...' : formatNumber(stats?.totalViews?.value || 0)} subtitle={`Period: ${period}`} />
        <MetricCard title="Bookings" value={loading ? '...' : formatNumber(stats?.totalBookings?.value || 0)} subtitle={`Period: ${period}`} />
        <MetricCard title="Profile Completion" value={loading ? '...' : formatPercent(performance?.profileCompletion || 0, 0)} subtitle="Operational health" />
        <MetricCard title="Response Rate" value={loading ? '...' : formatPercent(performance?.responseRate || 0, 0)} subtitle="Customer support quality" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Activity Mix" />
          <CardBody className="space-y-3">
            <AnalyticsRow label="Total activities" value={activitySummary.total} />
            <AnalyticsRow label="Review events" value={activitySummary.reviews} />
            <AnalyticsRow label="Booking events" value={activitySummary.bookings} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Observations" />
          <CardBody className="space-y-2 text-sm text-dark-300">
            <p>Use this page to add module-specific charts without changing the base dashboard page.</p>
            <p>Keep data access in hooks so all analytics widgets remain reusable and testable.</p>
            <p>SSR is used on the main dashboard for fast first paint. This page demonstrates CSR for rich interactivity.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle }) {
  return (
    <Card>
      <CardBody>
        <p className="text-xs text-dark-500 uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        <p className="text-xs text-dark-400 mt-2">{subtitle}</p>
      </CardBody>
    </Card>
  );
}

function AnalyticsRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-dark-800 pb-2 last:border-0 last:pb-0">
      <span className="text-dark-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}
