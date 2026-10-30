"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { sendGAEvent } from "@next/third-parties/google";
import { APP_STORE_URL, PLAY_STORE_URL } from "../../lib/site";

// End of 30 November 2026, India time. After this the page stops opening the offer.
const OFFER_ENDS_AT = Date.parse("2026-11-30T23:59:59+05:30");
const APP_SCHEME = "gudforus";
const ANDROID_PACKAGE = "com.app.gudforus";
// If the app hasn't taken over the screen by then, it isn't installed (iOS only).
const IOS_STORE_FALLBACK_MS = 1500;

type Platform = "ios" | "android" | "desktop";

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  // iPadOS reports itself as a Mac; a touchscreen gives it away.
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) {
    return "ios";
  }
  return "desktop";
}

const isExpired = () => Date.now() > OFFER_ENDS_AT;

// Android's intent link opens the app if installed and falls back to the Play Store itself.
function androidIntentUrl(path: string) {
  return `intent://${path}#Intent;scheme=${APP_SCHEME};package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`;
}

// Browser-only values: null/false while server rendering, real values after hydration.
const noSubscribe = () => () => {};

export default function PerkOffer() {
  const platform = useSyncExternalStore<Platform | null>(noSubscribe, detectPlatform, () => null);
  const expired = useSyncExternalStore(noSubscribe, isExpired, () => false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openApp = useCallback(
    (trigger: "auto" | "tap") => {
      if (!platform || platform === "desktop") return;
      const path = expired ? "" : "offer";
      sendGAEvent("event", "perk_offer_open", { platform, trigger, expired });

      if (platform === "android") {
        window.location.href = androidIntentUrl(path);
        return;
      }

      // iOS has no built-in fallback: try the app, and go to the App Store if the
      // page is still on screen a moment later.
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      fallbackTimer.current = setTimeout(() => {
        if (document.visibilityState === "visible") window.location.href = APP_STORE_URL;
      }, IOS_STORE_FALLBACK_MS);
      window.location.href = `${APP_SCHEME}://${path}`;
    },
    [platform, expired],
  );

  useEffect(() => {
    const cancelFallback = () => {
      if (document.visibilityState === "hidden" && fallbackTimer.current) {
        clearTimeout(fallbackTimer.current);
        fallbackTimer.current = null;
      }
    };
    document.addEventListener("visibilitychange", cancelFallback);
    window.addEventListener("pagehide", cancelFallback);
    return () => {
      document.removeEventListener("visibilitychange", cancelFallback);
      window.removeEventListener("pagehide", cancelFallback);
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    };
  }, []);

  // Try once automatically on phones. The button covers browsers that block this.
  useEffect(() => {
    if (platform && platform !== "desktop" && !expired) openApp("auto");
  }, [platform, expired, openApp]);

  const isPhone = platform === "ios" || platform === "android";

  return (
    <div className="min-h-screen bg-[#f6f1ee] px-6 py-12 text-[#1c2b14]">
      <main className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <Image src="/gud-green.png" alt="Gud" width={160} height={89} priority className="h-auto w-[140px]" />

        <div className="mt-10 w-full rounded-[20px] bg-white px-7 py-9 shadow-[0_1px_2px_rgba(28,43,20,0.06)]">
          {expired ? (
            <>
              <p className="text-[11px] font-medium uppercase tracking-[2px] text-[#6b8f52]">Offer ended</p>
              <h1 className="font-display mt-4 text-[28px] font-bold leading-tight">
                This offer has <em className="font-normal italic text-[#4a6e35]">ended.</em>
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed">
                The 50% off Gud Pro offer ran until 30 November 2026. You can still scan and shop smarter in the app.
              </p>
            </>
          ) : (
            <>
              <p className="text-[11px] font-medium uppercase tracking-[2px] text-[#6b8f52]">Your offer</p>
              <div className="mx-auto mt-4 inline-block rounded-[14px] border-2 border-dashed border-[#6b8f52] bg-[#f5f0e8] px-8 py-4">
                <span className="text-[34px] font-semibold leading-none tracking-[6px]">50%&nbsp;OFF</span>
              </div>
              <h1 className="font-display mt-5 text-[26px] font-bold leading-tight">
                Gud Pro, <em className="font-normal italic text-[#4a6e35]">at&nbsp;half&nbsp;the&nbsp;price.</em>
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed">
                {platform === "desktop"
                  ? "Open this link on your phone to claim your offer in the Gud app."
                  : "Unlimited scans and a healthier pick every time you shop."}
              </p>
            </>
          )}

          {isPhone && (
            <>
              <button
                type="button"
                onClick={() => openApp("tap")}
                className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#4a6e35] px-9 py-[15px] text-[15px] font-medium text-white transition hover:bg-[#3d5c2c]"
              >
                {expired ? "Open Gud" : "Open Gud & get 50% off"} &rarr;
              </button>
              <p className="mt-4 text-[12px] leading-relaxed text-[#6b7a62]">
                {expired ? "" : "Just installed? Tap the button again to claim your offer."}
              </p>
            </>
          )}

          <div className="mt-6 flex items-center justify-center gap-2">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Image src="/email/appstore.svg" alt="Download on the App Store" width={120} height={40} unoptimized />
            </a>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Image src="/email/playstore.svg" alt="Get it on Google Play" width={120} height={40} unoptimized />
            </a>
          </div>
        </div>

        {!expired && (
          <p className="mt-6 text-[12px] leading-relaxed text-[#6b7a62]">
            Offer valid until 30 November 2026 for Gud members without an active Pro subscription.
          </p>
        )}
      </main>
    </div>
  );
}
