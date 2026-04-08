import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compatibility Insights & AI-Based Analysis - GudForUs",
  description:
    "Learn how GudForUs generates AI-powered compatibility scores, what their limitations are, and why they are not a substitute for professional medical advice.",
};

export default function CompatibilityPage() {
  return (
    <div className="min-h-screen bg-[#F2F0E9]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link href="/" className="inline-flex items-center">
            <Image src="/gud.png" alt="GudForUs" width={120} height={40} className="h-10 w-auto invert" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-[#4A6C48]/10 bg-white/60">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#4A6C48]/10 px-4 py-1.5 text-sm font-medium text-[#4A6C48]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            How It Works
          </div>
          <h1 className="text-4xl font-bold text-[#1F2937]">
            Compatibility Insights &amp; AI-Based Analysis
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Understanding how your compatibility scores are generated, what they
            mean, and how to use them responsibly.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-10 text-[#1F2937]">

          {/* How Scores Are Generated */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              How Compatibility Scores Are Generated
            </h2>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Our compatibility insights are powered by artificial intelligence
              and publicly available product information.
            </p>
            <p className="mb-4 text-gray-700 leading-relaxed">
              When a product is scanned, our system may:
            </p>
            <ul className="ml-2 space-y-3">
              {[
                "Retrieve ingredient information from publicly available sources",
                "Analyze ingredient lists using AI models",
                "Evaluate compatibility based on predefined dietary, lifestyle, or preference criteria",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4A6C48]/15 text-[#4A6C48]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-gray-700 leading-relaxed">
              The goal is to provide helpful, easy-to-understand guidance to
              support informed choices. However, this process relies on
              available data and automated analysis.
            </p>
          </section>

          <hr className="border-gray-200" />

          {/* Important Limitations */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Important Limitations
            </h2>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
              <div className="mb-4 flex items-center gap-2 text-amber-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span className="font-semibold">
                  While we strive to provide accurate and useful information:
                </span>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Ingredient lists may be incomplete, outdated, or incorrect.",
                  "Manufacturers may change formulations without notice.",
                  "Online product information may differ from actual packaging.",
                  "AI-generated analysis may contain errors, misinterpretations, or omissions.",
                  "Cross-contamination, trace allergens, and manufacturing practices may not be reflected in available data.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-amber-800">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-amber-700">
                Compatibility results are estimates based on the information
                accessible at the time of analysis. They are not guaranteed to
                be fully accurate or up to date.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Not Medical Advice */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Not Medical or Professional Advice
            </h2>
            <div className="rounded-xl border-2 border-[#4A6C48] bg-white p-6">
              <p className="font-semibold text-[#4A6C48]">
                Compatibility insights are provided for general informational
                purposes only.
              </p>
              <p className="mt-3 text-gray-700">They are not:</p>
              <ul className="ml-2 mt-3 space-y-2">
                {[
                  "Medical advice",
                  "Nutritional advice",
                  "Allergy diagnosis",
                  "Treatment recommendations",
                  "A substitute for professional healthcare guidance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-gray-700">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">
              If you have allergies, medical conditions, dietary restrictions,
              or specific health concerns, you should:
            </p>
            <ul className="ml-2 mt-3 space-y-3">
              {[
                "Carefully review the product's physical packaging and label",
                "Contact the manufacturer directly for clarification",
                "Consult a qualified healthcare professional",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4A6C48]/15 text-[#4A6C48]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-gray-500 italic">
              Always rely on official packaging and professional guidance for
              health-related decisions.
            </p>
          </section>

          <hr className="border-gray-200" />

          {/* User Responsibility */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">User Responsibility</h2>
            <p className="mb-4 text-gray-700 leading-relaxed">
              By using compatibility insights, you acknowledge that:
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Your Discretion",
                  body: "Decisions based on this information are made at your own discretion.",
                },
                {
                  title: "Independent Verification",
                  body: "You are responsible for verifying ingredient information independently.",
                },
                {
                  title: "Guidance, Not Guarantees",
                  body: "The app provides guidance, not guarantees.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <p className="mb-2 font-semibold text-[#4A6C48]">
                    {card.title}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-gray-700 leading-relaxed">
              We are not liable for any adverse reactions, health issues, or
              damages resulting from reliance on AI-generated compatibility
              analysis.
            </p>
          </section>

          <hr className="border-gray-200" />

          {/* Our Commitment */}
          <section>
            <div className="rounded-xl border border-[#4A6C48]/20 bg-[#4A6C48]/5 p-8">
              <div className="mb-3 flex items-center gap-2 text-[#4A6C48]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <h2 className="text-2xl font-semibold">Our Commitment</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We continuously work to improve accuracy, transparency, and
                reliability. If you notice incorrect information, please report
                it so we can review and improve the system.
              </p>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Our mission is to provide helpful decision-support tools — not
                to replace professional advice or product labeling.
              </p>
              <div className="mt-6">
                <a
                  href="mailto:support@envo.club"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#4A6C48] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3a5638]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Report an Issue
                </a>
              </div>
            </div>
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
            </Link>{" "}
            |{" "}
            <Link href="/terms" className="text-[#4A6C48] hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
