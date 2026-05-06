import {
  createClient,
  createServiceClient,
  isSupabaseConfigured,
  isSupabaseServiceConfigured,
} from "@/utils/supabase/server";

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

export type ProductIngredient = {
  title: string;
  description: string;
  health_impact: "positive" | "neutral" | "negative" | string;
};

export type ProductNutritionFacts = {
  fat_g?: number | null;
  carbs_g?: number | null;
  fiber_g?: number | null;
  sugar_g?: number | null;
  protein_g?: number | null;
  sodium_mg?: number | null;
  energy_kcal?: number | null;
  serving_size?: string | null;
  cholesterol_mg?: number | null;
  saturated_fat_g?: number | null;
};

export type ProductAnalysisData = {
  lab_tested?: {
    available?: boolean | null;
    summary?: string | null;
  } | null;
  environment?: {
    summary?: string | null;
    impact?: Record<string, string | number | boolean | null> | null;
  } | null;
  ingredients?: ProductIngredient[] | null;
  nutrition_facts?: ProductNutritionFacts | null;
};

export type ProductSeoContent = {
  key_takeaways?: string[] | null;
  who_it_is_for?: string | null;
  expert_analysis?: string | null;
  intro_paragraph?: string | null;
  who_should_avoid?: string | null;
};

export type ProductFaqItem = {
  question: string;
  answer: string;
};

export type ProductHealthGoal = {
  label?: string | null;
  score?: number | null;
  summary?: string | null;
  applicable?: boolean | null;
};

export type ProductMythBuster = {
  claim?: string | null;
  verdict?: boolean | null;
  explanation?: string | null;
};

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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asString = (value: unknown): string | null =>
  typeof value === "string" && value.trim() ? value : null;

const asNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

export const parseAnalysisData = (value: Jsonish): ProductAnalysisData => {
  const parsed = parseJsonField(value);

  if (!isRecord(parsed)) {
    return {};
  }

  return parsed as ProductAnalysisData;
};

export const parseSeoContent = (value: Jsonish): ProductSeoContent => {
  const parsed = parseJsonField(value);

  if (!isRecord(parsed)) {
    return {};
  }

  const keyTakeaways = Array.isArray(parsed.key_takeaways)
    ? parsed.key_takeaways.map(asString).filter(Boolean)
    : null;

  return {
    key_takeaways: keyTakeaways as string[] | null,
    who_it_is_for: asString(parsed.who_it_is_for),
    expert_analysis: asString(parsed.expert_analysis),
    intro_paragraph: asString(parsed.intro_paragraph),
    who_should_avoid: asString(parsed.who_should_avoid),
  };
};

export const parseFaqItems = (value: Jsonish): ProductFaqItem[] => {
  const parsed = parseJsonField(value);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const question = asString(item.question);
    const answer = asString(item.answer);

    if (!question || !answer) {
      return [];
    }

    return [{ question, answer }];
  });
};

export const parseHealthGoals = (
  value: Jsonish,
): Array<[string, ProductHealthGoal]> => {
  const parsed = parseJsonField(value);

  if (!isRecord(parsed)) {
    return [];
  }

  return Object.entries(parsed).flatMap(([key, goal]) => {
    if (!isRecord(goal) || goal.applicable === false) {
      return [];
    }

    return [
      [
        key,
        {
          label: asString(goal.label),
          score: asNumber(goal.score),
          summary: asString(goal.summary),
          applicable:
            typeof goal.applicable === "boolean" ? goal.applicable : null,
        },
      ] as [string, ProductHealthGoal],
    ];
  });
};

export const parseMythBusters = (value: Jsonish): ProductMythBuster[] => {
  const parsed = parseJsonField(value);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    return [
      {
        claim: asString(item.claim),
        verdict: typeof item.verdict === "boolean" ? item.verdict : null,
        explanation: asString(item.explanation),
      },
    ];
  });
};

const createProductClient = () => createServiceClient() ?? createClient();

export const getProducts = async () => {
  const supabase = createProductClient();

  if (!supabase) {
    return { data: null, error: null };
  }

  return supabase
    .from("products")
    .select("id, slug")
    .order("created_at", { ascending: false });
};

export const getSeoReadyProducts = async () => {
  const supabase = createProductClient();

  if (!supabase) {
    return { data: null, error: null };
  }

  return supabase
    .from("products")
    .select("id, slug, updated_at, published_at, seo_generated_at")
    .eq("seo_status", "done")
    .order("updated_at", { ascending: false });
};

export const getTopProductNames = async () => {
  const supabase = createProductClient();

  if (!supabase) {
    return { data: null, error: null };
  }

  return supabase
    .from("products")
    .select("id, slug, product_name, product_image_url, category, health_score")
    .order("created_at", { ascending: false })
    .limit(50);
};

export const getProductBySlug = async (slug: string) => {
  const supabase = createProductClient();

  if (!supabase) {
    return { data: null, error: null };
  }

  return supabase.from("products").select("*").eq("slug", slug).maybeSingle();
};

export { isSupabaseConfigured, isSupabaseServiceConfigured };
