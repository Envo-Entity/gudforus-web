"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const scoreTone = (score: number | null) => {
  if (score === null)
    return { label: "Not scored", text: "text-[#6b6b61]", bg: "bg-[#f2f0e9]" };
  if (score >= 80)
    return { label: "Excellent", text: "text-[#147d3e]", bg: "bg-[#e7f5ec]" };
  if (score >= 60)
    return { label: "Good", text: "text-[#4a6c48]", bg: "bg-[#eef6df]" };
  if (score >= 40)
    return { label: "Mixed", text: "text-[#b54708]", bg: "bg-[#fef3e7]" };
  return { label: "Watch out", text: "text-[#c81e1e]", bg: "bg-[#fee7e7]" };
};

export default function ScoreBar({ score }: { score: number | null }) {
  const tone = scoreTone(score);

  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (score === null) return;
    const duration = 1100;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * score));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [score]);

  return (
    <div className="flex flex-col rounded-[22px] border border-[#edecea] bg-white p-6 shadow-[0_12px_40px_rgba(26,26,23,0.04)] overflow-hidden">

      {/* Top row: title left, badge right */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/app-images/heart.png" alt="" width={32} height={32} />
          <p className="text-xl font-bold text-[#1a1a17]">Health score</p>
        </div>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${tone.bg} ${tone.text}`}
        >
          {tone.label}
        </span>
      </div>

      {/* Score — hero number, right above the bar */}
      <div className="mt-auto mb-3 flex items-baseline justify-end gap-1">
        <p className="text-6xl md:text-8xl font-bold leading-none tracking-tight text-[#1a1a17]">
          {score !== null ? displayed : "N/A"}
        </p>
        {score !== null ? (
          <span className="text-xl font-medium text-[#8a877d]">/ 100</span>
        ) : null}
      </div>

      {/* Bar */}
      <div className="">
        <div className="flex h-5 overflow-hidden rounded-lg shadow-[inset_0_0_0_1px_rgba(26,26,23,0.06)]">
          <div className="flex-1 bg-[#f87171]" />
          <div className="flex-1 bg-[#fb923c]" />
          <div className="flex-1 bg-[#fbbf24]" />
          <div className="flex-1 bg-[#a3e635]" />
          <div className="flex-1 bg-[#4ade80]" />
        </div>
        <div className="mt-2 flex justify-between text-[0.72rem] font-medium text-[#8a877d]">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>

    </div>
  );
}
