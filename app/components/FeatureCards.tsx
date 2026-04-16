import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Images array for blueberry superfood widget + blog
// [0] = square image for widget, [1] and [2] = 16:9 images for blog carousel
export const blueberryImages: string[] = [
  "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/blueberries.png",
  "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/blueberries_1.jpg",
  "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/blueberries_2.jpg",
];

export default function FeatureCards() {
  return (
    <section className="pt-4 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[8px]">
          {/* Smart Pantry Card */}
          <SmartPantryCard />

          {/* Daily Digest Card */}
          <DailyDigestCard />

          {/* Comparison Tool Card */}
          <ComparisonToolCard />
        </div>
      </div>
    </section>
  );
}

function SmartPantryCard() {
  const widgetImage = blueberryImages[0];

  return (
    <div className="iso-card relative overflow-hidden rounded-2xl sm:rounded-[2rem] min-h-[350px] sm:min-h-[400px] flex flex-col p-6 sm:p-8 bg-white border border-gray-100 shadow-soft">


      {/* Image — mix-blend-multiply dissolves the white bg into the card */}
      <div className="relative z-10 flex flex-1 items-start justify-start py-3">
        {widgetImage ? (
          <Image
            src={widgetImage}
            alt="Blueberries — this week's superfood"
            width={220}
            height={220}
            sizes="220px"
            className="object-contain mix-blend-multiply"
          />
        ) : (
          <div className="h-[180px] w-[180px] rounded-full bg-white/30" />
        )}
      </div>

      {/* Title + CTA */}
      <div className="relative z-10">
        <h3 className="font-display text-[1.65rem] leading-[1.15] tracking-[-0.02em] text-[#1a0a2e]">
          This week&apos;s<br />superfood
        </h3>
        <Link
          href="/blog/blueberries-superfood"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1a0a2e] px-5 py-2.5 text-[0.8rem] font-semibold text-white transition-transform duration-[160ms] active:scale-[0.97]"
          style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
        >
          Read More <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

function DailyDigestCard() {
  return (
    <div className="iso-card bg-[#262626] rounded-2xl sm:rounded-[2rem] p-0 min-h-[350px] sm:min-h-[400px] relative overflow-hidden">
      {/* Background Image */}
      <Image
        alt="Healthy food preparation"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="/app-images/food-preparation.webp"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>

      {/* Badge */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-8 flex items-center gap-2 z-10">
        <span className="w-2 h-2 rounded-full bg-white"></span>
        <span className="text-white font-medium text-sm">Daily Digest</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-10">
        <h3 className="text-2xl sm:text-3xl font-display text-white mb-2 leading-tight">
          Your daily food insights.
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
          Personalized reports based on what you scanned and consumed today.
        </p>
        <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium shadow hover:bg-gray-100 transition-all">
          View Demo
        </button>
      </div>
    </div>
  );
}

function ComparisonToolCard() {
  const swapData = {
    swap_from: {
      name: "Dairy milk Chocolate",
      negative_aspect: "High Sugar",
      image: "/app-images/chocolate.webp",
    },
    swap_to: {
      name: "Lindt Dark Chocolate",
      positive_aspect: "Antioxidants",
      image: "/app-images/darkchocolate.webp",
    },
  };

  return (
    <div className="iso-card bg-white border border-gray-100 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 min-h-[350px] sm:min-h-[400px] flex flex-col relative overflow-hidden shadow-soft">
      {/* Header */}
      <div className="mb-6 flex flex-row items-center justify-between">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-green-900">
            This week&apos;s easiest upgrade
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-row items-center justify-between gap-2 flex-1">
        {/* Left Item (Current Product) */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative mb-3 aspect-square w-full flex items-center justify-center rounded-2xl bg-gray-50 p-3">
            <Image
              src={swapData.swap_from.image}
              alt={swapData.swap_from.name}
              className="object-contain p-2"
              fill
              sizes="(max-width: 768px) 80px, 120px"
            />
          </div>
          <p className="mb-1.5 text-center text-[11px] font-bold uppercase tracking-wide text-gray-900 line-clamp-2">
            {swapData.swap_from.name}
          </p>
          <div className="rounded-full border border-red-100 bg-red-50 px-2 py-0.5">
            <p className="text-[9px] font-bold uppercase text-red-600">
              - {swapData.swap_from.negative_aspect}
            </p>
          </div>
        </div>

        {/* Swap Icon */}
        <div className="relative z-20 -mt-6 flex flex-col items-center justify-center px-1">
          <div className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
            <ArrowRight size={16} color="#9CA3AF" />
          </div>
          <p className="mt-2 text-[8px] font-black uppercase tracking-widest text-gray-300">
            Swap
          </p>
        </div>

        {/* Right Item (Better Alternative) */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative mb-3 aspect-square w-full flex items-center justify-center rounded-2xl border border-green-50 bg-green-50/50 p-3">
            <Image
              src={swapData.swap_to.image}
              alt={swapData.swap_to.name}
              className="object-contain p-2"
              fill
              sizes="(max-width: 768px) 80px, 120px"
            />
          </div>
          <p className="mb-1.5 text-center text-[11px] font-bold uppercase tracking-wide text-gray-900 line-clamp-2">
            {swapData.swap_to.name}
          </p>
          <div className="rounded-full border border-green-100 bg-green-50 px-2 py-0.5">
            <p className="text-[9px] font-bold uppercase text-green-600">
              + {swapData.swap_to.positive_aspect}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
