import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unsubscribe - GudForUs",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/unsubscribe` },
};

interface PageProps {
  searchParams: Promise<{ token?: string; email?: string; uid?: string; sid?: string }>;
}

async function processUnsubscribe(
  token: string,
  email: string,
  uid?: string,
  sid?: string,
): Promise<{ success: boolean; error?: string }> {
  const edgeFnUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/unsubscribe`;

  try {
    const res = await fetch(edgeFnUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, uid, sid }),
      cache: "no-store",
    });
    const json = await res.json();
    if (!res.ok)
      return { success: false, error: json.error ?? "Something went wrong" };
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Could not reach the server. Please try again.",
    };
  }
}

export default async function UnsubscribePage({ searchParams }: PageProps) {
  const { token, email, uid, sid } = await searchParams;

  let result: { success: boolean; error?: string } | null = null;

  if (token && email && (uid || sid)) {
    result = await processUnsubscribe(token, email, uid, sid);
  }

  const isSuccess = result?.success === true;
  const isMissingParams = !token || !email || (!uid && !sid);
  const isError = !isMissingParams && result && !result.success;

  return (
    <div className="min-h-screen bg-[#F2F0E9] flex flex-col">
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

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-sm text-center">
          {isSuccess && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F0E8]">
                <svg
                  className="h-8 w-8 text-[#4A6C48]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="mb-3 text-2xl font-bold text-[#1F2937]">
                You&apos;re unsubscribed
              </h1>
              <p className="mb-8 text-gray-500">
                We won&apos;t send you any more emails.
              </p>
              <Link
                href="/"
                className="inline-block rounded-lg bg-[#4A6C48] px-6 py-3 text-sm font-medium text-white hover:bg-[#3a5638] transition-colors"
              >
                Back to GudForUs
              </Link>
            </>
          )}

          {isMissingParams && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
                <svg
                  className="h-8 w-8 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h1 className="mb-3 text-2xl font-bold text-[#1F2937]">
                Invalid link
              </h1>
              <p className="mb-8 text-gray-500">
                This unsubscribe link is missing required information. Please
                use the link directly from your email.
              </p>
              <Link
                href="/"
                className="inline-block rounded-lg bg-[#4A6C48] px-6 py-3 text-sm font-medium text-white hover:bg-[#3a5638] transition-colors"
              >
                Back to GudForUs
              </Link>
            </>
          )}

          {isError && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <svg
                  className="h-8 w-8 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="mb-3 text-2xl font-bold text-[#1F2937]">
                Something went wrong
              </h1>
              <p className="mb-8 text-gray-500">
                {result?.error ??
                  "We couldn’t process your request. Please try again."}
              </p>
              <Link
                href="/"
                className="inline-block rounded-lg bg-[#4A6C48] px-6 py-3 text-sm font-medium text-white hover:bg-[#3a5638] transition-colors"
              >
                Back to GudForUs
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
