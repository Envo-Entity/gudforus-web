"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { formatProductSlug } from "@/lib/products";

type ProductChip = {
  id: string;
  slug: string;
  product_name: string | null;
  product_image_url: string | null;
  category: string | null;
  health_score: number | null;
};

type Props = {
  initialProducts: ProductChip[];
};

export default function IsHealthySearch({ initialProducts }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductChip[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("products")
      .select("id, slug, product_name, product_image_url, category, health_score")
      .ilike("product_name", `%${q}%`)
      .order("created_at", { ascending: false })
      .limit(8);

    setResults(data ?? []);
    setOpen(true);
    setLoading(false);
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
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayName = (p: ProductChip) =>
    p.product_name ?? formatProductSlug(p.slug);

  const scoreColor = (score: number | null) => {
    if (score === null) return "text-[#9ca3af]";
    if (score >= 75) return "text-[#2e7d32]";
    if (score >= 50) return "text-[#f59e0b]";
    return "text-[#dc2626]";
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Search bar */}
      <div ref={containerRef} className="relative w-full max-w-2xl">
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-[#dad7cc] px-5 py-4 shadow-sm focus-within:border-[#2e7d32] focus-within:ring-2 focus-within:ring-[#2e7d32]/10 transition-all">
          {loading ? (
            <svg
              className="w-5 h-5 text-[#2e7d32] animate-spin shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-[#9ca3af] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Search food products..."
            className="flex-1 bg-transparent text-[#1f2937] placeholder-[#9ca3af] text-base outline-none"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setResults([]); setOpen(false); }}
              className="text-[#9ca3af] hover:text-[#6b7280] transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Dropdown */}
        {open && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#dad7cc] shadow-lg overflow-hidden z-50">
            {results.map((product, i) => (
              <Link
                key={product.id}
                href={`/ishealthy/${product.slug}`}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 px-5 py-3.5 hover:bg-[#f7f5ee] transition-colors ${
                  i !== 0 ? "border-t border-[#f0ede6]" : ""
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#f2f0e9] shrink-0 overflow-hidden flex items-center justify-center">
                  {product.product_image_url ? (
                    <Image
                      src={product.product_image_url}
                      alt={displayName(product)}
                      width={44}
                      height={44}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-[#9ca3af]">
                      G
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1f2937] truncate">{displayName(product)}</p>
                  <p className="text-xs text-[#6b7280] truncate">
                    {product.category ?? "Food product"}
                    {product.health_score !== null && (
                      <span className={`ml-2 font-medium ${scoreColor(product.health_score)}`}>
                        Score {product.health_score}
                      </span>
                    )}
                  </p>
                </div>
                <svg className="w-4 h-4 text-[#d1cfc8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
        )}

        {open && query.trim() && results.length === 0 && !loading && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#dad7cc] shadow-lg px-5 py-4 z-50">
            <p className="text-sm text-[#6b7280]">No products found for &ldquo;{query}&rdquo;</p>
          </div>
        )}
      </div>

      {/* Chips — always in DOM so the search bar never shifts */}
      <div className={`mt-16 flex flex-wrap justify-center gap-3 max-w-4xl transition-opacity duration-150 ${query ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {initialProducts.map((product) => (
          <Link
            key={product.id}
            href={`/ishealthy/${product.slug}`}
            className="px-4 py-1.5 rounded-full bg-[#ede9e0] text-sm text-[#4b5563] hover:bg-[#dff0de] hover:text-[#2e7d32] transition-colors duration-150"
          >
            {displayName(product)}
          </Link>
        ))}
      </div>
    </div>
  );
}
