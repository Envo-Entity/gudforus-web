import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'

export const metadata: Metadata = {
  title: "Why Ingredient Lists Are So Hard to Understand | Gud For Us",
  description:
    "Ingredient lists were written for regulators, not people. Learn why food labels are so confusing, what terms like 'natural flavors' actually mean, and how AI is finally making them readable.",
  alternates: {
    canonical:
      "https://gudforus.com/app/blog/why-ingredient-lists-are-hard-to-understand",
  },
  openGraph: {
    title: "Why Ingredient Lists Are So Hard to Understand — Gud For Us",
    description:
      "Ingredient labels were designed for regulators, not shoppers. Here's why they're so confusing — and what modern AI tools are doing to fix that.",
    url: "https://gudforus.com/app/blog/why-ingredient-lists-are-hard-to-understand",
    type: "article",
    images: [{ url: "https://gudforus.com/app/opengraph-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Ingredient Lists Are So Hard to Understand",
    description:
      "Sodium benzoate. Tocopherol. Hydrolyzed vegetable protein. Here's why labels read like chemistry textbooks — and why that matters.",
    images: ["https://gudforus.com/app/twitter-image.jpg"],
  },
}

export default function Page() {
  const html = readFileSync(
    join(process.cwd(), 'app/app/blog/why-ingredient-lists-are-hard-to-understand/why-ingredient-lists-are-hard-to-understand.html'),
    'utf-8'
  )

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
