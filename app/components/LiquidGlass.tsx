"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Liquid glass surface: an SVG feDisplacementMap refracts whatever sits
 * behind the element (video, content, scroll) the way light bends through
 * curved glass. Technique per https://kube.io/blog/liquid-glass-css-svg/.
 *
 * Always applied, regardless of browser — support for SVG filters as
 * `backdrop-filter` varies (reliably in Chromium, inconsistently or not
 * at all elsewhere).
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

interface LiquidGlassProps {
  className?: string;
  style?: React.CSSProperties;
  /** Corner radius in px. Use a large number (e.g. 999) for a pill. */
  cornerRadius?: number;
  /** Thickness of the refracting edge band, in px. */
  edgeDepth?: number;
  /** Gaussian blur applied alongside the refraction, in px. Works in tandem
   * with the SVG displacement — not a fallback for it. 0 disables blur. */
  blurLevel?: number;
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
  blurLevel = 4,
  tint = "rgba(255,255,255,0.35)",
  specular = "rgba(255,255,255,0.6)",
  children,
}: LiquidGlassProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `liquid-glass-${rawId}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const feDisplacementRef = useRef<SVGFEDisplacementMapElement>(null);
  useEffect(() => {
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
    };

    render();
    const ro = new ResizeObserver(render);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cornerRadius, edgeDepth]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative isolate overflow-hidden", className)}
      style={{ borderRadius: cornerRadius, ...style }}
    >
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

      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: `url(#${filterId}) blur(${blurLevel}px) saturate(1.15)`,
          WebkitBackdropFilter: `url(#${filterId}) blur(${blurLevel}px) saturate(1.15)`,
          background: tint,
          willChange: "backdrop-filter",
          transform: "translateZ(0)",
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
