import { createClient, isSupabaseConfigured } from "@/utils/supabase/server";

export type ProductRecord = {
  idx: number | null;
  id: string;
  product_key: string | null;
  barcode: string | null;
  slug: string;
  product_name: string | null;
  brand: string | null;
  product_subtitle: string | null;
  category: string | null;
  is_consumable: boolean | null;
  health_score: number | null;
  planet_score: number | null;
  confidence: string | number | null;
  data_source: string | null;
  analysis_data: Jsonish;
  meta_title: string | null;
  meta_description: string | null;
  verdict: string | null;
  verdict_summary: string | null;
  seo_content: Jsonish;
  faq: Jsonish;
  category_tags: string[] | null;
  product_image_url: string | null;
  og_image_url: string | null;
  better_alternative_id: string | null;
  related_product_ids: string[] | null;
  scan_count: number | null;
  seo_status: string | null;
  seo_generated_at: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  health_goals: Jsonish;
  myth_busters: Jsonish;
};

type Jsonish = string | number | boolean | null | Jsonish[] | { [key: string]: Jsonish };

export const formatProductSlug = (slug: string) =>
  slug.replace(/-review$/, "").replaceAll("-", " ");

export const parseJsonField = (value: Jsonish): Jsonish => {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value) as Jsonish;
  } catch {
    return value;
  }
};

export const getProducts = async () => {
  const supabase = createClient();

  if (!supabase) {
    return { data: null, error: null };
  }

  return supabase
    .from("products")
    .select("id, slug")
    .order("created_at", { ascending: false });
};

export const getProductBySlug = async (slug: string) => {
  const supabase = createClient();

  if (!supabase) {
    return { data: null, error: null };
  }

  return supabase.from("products").select("*").eq("slug", slug).maybeSingle();
};

export { isSupabaseConfigured };
