import {
  buildComparisonMetadata,
  ComparisonBlogPage,
} from "../_components/comparison-blog-page";
import { yukaAlternativePages } from "../yuka-alternative-pages";

const config = yukaAlternativePages["best-yuka-alternative-usa"];

export const metadata = buildComparisonMetadata(config);

export default function BestYukaAlternativeUsaPage() {
  return <ComparisonBlogPage config={config} />;
}
