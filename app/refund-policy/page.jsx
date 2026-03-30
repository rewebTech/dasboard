import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy | SundayHundred',
  description: 'Refund and cancellation policy for SundayHundred subscriptions.',
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        <p className="text-xs text-dark-400">Effective Date: March 30, 2026</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2">Refund Policy</h1>
        <p className="text-sm text-dark-300 mt-3">
          This policy applies to all SundayHundred paid plans and onboarding fees.
        </p>

        <section className="mt-8 space-y-5 text-sm text-dark-300">
          <div>
            <h2 className="text-lg font-semibold text-white">1. No Refund Policy</h2>
            <p className="mt-1">
              All payments made to SundayHundred are final and non-refundable. Refund requests are not accepted
              for partial usage, non-usage, plan downgrade, or early cancellation.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">2. Cancellation</h2>
            <p className="mt-1">
              You may cancel renewal for future billing cycles, but current paid periods remain non-refundable and
              active until plan expiry.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">3. Exception</h2>
            <p className="mt-1">
              Refunds will only be considered where mandated by applicable law or court order.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">4. Contact</h2>
            <p className="mt-1">For billing queries, contact SundayHundred support through official channels.</p>
          </div>
        </section>

        <div className="mt-10 border-t border-dark-800 pt-5 text-sm">
          <Link href="/dashboard" className="text-accent hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
