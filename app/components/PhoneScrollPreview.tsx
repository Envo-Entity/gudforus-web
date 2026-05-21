"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import Image from "next/image";

export default function PhoneScrollPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Start tracking when section enters viewport from bottom
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 1] : [1.05, 1];
  };

  // Rotation spans first 50% of scroll for smoother, gradual straightening
  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  // Scale also spans first 50%
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());

  // Opacity for info blocks - fades in during the first 40% of scroll
  const infoOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  // Slide in effect - subtle movement
  const infoXLeft = useTransform(scrollYProgress, [0.2, 0.6], [-20, 0]);
  const infoXRight = useTransform(scrollYProgress, [0.2, 0.6], [20, 0]);

  return (
    <section className="relative -mt-32 md:-mt-48 z-20" ref={containerRef}>
      {/* Container height for scroll tracking - phone stays at bottom */}
      <div className="h-[50rem] md:h-[70rem] flex items-end justify-center relative px-4 pb-8 md:pb-24">
        <div
          className="sticky bottom-20 [700px]:bottom-24 w-full flex justify-center items-center gap-6 md:gap-10 lg:gap-14"
          style={{
            perspective: "1000px",
          }}
        >
          {/* Left Info Blocks */}
          <motion.div
            style={{ opacity: infoOpacity, x: infoXLeft }}
            className="hidden md:flex flex-col gap-24 lg:gap-40 items-end text-right text-gray-800"
          >
            <div className="max-w-[200px]">
              <h3 className="text-xl font-bold mb-2">Health Score</h3>
              <p className="text-sm text-gray-600">
                Instantly assess nutritional value with our color-coded rating
                system.
              </p>
            </div>
            <div className="max-w-[200px]">
              <h3 className="text-xl font-bold mb-2">Clean Ingredients</h3>
              <p className="text-sm text-gray-600">
                Identify additives and ultra-processed ingredients at a glance.
              </p>
            </div>
          </motion.div>

          {/* Phone Mockup Image */}
          <motion.div
            style={{
              rotateX: rotate,
              scale,
            }}
            className="shrink-0 w-[270px] md:w-[260px] overflow-hidden"
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: "9/20" }}
            >
              <Image
                src="/app-images/hero-background.webp"
                alt="GudForUs app preview"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Right Info Blocks */}
          <motion.div
            style={{ opacity: infoOpacity, x: infoXRight }}
            className="hidden md:flex flex-col gap-24 lg:gap-40 items-start text-left text-gray-800"
          >
            <div className="max-w-[200px]">
              <h3 className="text-xl font-bold mb-2">Compatibility</h3>
              <p className="text-sm text-gray-600">
                Personalized to your body and preferences.
              </p>
            </div>
            <div className="max-w-[200px]">
              <h3 className="text-xl font-bold mb-2">Smart Swaps</h3>
              <p className="text-sm text-gray-600">
                Get instant recommendations for healthier alternatives.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
