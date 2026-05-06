import { getTopProductNames } from "@/lib/products";
import IsHealthySearch from "./IsHealthySearch";
import MinimalNav from "@/app/components/MinimalNav";

export const revalidate = 3600;

export default async function IsHealthyPage() {
  const { data: products } = await getTopProductNames();

  return (
    <>
      <MinimalNav />
      <main className="min-h-screen bg-[#f7f5ee] px-4 pb-24 sm:px-6 lg:px-8 flex flex-col">
        <div className="mx-auto max-w-5xl w-full flex flex-col items-center flex-1 justify-center pt-[calc(12vh+64px)]">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1f2937] text-center tracking-tight">
            Food Product Health Scores
          </h1>
          <p className="mt-3 text-[#6b7280] text-center text-base max-w-md">
            Search any packaged food to read its health score, ingredients, and verdict.
          </p>

          <div className="mt-10 w-full">
            <IsHealthySearch initialProducts={products ?? []} />
          </div>
        </div>
      </main>
    </>
  );
}
