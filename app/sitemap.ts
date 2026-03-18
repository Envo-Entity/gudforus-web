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
      lastModified: new Date("2026-02-27"),
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
      url: `${siteUrl}/`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "monthly",
      priority: 0.4,
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
