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
  if (score === null) return { label: "Not scored", text: "#5c5c52", bg: "#e4e2db" };
  if (score >= 80) return { label: "Excellent", text: "#0e6630", bg: "#c6ecd4" };
  if (score >= 60) return { label: "Good", text: "#2d5c30", bg: "#d4edcc" };
  if (score >= 40) return { label: "Mixed", text: "#8f3200", bg: "#f7dbc8" };
  return { label: "Watch out", text: "#9e1515", bg: "#f9cccc" };
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

  const faviconBuffer = fs.readFileSync(
    path.join(process.cwd(), "public/favicon.png"),
  );
  const faviconDataUri = `data:image/png;base64,${faviconBuffer.toString("base64")}`;

  const rawName =
    product?.product_name ?? slug.replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const name = rawName.length > 52 ? rawName.slice(0, 52).trimEnd() + "…" : rawName;
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
          fontFamily: "sans-serif",
        }}
      >
        {/* ── Left panel: branding pinned top-left, image truly centered ── */}
        <div
          style={{
            width: 420,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#e2ddd3",
            position: "relative",
          }}
        >
          {/* Branding — absolute so it doesn't shift image center */}
          <div
            style={{
              position: "absolute",
              top: 32,
              left: 32,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={faviconDataUri}
              width={48}
              height={48}
              alt=""
              style={{ borderRadius: 12, marginRight: 12, display: "flex" }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#2e2c28",
                letterSpacing: "-0.01em",
              }}
            >
              gudforus.com
            </span>
          </div>

          {/* Product image — true center of the full 420×630 panel */}
          <div
            style={{
              width: 340,
              height: 340,
              borderRadius: 88,
              overflow: "hidden",
              display: "flex",
              background: "#ccc8bc",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                width={340}
                height={340}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                alt=""
              />
            ) : (
              <span style={{ fontSize: 72, color: "#9a9488" }}>?</span>
            )}
          </div>
        </div>

        {/* ── Right panel: full height, all content centered ── */}
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 62px",
            background: "#f5f2eb",
            position: "relative",
          }}
        >
          {/* Brand pill */}
          {brand ? (
            <div
              style={{
                display: "flex",
                background: "#d4edda",
                borderRadius: 100,
                padding: "7px 22px",
                fontSize: 13,
                fontWeight: 700,
                color: "#256b40",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                alignSelf: "flex-start",
                marginBottom: 18,
              }}
            >
              {brand}
            </div>
          ) : null}

          {/* Product name */}
          <div
            style={{
              fontSize: 50,
              fontWeight: 600,
              color: "#2e2c28",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginBottom: 30,
            }}
          >
            {name}
          </div>

          {/* Health Score label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heartDataUri}
              width={40}
              height={40}
              alt=""
              style={{ display: "flex", marginRight: 12 }}
            />
            <span style={{ fontSize: 28, fontWeight: 800, color: "#3a3835" }}>
              Health Score
            </span>
          </div>

          {/* Score number */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              marginBottom: 44,
            }}
          >
            <span
              style={{
                fontSize: 168,
                fontWeight: 900,
                color: "#0f0e0c",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                marginRight: 14,
              }}
            >
              {score ?? "—"}
            </span>
            {score !== null ? (
              <span
                style={{
                  fontSize: 38,
                  color: "#9a9690",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                / 100
              </span>
            ) : null}
          </div>

          {/* Verdict pill */}
          <div
            style={{
              display: "flex",
              background: tone.bg,
              color: tone.text,
              borderRadius: 100,
              padding: "14px 36px",
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              alignSelf: "flex-start",
            }}
          >
            {tone.label}
          </div>

          {/* Bottom tagline */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 62,
              fontSize: 22,
              fontWeight: 700,
              color: "#7a766e",
              letterSpacing: "0.01em",
              fontStyle: "italic",
              display: "flex",
            }}
          >
            is it healthy for you?
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
