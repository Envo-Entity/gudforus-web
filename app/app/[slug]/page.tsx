import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  createLandingMetadata,
  SeoLandingPage,
} from "../components/seo-landing-page";
import { isSeoPage, seoPages } from "../seo-pages";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(seoPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!isSeoPage(slug)) {
    return {};
  }

  return createLandingMetadata(seoPages[slug]);
}

export default async function SeoLandingRoute({ params }: Props) {
  const { slug } = await params;

  if (!isSeoPage(slug)) {
    notFound();
  }

  return <SeoLandingPage page={seoPages[slug]} />;
}
