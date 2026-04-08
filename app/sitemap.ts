import type { MetadataRoute } from "next";

const siteUrl = "https://gudforus.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog/best-yuka-alternative`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/blog/best-yuka-alternative-ireland`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.86,
    },
    {
      url: `${siteUrl}/blog/best-yuka-alternative-usa`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.86,
    },
    {
      url: `${siteUrl}/blog/best-yuka-alternative-uk`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/blog/allergy-ingredient-checker`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/blog/why-ingredient-lists-are-hard-to-understand`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/ingredient-scanner-app`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/allergy-ingredient-scanner`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/cosmetic-ingredient-scanner`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.86,
    },
    {
      url: `${siteUrl}/yuka-alternative`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.86,
    },
    {
      url: `${siteUrl}/how-to-scan-food-ingredients`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/check-ingredients-for-allergies`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/compatibility`,
      lastModified: new Date("2026-03-28"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
