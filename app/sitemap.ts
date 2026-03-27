import type { MetadataRoute } from "next";

const siteUrl = "https://gudforus.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/app`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/app/blog`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/app/blog/best-yuka-alternative`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/app/blog/best-yuka-alternative-ireland`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.86,
    },
    {
      url: `${siteUrl}/app/blog/best-yuka-alternative-usa`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.86,
    },
    {
      url: `${siteUrl}/app/blog/best-yuka-alternative-uk`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/app/blog/allergy-ingredient-checker`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/app/blog/why-ingredient-lists-are-hard-to-understand`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/app/ingredient-scanner-app`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/app/allergy-ingredient-scanner`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/app/cosmetic-ingredient-scanner`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.86,
    },
    {
      url: `${siteUrl}/app/yuka-alternative`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.86,
    },
    {
      url: `${siteUrl}/app/how-to-scan-food-ingredients`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/app/check-ingredients-for-allergies`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-03-28"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/app/privacy`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/app/terms`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
