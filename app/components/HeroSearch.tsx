"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import LiquidGlass from "./LiquidGlass";

type ProductChip = {
  id: string;
  slug: string;
  product_name: string | null;
  product_image_url: string | null;
  category: string | null;
  health_score: number | null;
};

const popularTags = [
  "Luxe Organix",
  "Pepsi Zero",
  "Buttermilk Biscuits",
  "YoPRO Mango",
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductChip[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `/api/products/search?q=${encodeURIComponent(q)}`,
      );
      const data = (await response.json()) as { products?: ProductChip[] };
      setResults(data.products ?? []);
      setOpen(true);
    } catch {
      setResults([]);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayName = (p: ProductChip) =>
    p.product_name ?? p.slug.replace(/-review$/, "").replaceAll("-", " ");

  const scoreColor = (score: number | null) => {
    if (score === null) return "text-[#9ca3af]";
    if (score >= 75) return "text-[#2e7d32]";
    if (score >= 50) return "text-[#f59e0b]";
    return "text-[#dc2626]";
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    inputRef.current?.focus();
  };

  const handleCheckIt = () => {
    if (query.trim()) {
      search(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCheckIt();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl mx-auto md:mx-0"
    >
      {/* Search bar — liquid glass surface refracting the hero video behind it */}
      <div className="rounded-full border border-white/40 shadow-xl focus-within:border-[#2e7d32] focus-within:ring-2 focus-within:ring-[#2e7d32]/20 transition-all">
      <LiquidGlass
        cornerRadius={9999}
        edgeDepth={16}
        tint="rgba(255,255,255,0.68)"
        specular="rgba(255,255,255,0.75)"
      >
      <div className="flex items-center pl-5 pr-1.5 py-1.5">
        {loading ? (
          <svg
            className="w-5 h-5 text-[#2e7d32] animate-spin shrink-0 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-[#6b7280] shrink-0 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        )}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Try: Coke Zero, Lay's, Cetap"
          className="flex-1 bg-transparent text-[#1f2937] placeholder-[#9ca3af] text-base outline-none min-w-0"
          spellCheck={false}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(false);
            }}
            className="text-[#9ca3af] hover:text-[#6b7280] transition-colors mr-2"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <button
          onClick={handleCheckIt}
          className="bg-[#1f3d20] hover:bg-[#2d5a2e] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap flex items-center gap-1.5 shadow-sm"
        >
          Check it
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
      </LiquidGlass>
      </div>

      {/* Popular tags */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Popular:
        </span>
        {popularTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="px-3 py-1.5 rounded-full border border-[#e5e3dd] bg-white text-xs font-medium text-[#374151] hover:border-[#4a6c48]/40 hover:bg-[#f7fbf7] transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-[calc(100%-28px)] left-0 right-0 mt-2 bg-white rounded-2xl border border-[#dad7cc] shadow-xl overflow-hidden z-50 animate-fade-in-up">
          {results.map((product, i) => (
            <Link
              key={product.id}
              href={`/ishealthy/${product.slug}`}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 px-5 py-3.5 hover:bg-[#f7f5ee] transition-colors ${i !== 0 ? "border-t border-[#f0ede6]" : ""}`}
            >
              <div className="w-11 h-11 rounded-xl bg-[#f2f0e9] shrink-0 overflow-hidden flex items-center justify-center">
                {product.product_image_url ? (
                  <Image
                    src={product.product_image_url}
                    alt={displayName(product)}
                    width={44}
                    height={44}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold text-[#9ca3af]">G</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1f2937] truncate">
                  {displayName(product)}
                </p>
                <p className="text-xs text-[#6b7280] truncate">
                  {product.category ?? "Product"}
                  {product.health_score !== null && (
                    <span
                      className={`ml-2 font-medium ${scoreColor(product.health_score)}`}
                    >
                      Score {product.health_score}
                    </span>
                  )}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-[#d1cfc8] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 18l6-6-6-6"
                />
              </svg>
            </Link>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && !loading && (
        <div className="absolute top-[calc(100%-28px)] left-0 right-0 mt-2 bg-white rounded-2xl border border-[#dad7cc] shadow-xl px-5 py-4 z-50 animate-fade-in-up">
          <p className="text-sm text-[#6b7280]">
            No products found for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
