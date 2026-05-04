import {
  createClient,
  createServiceClient,
  isSupabaseConfigured,
  isSupabaseServiceConfigured,
} from "@/utils/supabase/server";

type Jsonish =
  | string
  | number
  | boolean
  | null
  | Jsonish[]
  | { [key: string]: Jsonish };

export type ScanRecord = {
  id: string;
  user_id: string | null;
  image_url: string | null;
  image_size_kb: number | null;
  status: string | null;
  processing_started_at: string | null;
  processing_completed_at: string | null;
  processing_time_ms: number | null;
  product_type: string | null;
  product_name: string | null;
  brand: string | null;
  confidence: string | number | null;
  analysis_data: Jsonish;
  image_quality_score: number | null;
  is_valid_product: boolean | null;
  validation_message: string | null;
  user_feedback: string | null;
  user_notes: string | null;
  product_id: string | null;
  barcode: string | null;
  error_message: string | null;
  error_code: string | null;
  created_at: string | null;
  deleted_at: string | null;
  user_purchased: boolean | null;
  product_subtitle: string | null;
  product_fingerprint: string | null;
  data_source: string | null;
  gemini_metadata: Jsonish;
  gemini_response_initial: Jsonish;
  gemini_response_enhanced: Jsonish;
  is_web_enhanced: boolean | null;
  web_enhanced_at: string | null;
  web_enhancement_status: string | null;
  report_reason: string | null;
};

export type ScanIngredient = {
  title: string;
  description?: string | null;
  health_impact?: string | null;
};

export type ScanNutritionFacts = {
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

export type NormalizedScan = {
  productName: string | null;
  productSubtitle: string | null;
  brand: string | null;
  imageUrl: string | null;
  status: string | null;
  errorMessage: string | null;
  barcode: string | null;
  healthScore: number | null;
  compatibility: {
    label: string | null;
    score: number | null;
    summary: string | null;
    positives: string[];
    concerns: string[];
  };
  labTested: {
    available: boolean | null;
    summary: string | null;
    source: string | null;
    sourceUrl: string | null;
  } | null;
  ingredients: {
    good: ScanIngredient[];
    okay: ScanIngredient[];
    bad: ScanIngredient[];
  };
  nutritionFacts: ScanNutritionFacts | null;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseJsonField = (value: Jsonish): unknown => {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const stringValue = (value: unknown): string | null =>
  typeof value === "string" && value.trim() ? value : null;

const numberValue = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const booleanValue = (value: unknown): boolean | null =>
  typeof value === "boolean" ? value : null;

const firstValue = (...values: unknown[]) => {
  for (const value of values) {
    if (value !== null && value !== undefined && value !== "") {
      return value;
    }
  }

  return null;
};

const nestedRecord = (
  record: Record<string, unknown>,
  ...keys: string[]
): Record<string, unknown> | null => {
  for (const key of keys) {
    const value = record[key];
    if (isRecord(value)) {
      return value;
    }
  }

  return null;
};

const stringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) {
      return [item];
    }

    if (isRecord(item)) {
      const text =
        stringValue(item.text) ??
        stringValue(item.description) ??
        stringValue(item.summary) ??
        stringValue(item.title);
      return text ? [text] : [];
    }

    return [];
  });
};

const ingredientArray = (value: unknown): ScanIngredient[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) {
      return [{ title: item }];
    }

    if (!isRecord(item)) {
      return [];
    }

    const title =
      stringValue(item.title) ??
      stringValue(item.name) ??
      stringValue(item.ingredient);

    if (!title) {
      return [];
    }

    return [
      {
        title,
        description: stringValue(item.description) ?? stringValue(item.summary),
        health_impact:
          stringValue(item.health_impact) ??
          stringValue(item.healthImpact) ??
          stringValue(item.impact),
      },
    ];
  });
};

const normalizeIngredients = (analysis: Record<string, unknown>) => {
  const health = nestedRecord(analysis, "health", "ingredients");
  const directIngredients = ingredientArray(analysis.ingredients);

  const good = [
    ...ingredientArray(health?.good),
    ...directIngredients.filter(
      (ingredient) => ingredient.health_impact === "positive",
    ),
  ];
  const okay = [
    ...ingredientArray(health?.okay),
    ...directIngredients.filter(
      (ingredient) =>
        ingredient.health_impact !== "positive" &&
        ingredient.health_impact !== "negative",
    ),
  ];
  const bad = [
    ...ingredientArray(health?.bad),
    ...directIngredients.filter(
      (ingredient) => ingredient.health_impact === "negative",
    ),
  ];

  return { good, okay, bad };
};

const normalizeNutrition = (
  nutrition: Record<string, unknown> | null,
): ScanNutritionFacts | null => {
  if (!nutrition) {
    return null;
  }

  const facts = {
    fat_g: numberValue(firstValue(nutrition.fat_g, nutrition.fat)),
    carbs_g: numberValue(firstValue(nutrition.carbs_g, nutrition.carbs)),
    fiber_g: numberValue(firstValue(nutrition.fiber_g, nutrition.fiber)),
    sugar_g: numberValue(firstValue(nutrition.sugar_g, nutrition.sugar)),
    protein_g: numberValue(firstValue(nutrition.protein_g, nutrition.protein)),
    sodium_mg: numberValue(firstValue(nutrition.sodium_mg, nutrition.sodium)),
    energy_kcal: numberValue(
      firstValue(nutrition.energy_kcal, nutrition.calories, nutrition.energy),
    ),
    serving_size: stringValue(
      firstValue(nutrition.serving_size, nutrition.servingSize),
    ),
    cholesterol_mg: numberValue(
      firstValue(nutrition.cholesterol_mg, nutrition.cholesterol),
    ),
    saturated_fat_g: numberValue(
      firstValue(nutrition.saturated_fat_g, nutrition.saturatedFat),
    ),
  };

  return Object.values(facts).some((value) => value !== null) ? facts : null;
};

export const normalizeScan = (scan: ScanRecord): NormalizedScan => {
  const parsed = parseJsonField(scan.analysis_data);
  const analysis = isRecord(parsed) ? parsed : {};
  const compatibility =
    nestedRecord(analysis, "compatibility", "compatibility_score") ?? {};
  const labTested = nestedRecord(analysis, "labTested", "lab_tested");
  const nutrition = nestedRecord(analysis, "nutritionFacts", "nutrition_facts");

  return {
    productName:
      scan.product_name ??
      stringValue(firstValue(analysis.productName, analysis.product_name)),
    productSubtitle:
      scan.product_subtitle ??
      stringValue(firstValue(analysis.productSubtitle, analysis.product_subtitle)),
    brand: scan.brand ?? stringValue(analysis.brand),
    imageUrl: scan.image_url ?? stringValue(firstValue(analysis.imageUri, analysis.image_url)),
    status: scan.status,
    errorMessage: scan.error_message ?? stringValue(analysis.error_message),
    barcode: scan.barcode,
    healthScore: numberValue(
      firstValue(analysis.healthScore, analysis.health_score, analysis.score),
    ),
    compatibility: {
      label:
        stringValue(firstValue(compatibility.label, compatibility.rating)) ??
        stringValue(analysis.compatibilityLabel),
      score: numberValue(
        firstValue(
          compatibility.score,
          analysis.compatibilityScore,
          analysis.compatibility_score,
        ),
      ),
      summary:
        stringValue(firstValue(compatibility.summary, compatibility.description)) ??
        stringValue(analysis.compatibilitySummary),
      positives: [
        ...stringArray(compatibility.positives),
        ...stringArray(compatibility.good),
        ...stringArray(analysis.whatYouWillLike),
      ],
      concerns: [
        ...stringArray(compatibility.concerns),
        ...stringArray(compatibility.warnings),
        ...stringArray(compatibility.bad),
        ...stringArray(analysis.whatMightConcernYou),
      ],
    },
    labTested: labTested
      ? {
          available: booleanValue(
            firstValue(labTested.available, labTested.is_available),
          ),
          summary:
            stringValue(firstValue(labTested.summary, labTested.findings)) ??
            stringValue(labTested.description),
          source: stringValue(firstValue(labTested.source, labTested.provider)),
          sourceUrl: stringValue(
            firstValue(labTested.source_url, labTested.sourceUrl, labTested.url),
          ),
        }
      : null,
    ingredients: normalizeIngredients(analysis),
    nutritionFacts: normalizeNutrition(nutrition),
  };
};

export const getScanById = async (id: string) => {
  const supabase = createServiceClient() ?? createClient();

  if (!supabase) {
    return { data: null, error: null };
  }

  return supabase
    .from("scans")
    .select(
      "id,user_id,image_url,image_size_kb,status,processing_started_at,processing_completed_at,processing_time_ms,product_type,product_name,brand,confidence,analysis_data,image_quality_score,is_valid_product,validation_message,user_feedback,user_notes,product_id,barcode,error_message,error_code,created_at,deleted_at,user_purchased,product_subtitle,product_fingerprint,data_source,gemini_metadata,gemini_response_initial,gemini_response_enhanced,is_web_enhanced,web_enhanced_at,web_enhancement_status,report_reason",
    )
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();
};

export { isSupabaseConfigured, isSupabaseServiceConfigured };
