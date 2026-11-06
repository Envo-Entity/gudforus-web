"use client";

import { useSyncExternalStore } from "react";
import { APP_STORE_URL, playStoreUrlWithSource } from "@/app/lib/app-links";

type Platform = "ios" | "android" | "other";

const detectPlatform = (): Platform => {
  const ua = navigator.userAgent;
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
};

// The platform never changes during a visit, so there is nothing to subscribe to.
const subscribe = () => () => {};

/**
 * Compact "Get the app" pill. Sends iPhone/iPad visitors to the App Store,
 * Android visitors to Google Play, and everyone else to the #get-app section.
 */
export default function GetAppButton({ source }: { source: string }) {
  const platform = useSyncExternalStore<Platform>(
    subscribe,
    detectPlatform,
    () => "other",
  );

  const href =
    platform === "ios"
      ? APP_STORE_URL
      : platform === "android"
        ? playStoreUrlWithSource(source)
        : "#get-app";
  const external = platform !== "other";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#1a1a17] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#333] sm:text-sm"
    >
      Get the app
    </a>
  );
}
