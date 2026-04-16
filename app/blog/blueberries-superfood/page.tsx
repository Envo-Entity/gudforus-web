import type { Metadata } from "next";
import {
  createLandingMetadata,
  SeoLandingPage,
  type SeoLandingConfig,
} from "../../components/seo-landing-page";

// [0] = square image for the widget in FeatureCards
// [1] and [2] = 16:9 images for the carousel in this blog
export const blueberryImages: string[] = [
  "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/blueberries.png",
  "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/blueberries_1.jpg",
  "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/blueberries_2.jpg",
];

const page: SeoLandingConfig = {
  slug: "blog/blueberries-superfood",
  title: "Blueberries: The Superfood You Don't Have to Try Hard to Eat",
  metaTitle: "Blueberries: Why They're Worth Eating Every Day | Gud For Us",
  metaDescription:
    "Blueberries are one of the most studied foods in nutrition science. Here's what the research actually says about brain health, antioxidants, and the fresh vs. frozen debate.",
  heroEyebrow: "This Week's Superfood",
  heroTitle: "Blueberries: The Superfood You Don't Have to Try Hard to Eat",
  heroDescription:
    "Most superfoods come with a catch. Spirulina tastes like a pond. Acai costs a small fortune outside a smoothie bowl. Blueberries have none of these problems — and the research behind them is some of the most consistent in nutritional science.",
  targetQueries: [
    "are blueberries a superfood",
    "blueberry health benefits",
    "fresh vs frozen blueberries",
    "how many blueberries per day",
    "blueberries brain health",
  ],
  heroHighlights: [
    {
      title: "The color is the point",
      description:
        "What anthocyanins are, why blueberries are uniquely concentrated in them, and why eating the whole berry matters.",
    },
    {
      title: "What the research actually says",
      description:
        "Brain health findings from Harvard, the cardiovascular data, and what the evidence honestly does and doesn't claim.",
    },
    {
      title: "Fresh versus frozen",
      description:
        "The surprising answer on which form has more nutrients — and why frozen is often the better daily choice.",
    },
    {
      title: "How to eat more of them",
      description:
        "Practical daily habits that don't require willpower — oats, yogurt, smoothies, and the portion size that actually shows up in studies.",
    },
    {
      title: "Blood sugar context",
      description:
        "Glycemic index, fiber, and why blueberries are one of the better fruit options for people managing glucose.",
    },
    {
      title: "One thing most people overlook",
      description:
        "Why rotating blueberries alongside other dark berries is more effective than going all-in on one food.",
    },
  ],
  sections: [
    {
      id: "anthocyanins",
      eyebrow: "What makes them different",
      title: "The color is the point",
      paragraphs: [
        "That deep blue-purple skin is not incidental. It comes from anthocyanins — a family of plant pigments that belong to the broader flavonoid group and happen to be among the most studied compounds in nutrition research. Blueberries are one of the most concentrated sources of anthocyanins in any food you can buy at a normal grocery store.",
        "What makes anthocyanins interesting is not just their antioxidant properties in the abstract sense. They are bioavailable enough to cross the blood-brain barrier, which is part of why so much of the research on blueberries points toward cognitive outcomes rather than just general inflammation markers. The pigment is doing something specific in the body, not just neutralizing free radicals in a petri dish.",
        "One practical note: the anthocyanin concentration is highest in the skin. Eating whole berries matters more than drinking blueberry juice, where most of the skin is removed or diluted.",
      ],
    },
    {
      id: "research",
      eyebrow: "The science",
      title: "What the research actually says",
      paragraphs: [
        "The brain research is the most compelling strand. A long-running study from the Harvard School of Public Health tracked dietary patterns in older adults and found that people who ate blueberries regularly showed slower rates of cognitive decline — equivalent to being up to two and a half years cognitively younger than peers who ate fewer berries. This held even when other lifestyle factors were controlled for.",
        "Cardiovascular findings have been consistent too. Several trials have shown modest but meaningful reductions in systolic blood pressure with regular blueberry consumption, particularly in people already in the elevated range. A 2019 study published in the American Journal of Clinical Nutrition found that one cup of blueberries per day over eight weeks improved arterial stiffness and reduced blood pressure in people with metabolic syndrome.",
        "The honest caveat: none of this is dramatic. Blueberries are not a treatment. The effects compound over time and work best as part of a broader dietary pattern. But that is also what makes them genuinely useful — the benefits are real, sustainable, and come without any meaningful downside.",
      ],
      callout: {
        label: "Key finding",
        text: "Regular blueberry consumption has been associated with cognitive aging that is up to 2.5 years slower than in peers with low berry intake — one of the more striking food-specific findings in long-term nutrition research.",
      },
    },
    {
      id: "fresh-vs-frozen",
      eyebrow: "Fresh versus frozen",
      title: "The answer might surprise you",
      paragraphs: [
        "Fresh blueberries win on texture. Frozen blueberries often win on nutrition.",
        "Commercial freezing typically happens within hours of harvest, before significant nutrient degradation has a chance to occur. Fresh berries in a supermarket may have traveled for days from farm to shelf and then sat in your fridge for several more. Studies comparing the two have sometimes found higher polyphenol levels in frozen samples.",
        "The bottom line: frozen blueberries are not a compromise. For most people, they are the more practical option and nutritionally at least as good as fresh for most purposes.",
      ],
      bullets: [
        "Frozen blueberries cost significantly less and are available year-round.",
        "They blend directly into smoothies and soften in warm oats without any prep.",
        "A bag lasts weeks in the freezer versus three to five days for fresh.",
        "Nutrient levels are often comparable or better than fresh berries that traveled and sat on a shelf.",
      ],
    },
    {
      id: "daily-habit",
      eyebrow: "Practical use",
      title: "How to actually eat more of them",
      paragraphs: [
        "The most durable nutritional habits are the ones that require the least willpower. Blueberries fit easily into a lot of existing routines without needing to change much.",
        "The target range from most of the clinical literature is somewhere between half a cup and a full cup per day — roughly 75 to 150 grams. That is less than it sounds once you start measuring it.",
      ],
      bullets: [
        "Oats: frozen blueberries dropped into warm oats soften in a few minutes and need zero extra prep.",
        "Yogurt: a handful of blueberries with Greek yogurt takes about thirty seconds and is genuinely satisfying.",
        "Smoothies: they blend without dominating, contribute color, and pair well with almost anything.",
        "As a snack: a small bowl with some almonds or walnuts is a reasonable afternoon option that doesn't involve any cooking.",
      ],
    },
    {
      id: "blood-sugar",
      eyebrow: "Glycemic context",
      title: "A note on blood sugar",
      paragraphs: [
        "Blueberries contain about 14 grams of sugar per 100 grams, which is on the lower-moderate end for fruit. Their glycemic index sits around 53, which is classified as low. The fiber content — around 2.4 grams per 100 grams — slows glucose absorption and makes the blood sugar response more gradual.",
        "For people managing blood sugar or following a lower-carbohydrate approach, a small daily portion of blueberries is generally well tolerated and a reasonable trade-off given the other benefits. They are a better choice than most sweet alternatives in that context.",
      ],
      cards: [
        {
          title: "Glycemic index: ~53",
          description:
            "Classified as low GI. The fiber slows absorption, making the glucose response gentler than most other sweet foods.",
        },
        {
          title: "Sugar: ~14g per 100g",
          description:
            "Lower-moderate for fruit. A half-cup serving (around 75g) contains roughly 10 grams of sugar with 1.8g of fiber.",
        },
        {
          title: "Fiber: ~2.4g per 100g",
          description:
            "A meaningful contributor to satiety and blood sugar modulation, especially when eating the whole berry.",
        },
        {
          title: "Calories: ~57 per 100g",
          description:
            "Low calorie density relative to the nutrient content — one of the more favorable ratios in everyday fruit.",
        },
      ],
    },
    {
      id: "variety",
      eyebrow: "The bigger picture",
      title: "One thing most people overlook",
      paragraphs: [
        "Eating exclusively blueberries every day is less effective than rotating them alongside other dark berries — blackberries, raspberries, strawberries — and building a broader eating pattern that prioritizes whole foods generally.",
        "Different berries have different flavonoid profiles. Mixing them gives you a wider range of compounds rather than doubling down on one. The reason blueberries are worth highlighting specifically is that they are an easy entry point into that broader habit: sweet enough to eat without preparation, available year-round in frozen form, and cheap enough to treat as a daily staple rather than an occasional treat.",
        "The goal is not to make blueberries the centerpiece of your diet. It is to add them to a pattern that already includes variety — and to stop overthinking a food that genuinely earns its reputation.",
      ],
    },
  ],
  faqs: [
    {
      question: "Are frozen blueberries as healthy as fresh?",
      answer:
        "Often yes, and sometimes better. Commercial freezing typically happens within hours of harvest, locking in nutrients before any degradation. Fresh blueberries in a supermarket may have traveled for days and then sat in your fridge. Studies comparing the two have sometimes found higher polyphenol levels in frozen samples. For daily use, frozen is an excellent option.",
    },
    {
      question: "How many blueberries should I eat per day?",
      answer:
        "Most of the studies that showed meaningful cognitive and cardiovascular effects used around half a cup to one cup per day — roughly 75 to 150 grams. That is a realistic daily amount, and much less than it sounds once you start adding them to oats or yogurt.",
    },
    {
      question: "Can blueberries actually help with brain health?",
      answer:
        "Research from Harvard and other institutions has found that regular blueberry consumption is associated with slower cognitive decline in older adults. The effect is attributed largely to anthocyanins, which cross the blood-brain barrier and reduce oxidative stress in neural tissue. These are associations in observational studies, not clinical treatments, but they are among the more consistent findings in long-term nutrition research.",
    },
    {
      question: "Are blueberries good for blood sugar?",
      answer:
        "Yes, relatively. Their glycemic index is around 53 (low), and the fiber content slows glucose absorption. They are one of the better fruit options for people managing blood sugar or following a lower-carbohydrate approach, especially in moderate portions.",
    },
  ],
  images: [
    "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/blueberries_1.jpg",
    "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/blueberries_2.jpg",
  ],
  relatedLinks: [
    {
      href: "/blog/why-ingredient-lists-are-hard-to-understand",
      title: "Why Ingredient Lists Are Hard to Understand",
      description:
        "A closer look at why food labels feel unreadable and what that means for your shopping decisions.",
    },
    {
      href: "/blog/allergy-ingredient-checker",
      title: "How to Check if a Product Is Safe for Your Allergy",
      description:
        "A practical guide to hidden allergens and safer shopping with personalized ingredient analysis.",
    },
    {
      href: "/ingredient-scanner-app",
      title: "Ingredient Scanner App",
      description:
        "See how Gud For Us turns hard-to-read labels into clearer, more personal decisions.",
    },
    {
      href: "/blog",
      title: "Gud For Us Blog",
      description:
        "Browse more nutrition guides, label-reading tips, and app comparisons.",
    },
  ],
};

export const metadata: Metadata = createLandingMetadata(page);

export default function BlueberriesSuperFoodPage() {
  return <SeoLandingPage page={page} />;
}
