import { NextResponse } from "next/server";
import { getTopProductNames, isSupabaseConfigured } from "@/lib/products";
import {
  createClient,
  createServiceClient,
  isSupabaseServiceConfigured,
} from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isSupabaseConfigured && !isSupabaseServiceConfigured) {
    return NextResponse.json({ products: [] }, { status: 200 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    const { data } = await getTopProductNames();
    return NextResponse.json({ products: data ?? [] });
  }

  const supabase = createServiceClient() ?? createClient();

  if (!supabase) {
    return NextResponse.json({ products: [] }, { status: 200 });
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, slug, product_name, product_image_url, category, health_score")
    .ilike("product_name", `%${query}%`)
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    return NextResponse.json({ products: [] }, { status: 200 });
  }

  return NextResponse.json({ products: data ?? [] });
}
