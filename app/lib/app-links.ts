export const APP_STORE_URL =
  "https://apps.apple.com/app/gud-for-us-clean-food-ai/id6755870992";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.app.gudforus";

/** Play Store link tagged with an install referrer so installs can be attributed. */
export const playStoreUrlWithSource = (source: string) =>
  `${PLAY_STORE_URL}&referrer=${encodeURIComponent(`utm_source=${source}`)}`;
