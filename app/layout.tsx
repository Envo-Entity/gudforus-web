import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { League_Spartan, DM_Serif_Display } from "next/font/google";
import Header from "@/components/header";
import { Component } from "@/components/ui/cursor-follower";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-league-spartan",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

const SITE_URL = "https://gud-for-us.vercel.app";
const PAGE_PATH = "/";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/favicon.png`;
const OG_IMAGE_ALT =
  "Cover of 'Gud For Us' — Non-negotiables of health and wellbeing";

export const metadata: Metadata = {
  title: "Gud For Us — Non-negotiables of health and wellbeing",
  description:
    "Gud For Us — a concise eBook about health, nature and sustainability. Practical steps to reduce microplastics and live more sustainably.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Gud For Us — Non-negotiables of health and wellbeing",
    description:
      "A short, practical eBook about health, nature, sustainability, and microplastics — small choices that matter.",
    url: PAGE_URL,
    siteName: "Gud For Us",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
    type: "book",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gud For Us — Non-negotiables of health and wellbeing",
    description:
      "A short, practical eBook about health, nature, sustainability, and microplastics — small choices that matter.",
    images: [OG_IMAGE],
    creator: "@your_twitter_handle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Gud For Us",
    author: {
      "@type": "Person",
      name: "Author Name",
    },
    url: PAGE_URL,
    image: OG_IMAGE,
    description:
      "Non-negotiables of health and wellbeing — practical guide to reduce microplastics and live sustainably.",
    publisher: {
      "@type": "Organization",
      name: "Gud For Us / Publisher Name",
      url: SITE_URL,
    },
    isbn: "978-1-23456-789-0",
    datePublished: "2025-01-01",
    inLanguage: "en",
  };

  return (
    <html lang="en">
      <body className={`${leagueSpartan.variable} ${dmSerifDisplay.variable} antialiased`}>
        <Script id="ld-json" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
        <Header />
        <main className="mt-[84px]">{children}</main>
        <Component />
      </body>
    </html>
  );
}
