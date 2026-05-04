import type { MetadataRoute } from "next";
import { getSeoReadyProducts } from "@/lib/products";
import { blogPosts } from "./blog/blog-posts";
import { SITE_URL } from "./lib/site";

export const revalidate = 3600;

const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${SITE_URL}/`,
    lastModified: new Date("2026-04-08"),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${SITE_URL}/blog`,
    lastModified: new Date(
      Math.max(...blogPosts.map((post) => new Date(post.lastModified).getTime()))
    ),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/ingredient-scanner-app`,
    lastModified: new Date("2026-03-27"),
    changeFrequency: "monthly",
    priority: 0.88,
  },
  {
    url: `${SITE_URL}/allergy-ingredient-scanner`,
    lastModified: new Date("2026-03-27"),
    changeFrequency: "monthly",
    priority: 0.88,
  },
  {
    url: `${SITE_URL}/cosmetic-ingredient-scanner`,
    lastModified: new Date("2026-03-27"),
    changeFrequency: "monthly",
    priority: 0.86,
  },
  {
    url: `${SITE_URL}/yuka-alternative`,
    lastModified: new Date("2026-03-27"),
    changeFrequency: "monthly",
    priority: 0.86,
  },
  {
    url: `${SITE_URL}/how-to-scan-food-ingredients`,
    lastModified: new Date("2026-03-27"),
    changeFrequency: "monthly",
    priority: 0.84,
  },
  {
    url: `${SITE_URL}/check-ingredients-for-allergies`,
    lastModified: new Date("2026-03-27"),
    changeFrequency: "monthly",
    priority: 0.84,
  },
  {
    url: `${SITE_URL}/compatibility`,
    lastModified: new Date("2026-04-08"),
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
  url: `${SITE_URL}${post.href}`,
  lastModified: new Date(post.lastModified),
  changeFrequency: "monthly",
  priority: post.href.includes("best-yuka-alternative") ? 0.86 : 0.85,
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products } = await getSeoReadyProducts();
  const productPages: MetadataRoute.Sitemap = (products ?? []).map((product) => ({
    url: `${SITE_URL}/ishealthy/${product.slug}`,
    lastModified: new Date(
      product.updated_at ??
        product.published_at ??
        product.seo_generated_at ??
        Date.now(),
    ),
    changeFrequency: "weekly",
    priority: 0.72,
  }));

  return [...staticPages, ...blogPages, ...productPages];
}
