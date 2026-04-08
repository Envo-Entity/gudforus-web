import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'

export const metadata: Metadata = {
  title: "How to Check if a Product is Safe for Your Allergy | Gud For Us",
  description:
    "Ingredient labels hide allergens behind scientific names. Learn how to check food products for hidden allergens and why a personalized allergy ingredient scanner changes everything.",
  alternates: {
    canonical: "https://gudforus.com/blog/allergy-ingredient-checker",
  },
  openGraph: {
    title: "How to Check if a Product is Safe for Your Allergy — Gud For Us",
    description:
      "Hidden allergens lurk behind scientific names on ingredient labels. Discover how modern AI ingredient scanners help people with allergies shop safely.",
    url: "https://gudforus.com/blog/allergy-ingredient-checker",
    type: "article",
    images: [{ url: "https://gudforus.com/opengraph-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Check if a Product is Safe for Your Allergy",
    description:
      "Peanuts hide as arachis oil. Milk hides as casein. Learn how to spot hidden allergens and find apps that actually protect you.",
    images: ["https://gudforus.com/twitter-image.jpg"],
  },
}

export default function Page() {
  const html = readFileSync(
    join(process.cwd(), 'app/blog/allergy-ingredient-checker/allergy-ingredient-checker.html'),
    'utf-8'
  )

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
