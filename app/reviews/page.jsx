'use client';

import { useReviews } from '@/hooks/useReviews';
import Card, { CardBody } from '@/components/ui/Card';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { formatNumber } from '@/lib/helpers';
import DashboardLayout from '@/components/shared/DashboardLayout';

export default function ReviewsPage() {
  const { reviews, summary, loading, error } = useReviews();

  const maxCount = summary?.breakdown
    ? Math.max(...summary.breakdown.map(b => b.count))
    : 1;

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Reviews</h1>
          <p className="text-sm text-dark-400">See what your customers are saying.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-[260px_1fr] gap-4">
            <CardSkeleton lines={8} />
            <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} lines={3} />)}</div>
          </div>
        ) : (
          <div className="grid grid-cols-[260px_1fr] gap-4 items-start">
            {/* Summary card */}
            <Card>
              <CardBody className="text-center py-6">
                <div className="text-5xl font-bold text-white mb-2">{summary?.avgRating}</div>
                <div className="flex justify-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: i < Math.round(summary?.avgRating || 0) ? '#F5A623' : '#374151', fontSize: 20 }}>★</span>
                  ))}
                </div>
                <p className="text-xs text-dark-400 mb-6">{formatNumber(summary?.total)} total reviews</p>
                <div className="space-y-2 text-left">
                  {summary?.breakdown?.map(b => (
                    <div key={b.stars} className="flex items-center gap-2">
                      <span className="text-xs text-dark-400 w-3">{b.stars}</span>
                      <span className="text-accent text-xs">★</span>
                      <div className="flex-1 h-1.5 bg-dark-800 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${Math.round((b.count / maxCount) * 100)}%` }} />
                      </div>
                      <span className="text-xs text-dark-400 w-6 text-right">{b.count}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Review list */}
            <div className="space-y-3">
              {reviews.map((r, i) => (
                <Card key={i}>
                  <CardBody>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
                          {r.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{r.name}</p>
                          <p className="text-xs text-dark-500">{r.service} · {r.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <span key={j} style={{ color: j < r.rating ? '#F5A623' : '#374151', fontSize: 13 }}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-dark-300 leading-relaxed">{r.comment}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
