/**
 * app/reviews/page.jsx
 * ─────────────────────────────────────────────────────────
 * Reviews page — fetches reviews by business ID from session.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { formatNumber, getUserSession, getInitials, timeAgo } from '@/lib/helpers';
import { getReviewsByBusiness } from '@/services/reviewsService';
import DashboardLayout from '@/components/shared/DashboardLayout';

export default function ReviewsPage() {
  const [reviews, setReviews]       = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [page, setPage]             = useState(1);

  const fetchReviews = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const session = getUserSession();
      const businessId = session.dashboard?.business_id;
      if (!businessId) {
        setError('No business found. Create a business profile first.');
        setLoading(false);
        return;
      }

      const data = await getReviewsByBusiness(businessId, { limit: 10, page: pageNum });
      setReviews(data?.reviews || []);
      setPagination(data?.pagination || null);
    } catch (err) {
      setError(err.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReviews(page); }, [fetchReviews, page]);

  // Calculate star breakdown from reviews
  const starCounts = [5, 4, 3, 2, 1].map(star => ({
    stars: star,
    count: reviews.filter(r => r.rating === star).length,
  }));
  const totalReviews = pagination?.total || reviews.length;
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';
  const maxCount = Math.max(...starCounts.map(b => b.count), 1);

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Reviews</h1>
          <p className="text-sm text-dark-400">See what your customers are saying.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
            <CardSkeleton lines={8} />
            <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} lines={3} />)}</div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className="text-dark-400 text-sm">{error}</p>
            <Button variant="outline" size="sm" onClick={() => fetchReviews(1)}>Retry</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:items-start">
            {/* Summary card */}
            <Card className="lg:sticky lg:top-7">
              <CardBody className="text-center py-4 md:py-6">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{avgRating}</div>
                <div className="flex justify-center gap-0.5 md:gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: i < Math.round(parseFloat(avgRating)) ? '#F5A623' : '#374151', fontSize: 16 }} className="md:text-2xl">★</span>
                  ))}
                </div>
                <p className="text-xs text-dark-400 mb-4 md:mb-6">{formatNumber(totalReviews)} total reviews</p>
                <div className="space-y-1.5 md:space-y-2 text-left">
                  {starCounts.map(b => (
                    <div key={b.stars} className="flex items-center gap-1 md:gap-2">
                      <span className="text-xs text-dark-400 w-2 md:w-3">{b.stars}</span>
                      <span className="text-accent text-xs">★</span>
                      <div className="flex-1 h-1 md:h-1.5 bg-dark-800 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${Math.round((b.count / maxCount) * 100)}%` }} />
                      </div>
                      <span className="text-xs text-dark-400 w-5 md:w-6 text-right text-[10px] md:text-xs">{b.count}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Review list */}
            <div className="space-y-3">
              {reviews.length === 0 ? (
                <Card>
                  <CardBody>
                    <p className="text-center text-dark-400 text-sm py-8">No reviews yet.</p>
                  </CardBody>
                </Card>
              ) : (
                <>
                  {reviews.map((r) => (
                    <Card key={r.id}>
                      <CardBody>
                        <div className="flex flex-col sm:flex-row items-start sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className="flex items-center gap-2 sm:gap-3 w-full sm:flex-1">
                            <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center text-accent text-xs font-bold flex-shrink-0 overflow-hidden">
                              {r.user_avatar ? (
                                <img src={r.user_avatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                getInitials(r.user_name)
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white truncate">{r.user_name}</p>
                              <p className="text-xs text-dark-500">{timeAgo(r.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5 flex-shrink-0">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <span key={j} style={{ color: j < r.rating ? '#F5A623' : '#374151', fontSize: 13 }}>★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-dark-300 leading-relaxed">{r.comment}</p>
                        {r.reply && (
                          <div className="mt-3 pl-3 border-l-2 border-dark-700">
                            <p className="text-xs text-dark-500 mb-1">Business Reply</p>
                            <p className="text-sm text-dark-400">{r.reply}</p>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  ))}

                  {/* Pagination */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => setPage(p => p - 1)}
                        className="w-full sm:w-auto"
                      >
                        Previous
                      </Button>
                      <span className="text-xs text-dark-400 py-2 sm:py-0">
                        Page {page} of {pagination.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= pagination.totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="w-full sm:w-auto"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
