import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | SundayHundred',
  description: 'Terms and Conditions for SundayHundred business onboarding and platform usage.',
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        <p className="text-xs text-dark-400">Effective Date: March 30, 2026</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2">Terms & Conditions</h1>
        <p className="text-sm text-dark-300 mt-3">
          These Terms & Conditions govern your use of SundayHundred. By registering, subscribing, or using
          our platform, you agree to these terms.
        </p>

        <section className="mt-8 space-y-5 text-sm text-dark-300">
          <div>
            <h2 className="text-lg font-semibold text-white">1. Platform Scope</h2>
            <p className="mt-1">
              SundayHundred provides digital business listing, lead management assistance, offers tools, and
              analytics support for local businesses.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">2. Account Responsibility</h2>
            <p className="mt-1">
              You are responsible for accurate business details, lawful service descriptions, and secure use of
              your account credentials.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">3. Payments and Subscription</h2>
            <p className="mt-1">
              Paid plans are billed as selected during onboarding. Access to paid features depends on successful
              payment processing.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">4. Refund and Cancellation</h2>
            <p className="mt-1">
              All payments made to SundayHundred are non-refundable. We do not provide refunds for partial use,
              non-usage, or early cancellation, except where required under applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">5. Acceptable Use</h2>
            <p className="mt-1">
              You must not post false, misleading, illegal, or abusive content. We may suspend or remove accounts
              violating these terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">6. Limitation of Liability</h2>
            <p className="mt-1">
              SundayHundred is provided on a best-effort basis. We are not liable for indirect losses, business
              interruptions, or third-party service disruptions.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">7. Updates to Terms</h2>
            <p className="mt-1">
              We may update these terms periodically. Continued use of the platform after updates constitutes
              acceptance of revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">8. Contact</h2>
            <p className="mt-1">For legal or policy questions, contact SundayHundred support.</p>
          </div>
        </section>

        <div className="mt-10 border-t border-dark-800 pt-5 text-sm">
          <Link href="/dashboard" className="text-accent hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
