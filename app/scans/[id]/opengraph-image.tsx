import { getScanById, normalizeScan, type ScanRecord } from "@/lib/scans";
import { productCardSize, renderProductCard } from "@/lib/og/product-card";

export const size = productCardSize;
export const contentType = "image/png";
export const revalidate = 86400;
export const runtime = "nodejs";

type Params = Promise<{ id: string }>;

export default async function Image({ params }: { params: Params }) {
  const { id } = await params;
  const { data } = await getScanById(id);
  const scan = data ? normalizeScan(data as ScanRecord) : null;

  return renderProductCard({
    name: scan?.productName ?? scan?.productSubtitle ?? "Shared scan",
    brand: scan?.brand ?? null,
    score: scan?.healthScore ?? null,
    imageUrl: scan?.imageUrl ?? null,
    tagline: "scanned with Gud For Us",
  });
}
