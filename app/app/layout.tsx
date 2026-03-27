import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = "https://gudforus.com";
const PAGE_PATH = "/app";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "GudForUs - Understand What You Consume",
  description:
    "Decode labels instantly. From ingredient quality to personal compatibility, GudForUs gives you the clarity to make better choices for your body and the planet.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "food scanner",
    "ingredient analysis",
    "nutrition",
    "sustainability",
    "health app",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "GudForUs - Understand What You Consume",
    description:
      "Decode labels instantly. From ingredient quality to personal compatibility, GudForUs gives you the clarity to make better choices for your body and the planet.",
    url: PAGE_URL,
    siteName: "Gud For Us",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GudForUs - Understand What You Consume",
    description:
      "Decode labels instantly. From ingredient quality to personal compatibility, GudForUs gives you the clarity to make better choices for your body and the planet.",
    creator: "@GudForUs",
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
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} light`}
      style={{ colorScheme: "light" }}
    >
      <head>
        {/* Material Icons — loaded non-blocking to avoid render-blocking CWV impact */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          as="style"
          // @ts-expect-error onLoad is valid for non-blocking stylesheet load
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body className="bg-[#F2F0E9] text-[#1F2937] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
