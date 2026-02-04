"use client";

import { RotatingText } from "@/components/ui/rotating-text";
import Image from "next/image";

export default function Hero() {
  return (
    <header className="relative pt-32 pb-48 md:pb-64" id="get-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a6c48]/10 border border-[#4a6c48]/20 text-[#4a6c48] mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-[#4a6c48] animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider">
                AI-Powered Consumption Intelligence
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-gray-900 mb-8 leading-tight">
              Know what you
              <br />
              <span className="inline-flex items-baseline gap-2">
                <span className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-gray-900">
                  really{" "}
                </span>
                <RotatingText
                  text={["consume", "buy"]}
                  duration={2000}
                  className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-[#4a6c48] italic"
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-xl text-gray-600 font-light leading-relaxed">
              Decode labels instantly. From ingredient quality to environmental
              impact, GudForUs gives you the clarity to make better choices for
              your body and the planet.
            </p>

            {/* App Store Buttons */}
            <div className="mt-10">
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center md:items-start">
                <a
                  className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 shadow-xl min-w-[180px]"
                  href="#"
                >
                  <span className="material-icons-round text-xl">apple</span>
                  <span>App Store</span>
                </a>
                <a
                  className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 shadow-lg min-w-[180px]"
                  href="#"
                >
                  <Image
                    src="/app-images/google-play-store-icon.webp"
                    alt="Google Play"
                    width={20}
                    height={20}
                  />
                  <span>Google Play</span>
                </a>
              </div>

              {/* Stats */}
              <div className="mt-8 flex justify-center md:justify-start gap-6 text-sm text-gray-600 flex-wrap">
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
          <div className="hidden md:flex items-center justify-center">
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
