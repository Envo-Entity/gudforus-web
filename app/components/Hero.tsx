"use client";

import { RotatingText } from "@/components/ui/rotating-text";
import Image from "next/image";
import AppleStoreIcon from "./AppleStoreIcon";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    <header className="relative pt-32 pb-16 md:pb-64" id="get-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center md:text-left">
            {/* Main Heading */}
             <h1 className="font-display text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-gray-900 leading-tight">
              Know what you
              <br />
              <span className="inline-flex items-baseline gap-2">
                
                <RotatingText
                  text={["consume", "buy"]}
                  duration={2000}
                  className="font-display text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-[#4a6c48] italic"
                />
              </span>
            </h1>

            {/* Subtitle — tight to heading */}
            <p className="mt-5 max-w-2xl mx-auto md:mx-0 text-md sm:text-lg text-gray-600 font-light leading-relaxed">
              Finally know what&apos;s actually in your grocery products. Decode labels instantly. From ingredient quality to personal fit.
            </p>

            {/* Search Bar — primary CTA, generous spacing */}
            <div className="mt-10 w-full">
              <HeroSearch />
            </div>

            {/* App Store Buttons */}
            <div className="mt-8">
              <div className="flex flex-row gap-3 sm:gap-4 justify-center md:justify-start items-center md:items-start w-full sm:w-auto">
                <a
                  target="_blank"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 sm:gap-3 bg-gray-900 text-white px-5 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium transition-transform hover:scale-105 shadow-xl min-w-0 sm:min-w-[180px] text-sm sm:text-base"
                  href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992"
                >
                  <AppleStoreIcon className="w-5 h-5 text-white shrink-0" />
                  <span className="whitespace-nowrap">App Store</span>
                </a>
                <a
                  target="_blank"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-gray-900 border border-gray-200 px-5 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium transition-transform hover:scale-105 shadow-lg min-w-0 sm:min-w-[180px] text-sm sm:text-base"
                  href="https://play.google.com/store/apps/details?id=com.app.gudforus&hl=en_IN"
                >
                  <Image
                    src="/app-images/google-play-store-icon.webp"
                    alt="Google Play"
                    width={20}
                    height={20}
                  />
                  <span className="whitespace-nowrap">Google Play</span>
                </a>
              </div>

              {/* Stats — close to buttons, secondary info */}
              <div className="mt-5 hidden md:flex justify-center md:justify-start gap-6 text-sm text-gray-600 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a6c48]"></span>{" "}
                  10M+ Products
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a6c48]"></span>{" "}
                  Science-Backed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a6c48]"></span>{" "}
                  100% Private
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="flex items-center justify-center mt-4 md:mt-0">
            <div className="relative w-full aspect-square max-w-md rounded-lg overflow-hidden">
              <video
                src="https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/hero-vid.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
