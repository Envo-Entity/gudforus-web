"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Liquid glass surface: an SVG feDisplacementMap refracts whatever sits
 * behind the element (video, content, scroll) the way light bends through
 * curved glass. Technique per https://kube.io/blog/liquid-glass-css-svg/.
 *
 * Only Chromium renders SVG filters as `backdrop-filter`, so everywhere
 * else this degrades to a plain frosted-glass blur + tint.
 */

function smoothStep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function roundedRectSDF(
  x: number,
  y: number,
  halfWidth: number,
  halfHeight: number,
  radius: number,
) {
  const qx = Math.abs(x) - halfWidth + radius;
  const qy = Math.abs(y) - halfHeight + radius;
  return (
    Math.min(Math.max(qx, qy), 0) + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - radius
  );
}

/** Where glass is flat, points pass straight through; near the edge, the
 * surface curves and pulls samples toward the center (the refraction). */
function refract(
  x: number,
  y: number,
  halfWidth: number,
  halfHeight: number,
  radius: number,
  edge: number,
) {
  const distanceToEdge = roundedRectSDF(x, y, halfWidth - edge, halfHeight - edge, radius);
  const bend = smoothStep(edge * 2, -edge * 0.4, distanceToEdge);
  const scaled = smoothStep(0, 1, bend);
  return { x: x * scaled, y: y * scaled };
}

function buildDisplacementMap(width: number, height: number, radius: number, edge: number) {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const halfW = w / 2;
  const halfH = h / 2;
  const r = Math.min(radius, Math.min(halfW, halfH));

  const rawDx = new Float32Array(w * h);
  const rawDy = new Float32Array(w * h);
  let maxScale = 0.001;

  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const x = px - halfW;
      const y = py - halfH;
      const pos = refract(x, y, halfW, halfH, r, edge);
      const dx = pos.x - x;
      const dy = pos.y - y;
      const idx = py * w + px;
      rawDx[idx] = dx;
      rawDy[idx] = dy;
      if (Math.abs(dx) > maxScale) maxScale = Math.abs(dx);
      if (Math.abs(dy) > maxScale) maxScale = Math.abs(dy);
    }
  }

  const data = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const o = i * 4;
    data[o] = (rawDx[i] / maxScale) * 127 + 128;
    data[o + 1] = (rawDy[i] / maxScale) * 127 + 128;
    data[o + 2] = 128;
    data[o + 3] = 255;
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.putImageData(new ImageData(data, w, h), 0, 0);

  return { dataUrl: canvas.toDataURL(), scale: maxScale * 2 };
}

function supportsSvgBackdropFilter() {
  if (typeof window === "undefined") return false;
  // Only Chromium implements SVG filter references as backdrop-filter;
  // Safari/Firefox parse the syntax but never render the distortion.
  return Boolean((window as unknown as { chrome?: unknown }).chrome) && /Chrome|Chromium/.test(navigator.userAgent);
}

interface LiquidGlassProps {
  className?: string;
  style?: React.CSSProperties;
  /** Corner radius in px. Use a large number (e.g. 999) for a pill. */
  cornerRadius?: number;
  /** Thickness of the refracting edge band, in px. */
  edgeDepth?: number;
  /** Glass tint, any CSS color (include alpha). */
  tint?: string;
  /** Rim-light color for the inset specular highlight. */
  specular?: string;
  children?: React.ReactNode;
}

export default function LiquidGlass({
  className,
  style,
  cornerRadius = 24,
  edgeDepth = 18,
  tint = "rgba(255,255,255,0.35)",
  specular = "rgba(255,255,255,0.6)",
  children,
}: LiquidGlassProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `liquid-glass-${rawId}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const feDisplacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const [supported, setSupported] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSupported(supportsSvgBackdropFilter());
  }, []);

  useEffect(() => {
    if (!supported) return;
    const el = wrapRef.current;
    if (!el) return;

    const render = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      const map = buildDisplacementMap(width, height, cornerRadius, edgeDepth);
      if (!map || !feImageRef.current || !feDisplacementRef.current) return;
      feImageRef.current.setAttribute("href", map.dataUrl);
      feImageRef.current.setAttribute("width", String(Math.round(width)));
      feImageRef.current.setAttribute("height", String(Math.round(height)));
      feDisplacementRef.current.setAttribute("scale", String(map.scale));
      setReady(true);
    };

    render();
    const ro = new ResizeObserver(render);
    ro.observe(el);
    return () => ro.disconnect();
  }, [supported, cornerRadius, edgeDepth]);

  const useLiquid = supported && ready;

  return (
    <div
      ref={wrapRef}
      className={cn("relative isolate overflow-hidden", className)}
      style={{ borderRadius: cornerRadius, ...style }}
    >
      {supported && (
        <svg aria-hidden className="absolute h-0 w-0 overflow-hidden">
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feImage ref={feImageRef} result="displacementMap" preserveAspectRatio="none" />
            <feDisplacementMap
              ref={feDisplacementRef}
              in="SourceGraphic"
              in2="displacementMap"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}

      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: useLiquid ? `url(#${filterId}) saturate(1.15)` : "blur(18px) saturate(1.15)",
          WebkitBackdropFilter: useLiquid
            ? `url(#${filterId}) saturate(1.15)`
            : "blur(18px) saturate(1.15)",
          background: tint,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{
          boxShadow: `inset 0 1px 1px ${specular}, inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 -8px 16px -12px rgba(0,0,0,0.25)`,
        }}
      />

      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
}
