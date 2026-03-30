import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | SundayHundred',
  description: 'Privacy Policy for SundayHundred platform users and business partners.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        <p className="text-xs text-dark-400">Effective Date: March 30, 2026</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2">Privacy Policy</h1>
        <p className="text-sm text-dark-300 mt-3">
          This Privacy Policy explains how SundayHundred collects, uses, and protects your personal and business
          information.
        </p>

        <section className="mt-8 space-y-5 text-sm text-dark-300">
          <div>
            <h2 className="text-lg font-semibold text-white">1. Information We Collect</h2>
            <p className="mt-1">
              We may collect business profile details, owner contact details, WhatsApp number, city/category data,
              account credentials, and usage analytics.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">2. How We Use Information</h2>
            <p className="mt-1">
              We use collected information to operate the platform, display business listings, route enquiries,
              improve performance, and provide support.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">3. Data Sharing</h2>
            <p className="mt-1">
              We do not sell personal information. We may share limited data with trusted service providers for
              payments, infrastructure, analytics, and support operations.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">4. Data Security</h2>
            <p className="mt-1">
              We use reasonable administrative and technical safeguards to protect data. No system can guarantee
              absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">5. Data Retention</h2>
            <p className="mt-1">
              We retain information only as long as needed for business, legal, and operational requirements.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">6. Your Rights</h2>
            <p className="mt-1">
              You may request correction or deletion of inaccurate personal information, subject to legal or
              contractual obligations.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">7. Policy Updates</h2>
            <p className="mt-1">We may revise this policy periodically. Updated versions will be posted on this page.</p>
          </div>
        </section>

        <div className="mt-10 border-t border-dark-800 pt-5 text-sm">
          <Link href="/dashboard" className="text-accent hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
