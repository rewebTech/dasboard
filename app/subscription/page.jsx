'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/components/ui/Toast';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CardSkeleton } from '@/components/ui/Skeleton';
import DashboardLayout from '@/components/shared/DashboardLayout';

const PLAN_ICONS = {
  starter:      <BoltIcon />,
  professional: <CardIcon />,
  enterprise:   <CrownIcon />,
};

export default function SubscriptionPage() {
  const { subscription, plans, loading, error, upgrade, openBillingPortal } = useSubscription();
  const { toast } = useToast();

  const handleUpgrade = async (planId) => {
    const res = await upgrade(planId);
    res.success ? toast.success('Plan upgraded successfully!') : toast.error(res.error || 'Upgrade failed');
  };

  const handleBilling = async () => {
    const res = await openBillingPortal();
    if (!res.success) toast.error(res.error || 'Could not open billing portal');
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Subscription</h1>
          <p className="text-sm text-dark-400">Manage your plan and billing.</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <CardSkeleton lines={3} />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} lines={7} />)}
            </div>
          </div>
        ) : (
          <>
            {/* Current plan bar */}
            {subscription && (
              <div className="bg-surface border border-dark-800 rounded p-5 flex items-center justify-between mb-5">
                <div>
                  <p className="text-2xs font-semibold uppercase tracking-widest text-dark-500 mb-1">Current Plan</p>
                  <p className="text-lg font-bold text-white">{subscription.name}</p>
                  <p className="text-xs text-dark-400 mt-0.5">Renews on {subscription.renewsOn} · {subscription.price}</p>
                </div>
                <Button variant="outline" onClick={handleBilling}>Manage Billing</Button>
              </div>
            )}

            {/* Plans grid */}
            <div className="grid grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded border p-6 transition-colors ${
                    plan.featured
                      ? 'border-accent bg-accent-muted'
                      : 'border-dark-800 bg-surface'
                  }`}
                >
                  {/* Plan header */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-7 h-7 text-accent">{PLAN_ICONS[plan.id] || <BoltIcon />}</div>
                    <span className="text-md font-bold text-white">{plan.name}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-sm text-dark-400">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-dark-300">
                        <span className="text-status-success font-bold">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => !plan.isCurrent && handleUpgrade(plan.id)}
                    disabled={plan.isCurrent}
                    className={`w-full py-2.5 rounded text-sm font-semibold transition-all ${
                      plan.isCurrent
                        ? 'bg-accent text-black cursor-default'
                        : 'border border-dark-700 text-white hover:bg-dark-800 hover:border-dark-500'
                    }`}
                  >
                    {plan.isCurrent ? 'Current Plan' : 'Upgrade'}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function BoltIcon()  { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>; }
function CardIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>; }
function CrownIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z"/></svg>; }
