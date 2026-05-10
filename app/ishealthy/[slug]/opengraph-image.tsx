import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@/utils/supabase/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;
export const runtime = "nodejs";

type Params = Promise<{ slug: string }>;

function scoreInfo(score: number | null) {
  if (score === null) return { label: "Not scored", text: "#6b6b61", bg: "#f2f0e9" };
  if (score >= 80) return { label: "Excellent", text: "#147d3e", bg: "#e7f5ec" };
  if (score >= 60) return { label: "Good", text: "#4a6c48", bg: "#eef6df" };
  if (score >= 40) return { label: "Mixed", text: "#b54708", bg: "#fef3e7" };
  return { label: "Watch out", text: "#c81e1e", bg: "#fee7e7" };
}

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;

  const supabase = createClient();
  const { data: product } = await supabase
    .from("products")
    .select("product_name, brand, health_score, product_image_url")
    .eq("slug", slug)
    .maybeSingle();

  const heartBuffer = fs.readFileSync(
    path.join(process.cwd(), "public/app-images/heart.png"),
  );
  const heartDataUri = `data:image/png;base64,${heartBuffer.toString("base64")}`;

  const rawName =
    product?.product_name ?? slug.replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const name = rawName.length > 54 ? rawName.slice(0, 54).trimEnd() + "…" : rawName;
  const brand = product?.brand ?? null;
  const score = product?.health_score ?? null;
  const imageUrl = product?.product_image_url ?? null;
  const tone = scoreInfo(score);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f5f3ee",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Left: squircle product image */}
        <div
          style={{
            width: 450,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ede9e0",
          }}
        >
          <div
            style={{
              width: 370,
              height: 370,
              borderRadius: 96,
              overflow: "hidden",
              display: "flex",
              background: "#d6d0c4",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                width={370}
                height={370}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                alt=""
              />
            ) : (
              <span style={{ fontSize: 80, color: "#9a9488" }}>?</span>
            )}
          </div>
        </div>

        {/* Right: product info */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 56px 0 52px",
          }}
        >
          {brand ? (
            <div
              style={{
                display: "flex",
                background: "#d8f3dc",
                borderRadius: 100,
                padding: "6px 20px",
                fontSize: 13,
                fontWeight: 700,
                color: "#2d6a4f",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 20,
                alignSelf: "flex-start",
              }}
            >
              {brand}
            </div>
          ) : null}

          <div
            style={{
              fontSize: brand ? 42 : 46,
              fontWeight: 800,
              color: "#1a1a17",
              lineHeight: 1.12,
              marginBottom: 36,
            }}
          >
            {name}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heartDataUri}
              width={32}
              height={32}
              alt=""
              style={{ display: "flex", marginRight: 12 }}
            />
            <span style={{ fontSize: 16, fontWeight: 600, color: "#5c5c52" }}>
              Health Score
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: "#1a1a17",
                lineHeight: 1,
                marginRight: 10,
              }}
            >
              {score ?? "—"}
            </span>
            {score !== null ? (
              <span style={{ fontSize: 26, color: "#8a877d", fontWeight: 600 }}>
                / 100
              </span>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              background: tone.bg,
              color: tone.text,
              borderRadius: 100,
              padding: "9px 26px",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              alignSelf: "flex-start",
            }}
          >
            {tone.label}
          </div>
        </div>

        {/* Bottom-right branding */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 52,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 14, color: "#8a877d", fontWeight: 600 }}>
            gudforus.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
