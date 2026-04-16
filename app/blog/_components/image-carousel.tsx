"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageCarousel({
  images,
  alt,
}: {
  images: string[];
  alt?: string;
}) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () =>
    setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#edecea]">
      <Image
        src={images[current]}
        alt={alt ? `${alt} — image ${current + 1}` : `Image ${current + 1}`}
        fill
        sizes="(max-width: 720px) 100vw, 720px"
        className="object-cover"
        priority={current === 0}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-sm transition-colors"
          >
            <ChevronLeft size={18} className="text-[#1a1a17]" />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-sm transition-colors"
          >
            <ChevronRight size={18} className="text-[#1a1a17]" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
