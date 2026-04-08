import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - GudForUs",
  description: "Privacy Policy for GudForUs mobile application",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F2F0E9]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#4A6C48] hover:text-[#3a5638]"
          >
            <span className="text-xl font-bold">GudForUs</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-8 text-4xl font-bold text-[#1F2937]">
          Privacy Policy
        </h1>
        <div className="prose prose-lg max-w-none space-y-6 text-[#1F2937]">
          <p className="text-sm text-gray-600">
            <strong>Last Updated:</strong> January 17, 2026
          </p>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to GudForUs (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;). We are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our mobile application (the
              &quot;App&quot;).
            </p>
            <p>
              By using the App, you consent to the data practices described in
              this Privacy Policy. If you do not agree with our policies and
              practices, please do not use the App.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              2. Information We Collect
            </h2>

            <h3 className="mb-2 text-xl font-semibold">
              2.1 Personal Information
            </h3>
            <p>
              We collect the following personal information when you create an
              account:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Password (encrypted)</li>
            </ul>

            <h3 className="mb-2 mt-4 text-xl font-semibold">2.2 Usage Data</h3>
            <p>
              We automatically collect certain information when you use the App,
              including:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Product scans and analysis results</li>
              <li>Health and environmental preference settings</li>
              <li>App feature usage and interaction data</li>
              <li>Device information (model, operating system version)</li>
              <li>Log data (IP address, access times, app crashes)</li>
            </ul>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              2.3 Camera Access
            </h3>
            <p>
              The App requires access to your device&apos;s camera to scan
              product barcodes and ingredient labels. Images captured are
              processed to extract text and are not stored on our servers unless
              you explicitly save a scan result.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              2.4 Subscription Information
            </h3>
            <p>
              If you purchase a subscription through Apple App Store or Google
              Play Store, we receive limited subscription information from the
              platform (subscription status, expiration date) via RevenueCat.
              Payment information is processed entirely by Apple or Google and
              is not accessible to us.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Provide and maintain the App&apos;s functionality</li>
              <li>
                Analyze product ingredients and generate health and personal
                compatibility scores
              </li>
              <li>
                Personalize your experience based on your preferences and scan
                history
              </li>
              <li>
                Generate AI-powered daily insights about your consumption
                patterns
              </li>
              <li>Process and manage your subscription</li>
              <li>Send you important updates about the App or your account</li>
              <li>Improve our services and develop new features</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              4. Data Storage and Security
            </h2>
            <p>
              Your data is stored securely using Supabase, a PostgreSQL-based
              backend service with enterprise-grade security features including:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Encryption in transit (TLS/SSL)</li>
              <li>Encryption at rest</li>
              <li>Row-Level Security (RLS) policies to protect your data</li>
              <li>Regular security audits and updates</li>
            </ul>
            <p className="mt-4">
              We implement industry-standard security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the internet or electronic storage is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              5. Data Sharing and Disclosure
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              limited circumstances:
            </p>

            <h3 className="mb-2 text-xl font-semibold">
              5.1 Service Providers
            </h3>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Supabase:</strong> Database and authentication services
              </li>
              <li>
                <strong>RevenueCat:</strong> Subscription and payment processing
              </li>
              <li>
                <strong>Google AI (Gemini):</strong> Product analysis and
                insight generation (data is processed securely and not stored by
                Google)
              </li>
            </ul>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              5.2 Legal Requirements
            </h3>
            <p>
              We may disclose your information if required by law, court order,
              or governmental regulation, or if we believe disclosure is
              necessary to:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Comply with legal obligations</li>
              <li>Protect our rights, property, or safety</li>
              <li>Prevent fraud or security issues</li>
              <li>Protect the rights and safety of our users</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              6. Your Rights and Choices
            </h2>
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of the personal
                information we hold about you
              </li>
              <li>
                <strong>Correction:</strong> Update or correct inaccurate
                information through your profile settings
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your account and
                associated data
              </li>
              <li>
                <strong>Data Portability:</strong> Request a copy of your data
                in a machine-readable format
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing
                communications (if applicable)
              </li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at{" "}
              <a
                href="mailto:support@envo.club"
                className="text-[#4A6C48] underline"
              >
                support@envo.club
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is
              active or as needed to provide you with the App&apos;s services.
              If you delete your account, we will delete or anonymize your
              personal information within 30 days, except where we are required
              to retain it for legal or regulatory purposes.
            </p>
            <p className="mt-4">
              Scan history and analysis data may be retained for up to 90 days
              after account deletion for backup and recovery purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              8. Children&apos;s Privacy
            </h2>
            <p>
              The App is not intended for children under the age of 13. We do
              not knowingly collect personal information from children under 13.
              If we become aware that we have inadvertently collected personal
              information from a child under 13, we will take steps to delete
              such information as soon as possible.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              9. International Data Transfers
            </h2>
            <p>
              Your information may be transferred to and processed in countries
              other than your country of residence. These countries may have
              different data protection laws. By using the App, you consent to
              the transfer of your information to our facilities and service
              providers globally.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              10. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new Privacy
              Policy on this page and updating the &quot;Last Updated&quot;
              date. We encourage you to review this Privacy Policy periodically
              for any changes.
            </p>
            <p className="mt-4">
              Your continued use of the App after any modifications to this
              Privacy Policy constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">11. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 rounded-lg bg-white p-6">
              <p className="font-semibold">GudForUs</p>
              <p className="mt-1">
                Support:{" "}
                <a
                  href="mailto:support@envo.club"
                  className="text-[#4A6C48] underline"
                >
                  support@envo.club
                </a>
              </p>
            </div>
          </section>

          <section className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600">
              This Privacy Policy applies to the GudForUs mobile application
              available on iOS and Android platforms. For web-specific privacy
              practices, please refer to our website privacy policy.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/80 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} GudForUs. All rights reserved. |{" "}
            <Link href="/terms" className="text-[#4A6C48] hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
