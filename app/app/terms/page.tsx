import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - GudForUs",
  description: "Terms of Service for GudForUs mobile application",
};

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>
        <div className="prose prose-lg max-w-none space-y-6 text-[#1F2937]">
          <p className="text-sm text-gray-600">
            <strong>Last Updated:</strong> January 17, 2026
          </p>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              1. Acceptance of Terms
            </h2>
            <p>
              Welcome to GudForUs! These Terms of Service (&quot;Terms&quot;)
              constitute a legally binding agreement between you
              (&quot;you,&quot; &quot;your,&quot; or &quot;User&quot;) and
              GudForUs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
              governing your access to and use of the GudForUs mobile
              application (the &quot;App&quot;), including any content,
              functionality, and services offered through the App.
            </p>
            <p className="mt-4">
              By downloading, installing, or using the App, you agree to be
              bound by these Terms and our Privacy Policy. If you do not agree
              to these Terms, you must not access or use the App.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              2. Description of Service
            </h2>
            <p>
              GudForUs is a mobile application that helps users make informed
              decisions about food and consumer products by providing:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Barcode and ingredient label scanning</li>
              <li>Health and personal compatibility analysis</li>
              <li>
                Personalized health scores based on ingredient quality and
                nutritional information
              </li>
              <li>
                personal compatibility scores based on sustainability factors
              </li>
              <li>AI-generated daily insights about consumption patterns</li>
              <li>
                Educational articles and resources about health and
                environmental sustainability
              </li>
            </ul>
            <p className="mt-4">
              The App is provided for informational purposes only and is not
              intended to replace professional medical, nutritional, or
              environmental advice.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">3. Eligibility</h2>
            <p>You must meet the following criteria to use the App:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>You must be at least 13 years of age</li>
              <li>
                If you are under 18, you must have permission from a parent or
                legal guardian
              </li>
              <li>
                You must be capable of forming a binding contract under
                applicable law
              </li>
              <li>
                You must not be prohibited from using the App under the laws of
                your jurisdiction
              </li>
            </ul>
            <p className="mt-4">
              By using the App, you represent and warrant that you meet these
              eligibility requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">4. User Accounts</h2>

            <h3 className="mb-2 text-xl font-semibold">4.1 Account Creation</h3>
            <p>
              To access certain features of the App, you must create an account.
              You agree to provide accurate, current, and complete information
              during registration and to update your information to keep it
              accurate and current.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              4.2 Account Security
            </h3>
            <p>You are responsible for:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
              <li>
                Notifying us immediately of any unauthorized use of your account
              </li>
            </ul>
            <p className="mt-4">
              We are not liable for any loss or damage arising from your failure
              to protect your account credentials.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              4.3 Account Termination
            </h3>
            <p>
              You may delete your account at any time through the App settings.
              We reserve the right to suspend or terminate your account if you
              violate these Terms or engage in conduct that we deem harmful to
              other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              5. Subscription Terms (Auto-Renewable Subscriptions)
            </h2>

            <h3 className="mb-2 text-xl font-semibold">
              5.1 Subscription Plans
            </h3>
            <p>
              GudForUs offers premium features through auto-renewable
              subscription plans (&quot;Subscription&quot;):
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Monthly Subscription:</strong> Billed monthly at the
                price displayed in the App
              </li>
              <li>
                <strong>Yearly Subscription:</strong> Billed annually at the
                price displayed in the App (equivalent to a discounted monthly
                rate)
              </li>
            </ul>
            <p className="mt-4">
              Premium features include unlimited product scans, AI-powered daily
              insights, personalized health recommendations, and ad-free
              experience.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">5.2 Free Trial</h3>
            <p>
              We may offer a free trial period for new subscribers. If a free
              trial is offered, the duration will be displayed before you
              subscribe. You will not be charged during the free trial period.
              At the end of the trial, your subscription will automatically
              convert to a paid subscription unless you cancel before the trial
              ends.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              5.3 Billing and Renewal
            </h3>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                Subscriptions automatically renew at the end of each billing
                period (monthly or yearly) unless canceled at least 24 hours
                before the renewal date
              </li>
              <li>
                Your payment method will be charged through your Apple App Store
                or Google Play Store account
              </li>
              <li>
                The subscription fee will be charged at the rate in effect at
                the time of renewal
              </li>
              <li>
                If the price of a subscription increases, you will be notified
                in advance and given the opportunity to cancel
              </li>
            </ul>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              5.4 Cancellation
            </h3>
            <p>
              You may cancel your subscription at any time through your Apple
              App Store or Google Play Store account settings. Cancellation
              takes effect at the end of the current billing period, and you
              will retain access to premium features until that date.
            </p>
            <p className="mt-4">
              <strong>Apple App Store:</strong> Settings → [Your Name] →
              Subscriptions → GudForUs → Cancel Subscription
            </p>
            <p className="mt-2">
              <strong>Google Play Store:</strong> Play Store → Menu →
              Subscriptions → GudForUs → Cancel Subscription
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              5.5 Refund Policy
            </h3>
            <p>
              All subscription fees are non-refundable except as required by
              applicable law or as determined at our sole discretion. Refund
              requests must be submitted through the Apple App Store or Google
              Play Store, as applicable, as we do not process payments directly.
            </p>
            <p className="mt-4">
              If you cancel your subscription during a free trial period, you
              will not be charged.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              5.6 Promotional Offers
            </h3>
            <p>
              We may occasionally offer promotional discounts or special
              pricing. These offers are subject to additional terms and
              conditions, which will be disclosed at the time of the offer.
              Promotional pricing may not be combined with other offers unless
              explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">6. Acceptable Use</h2>
            <p>You agree not to use the App to:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>
                Infringe upon the rights of others, including intellectual
                property rights
              </li>
              <li>
                Transmit any harmful, threatening, abusive, defamatory, or
                otherwise objectionable content
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the App or
                our systems
              </li>
              <li>
                Interfere with or disrupt the App, servers, or networks
                connected to the App
              </li>
              <li>
                Use automated systems (bots, scrapers, etc.) to access the App
                without our prior written permission
              </li>
              <li>
                Reverse engineer, decompile, or disassemble any part of the App
              </li>
              <li>
                Use the App for any commercial purpose without our authorization
              </li>
            </ul>
            <p className="mt-4">
              Violation of these acceptable use terms may result in immediate
              termination of your account and legal action.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              7. Intellectual Property Rights
            </h2>

            <h3 className="mb-2 text-xl font-semibold">7.1 Our Content</h3>
            <p>
              The App and its entire contents, features, and functionality
              (including but not limited to information, software, text,
              displays, images, video, audio, design, and the selection and
              arrangement thereof) are owned by GudForUs, its licensors, or
              other providers of such material and are protected by copyright,
              trademark, patent, trade secret, and other intellectual property
              laws.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              7.2 Limited License
            </h3>
            <p>
              Subject to your compliance with these Terms, we grant you a
              limited, non-exclusive, non-transferable, non-sublicensable,
              revocable license to access and use the App for your personal,
              non-commercial use. This license does not include any right to:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Modify or copy the App or any part thereof</li>
              <li>Use the App for commercial purposes</li>
              <li>
                Remove or alter any copyright, trademark, or other proprietary
                notices
              </li>
              <li>Transfer the App to another person or entity</li>
            </ul>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              7.3 User Content
            </h3>
            <p>
              By using the App, you retain ownership of any content you submit
              (such as scan history, preferences, and feedback). However, you
              grant us a worldwide, non-exclusive, royalty-free license to use,
              reproduce, process, and analyze such content to:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Provide and improve the App&apos;s services</li>
              <li>Generate personalized insights and recommendations</li>
              <li>
                Create aggregated, anonymized data for research and product
                development
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              8. Disclaimers and Limitations
            </h2>

            <h3 className="mb-2 text-xl font-semibold">
              8.1 Medical and Nutritional Disclaimer
            </h3>
            <div className="rounded-lg border-2 border-[#4A6C48] bg-white p-6">
              <p className="font-semibold text-[#4A6C48]">
                IMPORTANT: The information provided by the App is for
                informational and educational purposes only and is not intended
                as medical, nutritional, or health advice.
              </p>
              <p className="mt-4">
                The health scores, ingredient analyses, and recommendations
                provided by the App are generated using AI and algorithmic
                processing and should not be used as a substitute for
                professional medical advice, diagnosis, or treatment. Always
                consult a qualified healthcare provider or registered dietitian
                before making dietary changes, especially if you have allergies,
                medical conditions, or specific nutritional needs.
              </p>
              <p className="mt-4">
                We make no guarantees about the accuracy, completeness, or
                reliability of the information provided by the App. Product
                formulations and ingredient lists may change without notice, and
                we are not responsible for inaccuracies in manufacturer data.
              </p>
            </div>

            <h3 className="mb-2 mt-6 text-xl font-semibold">
              8.2 personal compatibility Disclaimer
            </h3>
            <p>
              personal compatibility scores are estimates based on available
              data and methodologies. These scores are intended to provide
              general guidance and should not be considered definitive
              assessments of a product&apos;s environmental footprint.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              8.3 No Warranties
            </h3>
            <p>
              THE APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
              WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
              INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
            </p>
            <p className="mt-4">
              We do not warrant that the App will be uninterrupted, error-free,
              secure, or free from viruses or other harmful components. Your use
              of the App is at your own risk.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              8.4 Limitation of Liability
            </h3>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, GUDFORUS SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR USE,
              WHETHER IN AN ACTION IN CONTRACT, TORT (INCLUDING NEGLIGENCE), OR
              OTHERWISE, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE
              APP, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
              DAMAGES.
            </p>
            <p className="mt-4">
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES
              EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS
              PRECEDING THE EVENT GIVING RISE TO THE LIABILITY, OR ONE HUNDRED
              DOLLARS ($100), WHICHEVER IS GREATER.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless GudForUs, its
              affiliates, officers, directors, employees, agents, and licensors
              from and against any claims, liabilities, damages, losses, costs,
              or expenses (including reasonable attorneys&apos; fees) arising
              out of or related to:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Your use of the App</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Any content you submit or upload through the App</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              10. Third-Party Services
            </h2>
            <p>
              The App may integrate with or contain links to third-party
              services, websites, or content. We do not control, endorse, or
              assume responsibility for any third-party services. Your use of
              third-party services is at your own risk and subject to their
              respective terms and conditions.
            </p>
            <p className="mt-4">
              Third-party services used by the App include:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Apple App Store / Google Play Store (payment processing)</li>
              <li>RevenueCat (subscription management)</li>
              <li>Google AI / Gemini (product analysis)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              11. Changes to the App and Terms
            </h2>

            <h3 className="mb-2 text-xl font-semibold">
              11.1 Modifications to the App
            </h3>
            <p>
              We reserve the right to modify, suspend, or discontinue the App
              (or any part thereof) at any time, with or without notice. We will
              not be liable to you or any third party for any modification,
              suspension, or discontinuation of the App.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              11.2 Changes to Terms
            </h3>
            <p>
              We may update these Terms from time to time. If we make material
              changes, we will notify you by email (if provided) or through the
              App. The updated Terms will be effective as of the &quot;Last
              Updated&quot; date. Your continued use of the App after the
              effective date constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              12. Governing Law and Dispute Resolution
            </h2>

            <h3 className="mb-2 text-xl font-semibold">12.1 Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the State of California, United States, without regard
              to its conflict of law principles.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              12.2 Dispute Resolution
            </h3>
            <p>
              Any dispute arising out of or relating to these Terms or the App
              shall be resolved through good-faith negotiation. If the dispute
              cannot be resolved through negotiation, it shall be submitted to
              binding arbitration in accordance with the rules of the American
              Arbitration Association. The arbitration shall take place in San
              Francisco, California, and judgment on the arbitration award may
              be entered in any court having jurisdiction.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              12.3 Class Action Waiver
            </h3>
            <p>
              You agree that any dispute resolution proceedings will be
              conducted only on an individual basis and not in a class,
              consolidated, or representative action. You waive the right to
              participate in any class action lawsuit or class-wide arbitration.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">13. Miscellaneous</h2>

            <h3 className="mb-2 text-xl font-semibold">
              13.1 Entire Agreement
            </h3>
            <p>
              These Terms, together with our Privacy Policy, constitute the
              entire agreement between you and GudForUs regarding the App and
              supersede all prior agreements and understandings.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">
              13.2 Severability
            </h3>
            <p>
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions shall remain in full force
              and effect.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">13.3 Waiver</h3>
            <p>
              Our failure to enforce any right or provision of these Terms will
              not be deemed a waiver of such right or provision.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">13.4 Assignment</h3>
            <p>
              You may not assign or transfer these Terms or your rights under
              these Terms without our prior written consent. We may assign these
              Terms without restriction.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              14. Contact Information
            </h2>
            <p>
              If you have any questions, concerns, or feedback regarding these
              Terms, please contact us at:
            </p>
            <div className="mt-4 rounded-lg bg-white p-6">
              <p className="font-semibold">GudForUs</p>
              <p className="mt-2">
                Email:{" "}
                <a
                  href="mailto:support@envo.club"
                  className="text-[#4A6C48] underline"
                >
                  support@envo.club
                </a>
              </p>
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

          <section className="mt-12 rounded-lg border-2 border-[#4A6C48] bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-[#4A6C48]">
              Apple App Store Subscription Disclosure
            </h3>
            <p className="mb-4">
              <strong>
                Auto-Renewable Subscription Information (Required by Apple):
              </strong>
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Subscription Name:</strong> GudForUs Pro (Monthly or
                Yearly)
              </li>
              <li>
                <strong>Subscription Length:</strong> 1 month (Monthly) or 1
                year (Yearly)
              </li>
              <li>
                <strong>Price:</strong> As displayed in the App at the time of
                purchase (varies by region)
              </li>
              <li>
                <strong>Payment:</strong> Charged to your Apple ID account upon
                purchase confirmation
              </li>
              <li>
                <strong>Auto-Renewal:</strong> Subscriptions automatically renew
                unless canceled at least 24 hours before the end of the current
                period
              </li>
              <li>
                <strong>Manage/Cancel:</strong> Go to Settings → [Your Name] →
                Subscriptions on your iOS device
              </li>
              <li>
                <strong>Free Trial:</strong> If offered, trial duration will be
                displayed before subscription. Unused trial time is forfeited
                upon purchase.
              </li>
            </ul>
            <p className="mt-4">
              By subscribing, you agree to Apple&apos;s Terms of Service and the
              Licensed Application End User License Agreement (EULA). For more
              information, visit{" "}
              <a
                href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A6C48] underline"
              >
                Apple&apos;s EULA
              </a>
              .
            </p>
          </section>

          <section className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600">
              By using the GudForUs mobile application, you acknowledge that you
              have read, understood, and agree to be bound by these Terms of
              Service.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/80 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} GudForUs. All rights reserved. |{" "}
            <Link href="/privacy" className="text-[#4A6C48] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
