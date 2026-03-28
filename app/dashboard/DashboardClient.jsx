/**
 * DashboardClient.jsx
 * Client dashboard view.
 * Receives optional SSR-hydrated data and keeps interactivity in CSR.
 */

'use client';

import { useDashboard } from '@/hooks/useDashboard';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { StatCardSkeleton } from '@/components/ui/Skeleton';
import { formatNumber, formatCurrency } from '@/lib/helpers';

export default function DashboardClient({ initialData }) {
  const { stats, activity, performance, loading, error, refresh } = useDashboard(initialData);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-dark-400 text-sm">{error}</p>
        <Button variant="outline" size="sm" onClick={refresh}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-sm text-dark-400">Welcome back, John! Here&apos;s your business overview.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard
              label="Total Views"
              value={formatNumber(stats?.totalViews?.value ?? 0)}
              trend={stats?.totalViews?.trend}
              icon={<EyeIcon />}
            />
            <StatCard
              label="Total Bookings"
              value={formatNumber(stats?.totalBookings?.value ?? 0)}
              trend={stats?.totalBookings?.trend}
              icon={<CalendarIcon />}
            />
            <StatCard
              label="Avg. Rating"
              value={stats?.avgRating?.value ?? '—'}
              trend={stats?.avgRating?.trend}
              icon={<StarIcon />}
            />
            <StatCard
              label="Revenue"
              value={stats?.revenue?.isCurrency
                ? formatCurrency(stats.revenue.value)
                : stats?.revenue?.value ?? '—'}
              trend={stats?.revenue?.trend}
              icon={<DollarIcon />}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-[1fr_290px] gap-4">
        <Card>
          <CardHeader title="Recent Activity" />
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
          ) : (
            <div>
              {activity.map((item, i) => (
                <ActivityItem key={i} item={item} />
              ))}
            </div>
          )}
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="Quick Actions" />
            <CardBody className="p-3 space-y-2">
              {[
                { label: 'Add New Service', icon: <PlusIcon />, href: '/services' },
                { label: 'Create Offer', icon: <TagIcon />, href: '/offers' },
                { label: 'View Bookings', icon: <CalendarIcon />, href: '/services' },
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

          <Card>
            <CardHeader title="Performance" />
            <CardBody className="space-y-4">
              {loading ? (
                <>
                  <ProgressSkeleton />
                  <ProgressSkeleton />
                </>
              ) : (
                <>
                  <ProgressBar
                    label="Profile Completion"
                    value={performance?.profileCompletion ?? 0}
                    color="bg-accent"
                  />
                  <ProgressBar
                    label="Response Rate"
                    value={performance?.responseRate ?? 0}
                    color="bg-status-success"
                  />
                </>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ item }) {
  const iconMap = {
    calendar: <CalendarIcon />,
    star: <StarIcon />,
    tag: <TagIcon />,
    eye: <EyeIcon />,
  };

  return (
    <div className="flex items-start gap-3 px-5 py-3.5 border-b border-dark-800 last:border-0 hover:bg-dark-800/40 transition-colors">
      <div className="w-8 h-8 rounded bg-accent-muted flex items-center justify-center text-accent flex-shrink-0">
        <span className="w-4 h-4">{iconMap[item.icon] || <EyeIcon />}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{item.title}</p>
        <p className="text-xs text-dark-400 mt-0.5">
          {item.stars ? (
            <span>
              {'★'.repeat(item.stars)}{'☆'.repeat(5 - item.stars)}
              <span className="ml-1">{item.starLabel}</span>
            </span>
          ) : item.subtitle}
        </p>
      </div>
      <span className="text-xs text-dark-500 flex-shrink-0">{item.time}</span>
    </div>
  );
}

function ProgressBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-dark-400">{label}</span>
        <span className="text-xs font-semibold text-white">{value}%</span>
      </div>
      <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ProgressSkeleton() {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <div className="h-2.5 w-28 bg-dark-800 rounded animate-shimmer" />
        <div className="h-2.5 w-8 bg-dark-800 rounded animate-shimmer" />
      </div>
      <div className="h-1.5 bg-dark-800 rounded-full" />
    </div>
  );
}

function EyeIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
function CalendarIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>; }
function StarIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }
function DollarIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>; }
function PlusIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function TagIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>; }
