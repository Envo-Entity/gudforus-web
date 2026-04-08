export const SITE_URL = "https://gudforus.com";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image.jpg`;
export const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/twitter-image.jpg`;

export const APP_STORE_URL =
  "https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.app.gudforus&hl=en_IN";

export const DEFAULT_HERO_VIDEO_URL =
  "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/hero-vid.mp4";
export const DEFAULT_DEMO_VIDEO_URL =
  "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/test.mov";

export const heroVideoUrl =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? DEFAULT_HERO_VIDEO_URL;
export const demoVideoUrl =
  process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ?? DEFAULT_DEMO_VIDEO_URL;

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
