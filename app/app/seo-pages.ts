import type { SeoLandingConfig } from "./components/seo-landing-page";

export const seoPages: Record<string, SeoLandingConfig> = {
  "ingredient-scanner-app": {
    slug: "ingredient-scanner-app",
    title: "Ingredient Scanner App",
    metaTitle:
      "Ingredient Scanner App | AI Ingredient Checker for Food Labels | Gud For Us",
    metaDescription:
      "Looking for an ingredient scanner app? Gud For Us scans food and cosmetic labels from photos, explains ingredients, shows a health score, calculates a compatibility score, and suggests better alternatives.",
    heroEyebrow: "Ingredient Scanner App",
    heroTitle:
      "An ingredient scanner app should do more than read a barcode.",
    heroDescription:
      "Gud For Us is built for people who want to scan ingredients from real product packaging, understand what those ingredients mean, get a health score, see a compatibility score based on their profile, and find better alternatives without bouncing between multiple tools.",
    targetQueries: [
      "ingredient scanner app",
      "AI ingredient scanner",
      "food ingredient scanner app",
      "ingredient checker app",
      "food label scanner app",
      "app to scan ingredients",
    ],
    heroHighlights: [
      {
        title: "Photo-first scanning",
        description:
          "Scan labels and packaging from photos instead of relying only on a barcode lookup.",
      },
      {
        title: "Health + compatibility context",
        description:
          "Get a broad health read and a more personal compatibility view based on your onboarding profile.",
      },
      {
        title: "Clear explanations",
        description:
          "Ingredient names, trade terms, and red flags are translated into language normal shoppers can use.",
      },
    ],
    sections: [
      {
        id: "what-people-mean",
        eyebrow: "What Shoppers Need",
        title: "What people usually mean when they search for an ingredient scanner app",
        paragraphs: [
          "Most people are not looking for a giant ingredient database by itself. They are looking for a faster way to answer a real question in the aisle: what is this product, what is inside it, and is it a good fit for me?",
          "That intent usually includes three needs at once. First, they want a practical scan flow that works in the real world. Second, they want an explanation, not just a cryptic rating. Third, they want enough personal context to know whether a product is merely average or actually worth buying.",
        ],
        bullets: [
          "A useful ingredient scanner has to work on the packaging people are actually holding.",
          "It should explain ingredients in plain language, not just assign a generic number.",
          "It becomes much more helpful when the result reflects the person scanning, not only the average shopper.",
        ],
      },
      {
        id: "what-gud-for-us-does",
        eyebrow: "Product Fit",
        title: "What Gud For Us is designed to show in a single scan",
        paragraphs: [
          "Gud For Us is meant to condense a messy product label into a decision-ready view. After a scan, the app can surface ingredient information, a health score, a compatibility score that reflects the user profile set during onboarding, and a better alternative when one is more suitable.",
          "That matters because many ingredient checker apps answer only one slice of the problem. Some are strong at identifying ingredients but weak on personal relevance. Others summarize a label but do not help the shopper compare or move toward a better option.",
        ],
        cards: [
          {
            title: "Ingredient breakdown",
            description:
              "The app highlights what is in the product so users are not left decoding unfamiliar label language by themselves.",
          },
          {
            title: "Health score",
            description:
              "A broad product-level score gives a quick sense of overall quality and potential concerns.",
          },
          {
            title: "Compatibility score",
            description:
              "The personal layer takes the user profile seriously instead of assuming one universal answer fits everyone.",
          },
          {
            title: "Better alternatives",
            description:
              "The scan does not end with a warning. It also points shoppers toward a stronger option when one exists.",
          },
        ],
      },
      {
        id: "why-photo-scanning",
        eyebrow: "Why This Category Exists",
        title: "Why photo-based ingredient scanning matters more than people think",
        paragraphs: [
          "A lot of ingredient-related frustration comes from the fact that real packaging is messy. Barcodes are missing, reflective, curved, or damaged. Ingredient panels are small, crowded, and often written in naming conventions most shoppers do not know. A scanner that only works when the barcode works is not solving the whole problem.",
          "Photo-based ingredient scanning moves the interaction closer to the actual decision point. Instead of asking whether a database entry exists, the app starts with the text that is physically on the package. That makes it more relevant when users are comparing products that have changed formulas, limited regional distribution, or difficult-to-read ingredient lists.",
        ],
        callout: {
          label: "When photo scanning matters most",
          text: "Photo-based scanning becomes most useful when the barcode is missing, damaged, curved, or the product simply is not in a database. If the packaging is reflective or hard to scan, photo-first apps give you an answer anyway.",
        },
      },
      {
        id: "who-this-is-for",
        eyebrow: "Use Cases",
        title: "Who benefits most from this kind of scanner",
        paragraphs: [
          "The most obvious users are people comparing packaged food in grocery stores. But the same scanning behavior matters for parents checking snack ingredients, people re-checking products after a reformulation, and shoppers who want the same workflow for both food and cosmetics.",
          "In practice, the strongest ingredient scanner app is usually the one that reduces decision fatigue. It gives enough information to move forward with confidence instead of forcing the user to open six browser tabs and piece the answer together manually.",
        ],
        cards: [
          {
            title: "Grocery shoppers",
            description:
              "People comparing two similar products and trying to decide which one is the better fit right now.",
          },
          {
            title: "Health-conscious households",
            description:
              "Families trying to reduce friction around repeat buying, ingredient checking, and better swaps.",
          },
          {
            title: "People with sensitivities",
            description:
              "Users who need more context because a generic label score is not enough for their decisions.",
          },
          {
            title: "Cross-category shoppers",
            description:
              "Anyone who wants one scanning flow for pantry items, supplements, and cosmetic products.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between an ingredient scanner app and a barcode scanner app?",
        answer:
          "A barcode scanner app mainly looks up a stored product record. An ingredient scanner app is broader: it helps interpret the label itself, often from packaging text or photos, and turns that into a more useful product explanation.",
      },
      {
        question: "Can Gud For Us scan both food and cosmetic products?",
        answer:
          "Yes. Gud For Us is positioned around both food and cosmetics so people do not need a separate workflow for every type of consumable or topical product they are evaluating.",
      },
      {
        question: "Why would someone want both a health score and a compatibility score?",
        answer:
          "The health score gives a broader product-level view. The compatibility score helps answer a more personal question: how well does this product fit the profile and priorities the user provided during onboarding?",
      },
      {
        question: "What makes an ingredient checker app actually useful in practice?",
        answer:
          "It has to work quickly, explain ingredients clearly, and help users move toward a decision. In other words, it should reduce confusion, not just label it.",
      },
    ],
    relatedLinks: [
      {
        href: "/app/allergy-ingredient-scanner",
        title: "Allergy Ingredient Scanner",
        description:
          "For users who need personal safety context, not just a general product read.",
      },
      {
        href: "/app/cosmetic-ingredient-scanner",
        title: "Cosmetic Ingredient Scanner",
        description:
          "A page focused on skincare, beauty labels, and cosmetic ingredient checking.",
      },
      {
        href: "/app/yuka-alternative",
        title: "Yuka Alternative",
        description:
          "A comparison page for users explicitly searching for alternatives to barcode-first apps.",
      },
      {
        href: "/app/how-to-scan-food-ingredients",
        title: "How To Scan Food Ingredients",
        description:
          "A practical guide for people who are still trying to understand the workflow itself.",
      },
    ],
  },
  "allergy-ingredient-scanner": {
    slug: "allergy-ingredient-scanner",
    title: "Allergy Ingredient Scanner",
    metaTitle:
      "Allergy Ingredient Scanner | Personalized Food Scanning for Allergies | Gud For Us",
    metaDescription:
      "Need an allergy ingredient scanner? Gud For Us helps users scan food labels, understand ingredient names, view a compatibility score based on their profile, and compare safer alternatives with more context.",
    heroEyebrow: "Allergy Ingredient Scanner",
    heroTitle:
      "Allergy ingredient scanning only becomes useful when it is personal.",
    heroDescription:
      "For shoppers with allergies or sensitivities, a generic product score is rarely enough. Gud For Us is designed around the idea that ingredient safety depends on the person scanning, not just the product being scanned.",
    targetQueries: [
      "allergy ingredient scanner",
      "ingredient scanner for allergies",
      "food scanner for allergies",
      "personalized ingredient scanner",
      "compatibility score food app",
    ],
    heroHighlights: [
      {
        title: "Profile-aware scanning",
        description:
          "The compatibility layer is intended to reflect the user profile created during onboarding.",
      },
      {
        title: "Ingredient language help",
        description:
          "Confusing label terms are easier to evaluate when the app explains what they mean in context.",
      },
      {
        title: "Safer comparison flow",
        description:
          "Users can move from an uncertain product toward a better alternative instead of stopping at a warning.",
      },
    ],
    sections: [
      {
        id: "why-generic-fails",
        eyebrow: "Why Generic Fails",
        title: "Why generic food scores fail people shopping with allergies",
        paragraphs: [
          "A generic label score can still be useless for someone with a personal risk profile. A product that looks acceptable to the average shopper may be the wrong choice for someone who is trying to avoid a specific ingredient family, derivative, or sensitivity trigger.",
          "That is why allergy-related ingredient searches are different from broad wellness searches. The user is usually not asking whether a product looks healthy in general. They are asking whether it is likely to be a smart decision for them, right now, with their own constraints in mind.",
        ],
        bullets: [
          "The more personal the risk, the less useful a one-size-fits-all verdict becomes.",
          "Ingredient naming conventions can hide what matters from people who are scanning quickly in stores.",
          "Better allergy-oriented product scanning should reduce uncertainty, not only summarize labels.",
        ],
      },
      {
        id: "what-personalized-means",
        eyebrow: "Product Logic",
        title: "What a personalized ingredient scanner is actually supposed to do",
        paragraphs: [
          "A personalized ingredient scanner should not simply read a label. It should interpret that label against the information the user has already provided. In Gud For Us, that personal layer is represented through onboarding inputs and a compatibility score that gives the result more individual context.",
          "This does not replace reading packaging carefully or following professional advice for serious health decisions. But it does make the product decision process more informed, especially when users are trying to compare unfamiliar items under time pressure.",
        ],
        cards: [
          {
            title: "Interpret ingredients in context",
            description:
              "The value is not only seeing a term on the label but understanding whether it deserves closer attention for that user.",
          },
          {
            title: "Separate broad quality from personal fit",
            description:
              "A product can score reasonably well in general and still be a poor fit for someone with specific concerns.",
          },
          {
            title: "Encourage better replacements",
            description:
              "Better alternative suggestions matter because allergy-related shopping decisions often need a fallback, not just a stop sign.",
          },
          {
            title: "Support repeat use",
            description:
              "The more personal and practical the result, the more likely users are to rely on the app as part of their regular routine.",
          },
        ],
      },
      {
        id: "where-compatibility-helps",
        eyebrow: "Compatibility Score",
        title: "Why a compatibility score can matter more than a general health score",
        paragraphs: [
          "When people search for a compatibility score food app, they are usually describing a gap in the market. They are looking for something that says more than whether a product is broadly acceptable. They want a result that reflects how the product lines up with their own profile, tolerances, or objectives.",
          "That is where the distinction between health score and compatibility score becomes useful. The health score helps summarize the product. The compatibility score is meant to summarize the match between product and person.",
        ],
        callout: {
          label: "Important boundary",
          text: "A compatibility score can make product evaluation more personal and more useful, but it should still be treated as guidance rather than a medical or diagnostic conclusion.",
        },
      },
      {
        id: "when-this-page-is-right",
        eyebrow: "Best Fit",
        title: "When this page is the right starting point",
        paragraphs: [
          "This page is the right destination for users who already know they need a more personal kind of ingredient scanning. They may be comparing tools for allergy-aware shopping, looking for a compatibility-based product check, or trying to understand how a personal scoring model differs from standard label apps.",
          "If the main problem is not allergies specifically but reading product labels in general, the broader ingredient-scanner and food-label pages are usually a better starting point. If the user is comparing Gud For Us directly to Yuka, the comparison page is a better match.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is an allergy ingredient scanner supposed to help with?",
        answer:
          "At minimum, it should help users interpret labels faster and more confidently. The strongest versions also add personal context so the result is not only about the product but about whether that product looks like a fit for the user scanning it.",
      },
      {
        question: "How is a compatibility score different from a regular ingredient rating?",
        answer:
          "A regular rating summarizes the product itself. A compatibility score is meant to reflect how the product lines up with the user profile collected during onboarding, which makes the result more individualized.",
      },
      {
        question: "Can Gud For Us replace professional allergy advice?",
        answer:
          "No. It is best understood as a decision-support tool that helps shoppers interpret labels and compare products with more context. Serious allergy management still requires careful packaging review and professional guidance.",
      },
      {
        question: "Why do people search for a personalized ingredient scanner instead of a normal one?",
        answer:
          "Because generic scores often leave out the part that matters most: whether the product is a fit for that specific shopper, not just the average consumer.",
      },
    ],
    relatedLinks: [
      {
        href: "/app/check-ingredients-for-allergies",
        title: "Check Ingredients For Allergies",
        description:
          "An educational page for users who are still learning how to evaluate labels safely.",
      },
      {
        href: "/app/ingredient-scanner-app",
        title: "Ingredient Scanner App",
        description:
          "The broader commercial page for food label scanning and ingredient checking.",
      },
      {
        href: "/app/how-to-scan-food-ingredients",
        title: "How To Scan Food Ingredients",
        description:
          "A practical guide to scanning, reading, and comparing food labels more effectively.",
      },
      {
        href: "/app/blog/allergy-ingredient-checker",
        title: "Allergy Blog Guide",
        description:
          "A deeper long-form article on hidden allergen names and label-reading traps.",
      },
    ],
  },
  "cosmetic-ingredient-scanner": {
    slug: "cosmetic-ingredient-scanner",
    title: "Cosmetic Ingredient Scanner",
    metaTitle:
      "Cosmetic Ingredient Scanner | Beauty & Skincare Ingredient Checker App | Gud For Us",
    metaDescription:
      "Looking for a cosmetic ingredient scanner? Gud For Us helps users scan beauty and skincare products, view ingredient details, get a health score, see a compatibility score, and compare better alternatives.",
    heroEyebrow: "Cosmetic Ingredient Scanner",
    heroTitle:
      "Cosmetic ingredient scanning should help with clarity, not just ingredient overload.",
    heroDescription:
      "Beauty and skincare labels can feel even less readable than food packaging. Gud For Us is built to help users scan cosmetic products, understand what is in them, see how the product looks from a broad health and personal compatibility perspective, and compare better options more quickly.",
    targetQueries: [
      "cosmetic ingredient scanner",
      "beauty ingredient checker app",
      "skincare ingredient scanner",
      "app to scan cosmetic ingredients",
    ],
    heroHighlights: [
      {
        title: "Beauty-focused scanning use case",
        description:
          "Built for shoppers trying to compare creams, serums, cleansers, and other everyday cosmetic products.",
      },
      {
        title: "Less label decoding",
        description:
          "Helps reduce the friction of navigating dense cosmetic ingredient lists and unfamiliar naming systems.",
      },
      {
        title: "Comparison mindset",
        description:
          "The goal is not only to flag a concern but to help users move toward a better-fitting alternative.",
      },
    ],
    sections: [
      {
        id: "why-cosmetic-labels-are-hard",
        eyebrow: "Why Labels Are Hard",
        title: "Why cosmetic ingredient scanner searches are growing",
        paragraphs: [
          "Cosmetic labels are crowded, technical, and often written in naming systems that most shoppers do not recognize. That makes the gap between curiosity and confidence surprisingly large. Many users can tell when a product sounds complicated, but they cannot tell whether the complexity is harmless, meaningful, or worth caring about.",
          "This is why beauty ingredient checker searches are different from broad beauty searches. People are not just browsing for inspiration. They are trying to reduce uncertainty before putting something on their skin.",
        ],
      },
      {
        id: "what-people-want",
        eyebrow: "User Intent",
        title: "What people want from a beauty ingredient checker app",
        paragraphs: [
          "Most users want a quicker way to move from a long INCI-style ingredient list to a product decision they can live with. They want to understand what matters, what looks normal, what might be worth checking more closely, and whether another product might be a better match.",
          "That makes cosmetic ingredient scanning partly an interpretation problem and partly a comparison problem. A useful app needs to do both.",
        ],
        cards: [
          {
            title: "Scan and decode",
            description:
              "Users want help translating ingredient names that would otherwise remain unread or misunderstood.",
          },
          {
            title: "Fit the product to the person",
            description:
              "A compatibility score becomes valuable when shoppers care about their own profile, not just a generic list score.",
          },
          {
            title: "Avoid dead ends",
            description:
              "If a product does not look ideal, the next question is almost always what to try instead.",
          },
          {
            title: "Use the same app across categories",
            description:
              "One reason Gud For Us can stand out is that it treats food and cosmetics as part of a broader ingredient-awareness workflow.",
          },
        ],
      },
      {
        id: "where-gud-for-us-fits",
        eyebrow: "Product Fit",
        title: "How Gud For Us fits into cosmetic ingredient checking",
        paragraphs: [
          "Gud For Us is relevant here because the same core scanning logic applies outside food. Users can scan a cosmetic product, review what is inside it, see a health score, review a compatibility score tied to their onboarding inputs, and use the result as a faster way to compare products on the shelf.",
          "That does not mean every cosmetic decision becomes simple. But it does mean the app can reduce the amount of manual label research users have to do before they decide whether a product deserves a closer look or a pass.",
        ],
        callout: {
          label: "Food and cosmetics in one scan",
          text: "One reason Gud For Us is useful across both skincare and food is that the ingredient-awareness habit is the same: you are asking what is actually in this product whether you are holding a serum or a snack bar.",
        },
      },
      {
        id: "best-use-cases",
        eyebrow: "Use Cases",
        title: "The strongest use cases for a cosmetic scanner",
        paragraphs: [
          "Cosmetic scanning is especially useful when shoppers are choosing between similar products that make similar claims. Ingredient complexity becomes more frustrating when the packaging looks polished but the label tells an unclear story.",
          "A scanner adds the most value when the user wants to compare quickly, avoid buying something that feels misaligned, and keep the same evaluation habit across skincare, haircare, and broader personal-care shopping.",
        ],
        bullets: [
          "Comparing two similar serums with very different ingredient philosophies",
          "Re-checking a familiar product after a formula change or packaging refresh",
          "Trying to understand whether a beauty product is worth the price relative to what is actually inside it",
          "Keeping one scanner workflow for pantry products and bathroom products instead of using separate apps",
        ],
      },
    ],
    faqs: [
      {
        question: "What is a cosmetic ingredient scanner meant to solve?",
        answer:
          "It helps people move from an unreadable cosmetic label to a faster, more confident product decision. That includes ingredient understanding, broad product evaluation, and comparison support.",
      },
      {
        question: "Can Gud For Us be used for skincare products as well as food?",
        answer:
          "Yes. Gud For Us is described around both food and cosmetics, which makes it useful for people who want one ingredient-awareness workflow across multiple product types.",
      },
      {
        question: "Why would someone want a compatibility score on a cosmetic product?",
        answer:
          "Because cosmetic shopping is often personal. A broad score tells one story, but a compatibility score is meant to reflect how the product lines up with the shopper’s own profile and concerns.",
      },
      {
        question: "Is this page different from the main ingredient scanner page?",
        answer:
          "Yes. The main page is broader. This page exists specifically to target cosmetic, beauty, and skincare ingredient-scanning intent without making those users dig through a food-first explanation.",
      },
    ],
    relatedLinks: [
      {
        href: "/app/ingredient-scanner-app",
        title: "Ingredient Scanner App",
        description:
          "The broad category page that covers food labels, ingredient checking, and overall scanner intent.",
      },
      {
        href: "/app/yuka-alternative",
        title: "Yuka Alternative",
        description:
          "Useful for comparison shoppers evaluating Gud For Us against existing barcode-driven apps.",
      },
      {
        href: "/app/blog/best-yuka-alternative",
        title: "Yuka Alternative Blog",
        description:
          "A longer-form comparison article with more context on database-first vs photo-first tools.",
      },
      {
        href: "/app/how-to-scan-food-ingredients",
        title: "How To Scan Food Ingredients",
        description:
          "A related educational page that explains the scanning mindset from the food side.",
      },
    ],
  },
  "yuka-alternative": {
    slug: "yuka-alternative",
    title: "Yuka Alternative",
    metaTitle:
      "Yuka Alternative | A More Personal Ingredient Scanning App | Gud For Us",
    metaDescription:
      "Looking for a Yuka alternative? Gud For Us offers photo-based scanning, ingredient explanations, a health score, a compatibility score based on your profile, and alternative suggestions across food and cosmetics.",
    heroEyebrow: "Yuka Alternative",
    heroTitle: "A good Yuka alternative should feel more personal, not just more technical.",
    heroDescription:
      "People searching for apps like Yuka are usually not looking for a random list of competitors. They are looking for a better fit: faster scanning, clearer explanations, broader product support, or more personal context than a generic barcode score can offer.",
    targetQueries: [
      "Yuka alternative",
      "best Yuka alternative",
      "apps like Yuka",
      "better than Yuka",
    ],
    heroHighlights: [
      {
        title: "Alternative to barcode-only thinking",
        description:
          "The product story here is less about replacing one score with another and more about shifting toward photo-first, context-aware scanning.",
      },
      {
        title: "Personal context",
        description:
          "Gud For Us is framed around a compatibility layer, which helps differentiate it from generic product scoring.",
      },
      {
        title: "Food and cosmetics",
        description:
          "Comparison shoppers often want one app that covers multiple shelves, not multiple disconnected tools.",
      },
    ],
    sections: [
      {
        id: "why-people-search",
        eyebrow: "What Shoppers Want",
        title: "Why people search for a Yuka alternative in the first place",
        paragraphs: [
          "Most comparison searches begin with mild dissatisfaction, not abandonment. The user already understands the category. What they are really saying is that the current workflow is not quite enough. Maybe the barcode scan is too rigid. Maybe the score feels too generic. Maybe they want better product explanations or more personal relevance.",
          "That makes Yuka alternative intent one of the clearest commercial opportunities on the site. The searcher already knows they want a solution. The only open question is what kind of improvement matters most to them.",
        ],
      },
      {
        id: "where-gud-for-us-differs",
        eyebrow: "Positioning",
        title: "Where Gud For Us can feel meaningfully different",
        paragraphs: [
          "Gud For Us is most differentiated when it is presented as a more context-aware ingredient scanner rather than just another rating app. The key differences are the photo-based scanning flow, the use of a health score alongside a compatibility score, and the push toward better alternatives rather than stopping at a generic verdict.",
          "For people who feel that existing barcode apps flatten every product into a number for the average shopper, that positioning can be easier to understand than a long feature checklist.",
        ],
        cards: [
          {
            title: "Photo-based scanning",
            description:
              "Starts from the packaging the user is holding rather than only from a product record stored elsewhere.",
          },
          {
            title: "Compatibility context",
            description:
              "Adds a personal layer instead of treating every shopper as interchangeable.",
          },
          {
            title: "Food and cosmetic support",
            description:
              "Useful for users who want one scanning habit across grocery and beauty purchases.",
          },
          {
            title: "Better alternatives",
            description:
              "Turns a disappointing product result into a next-step decision rather than a dead end.",
          },
        ],
      },
      {
        id: "what-best-means",
        eyebrow: "Finding Your Best Fit",
        title: "What makes something the best Yuka alternative for a specific user",
        paragraphs: [
          "There is no single best alternative for everyone. The best fit depends on why the current tool is falling short. If the problem is speed and shelf friction, photo scanning matters. If the problem is generic scoring, compatibility context matters. If the problem is category coverage, food-and-cosmetic support matters.",
          "That is why this page is structured around use-case differences instead of trying to win the comparison through empty superlatives. A useful comparison page should help the user self-identify their priority and then see whether the product fits it.",
        ],
      },
      {
        id: "who-should-land-here",
        eyebrow: "Best Fit",
        title: "Who should start here instead of the main app page",
        paragraphs: [
          "This page is for users who are already in comparison mode. They know the kind of app they want. They are simply testing whether Gud For Us is a better fit than the tool they already know.",
          "If someone is still trying to understand what an ingredient scanner app is, the broader ingredient-scanner page is better. If they specifically care about allergy-aware scanning, the allergy page is more relevant. But if they arrive with Yuka in mind, this page should meet them there directly.",
        ],
        callout: {
          label: "Want a deeper comparison?",
          text: "The full Yuka comparison article covers more ground: side-by-side feature breakdowns, regional use cases, and more detail on what makes each approach different. This page is the shorter, faster answer.",
        },
      },
    ],
    faqs: [
      {
        question: "What is the main difference between Gud For Us and Yuka-style apps?",
        answer:
          "The clearest difference is the emphasis on photo-first scanning and personal compatibility context rather than only a generic product score tied to a barcode lookup.",
      },
      {
        question: "Why would someone search for apps like Yuka?",
        answer:
          "Usually because they like the category but want a tool that feels more flexible, more explanatory, or more personal than the one they already know.",
      },
      {
        question: "Is Gud For Us only for food products?",
        answer:
          "No. Part of the pitch is that Gud For Us covers both food and cosmetics, which broadens the value of the scanner beyond a single aisle.",
      },
      {
        question: "Should this page replace the blog comparison article?",
        answer:
          "No. The blog article goes deeper on how each app works, regional use cases, and the differences between photo-first and barcode-first approaches. This page is a faster overview for shoppers who want to compare options quickly and move on.",
      },
    ],
    relatedLinks: [
      {
        href: "/app/blog/best-yuka-alternative",
        title: "Read the full comparison article",
        description:
          "A longer-form version for users who want more context before deciding.",
      },
      {
        href: "/app/ingredient-scanner-app",
        title: "Ingredient Scanner App",
        description:
          "The broader category page for general scanner and ingredient-checker intent.",
      },
      {
        href: "/app/allergy-ingredient-scanner",
        title: "Allergy Ingredient Scanner",
        description:
          "For comparison shoppers who care specifically about personal safety context.",
      },
      {
        href: "/app/cosmetic-ingredient-scanner",
        title: "Cosmetic Ingredient Scanner",
        description:
          "For users comparing scanners through a beauty or skincare use case.",
      },
    ],
  },
  "how-to-scan-food-ingredients": {
    slug: "how-to-scan-food-ingredients",
    title: "How To Scan Food Ingredients",
    metaTitle:
      "How To Scan Food Ingredients | A Practical Guide to Reading Labels Faster | Gud For Us",
    metaDescription:
      "Learn how to scan food ingredients more effectively, what to look for on real labels, why ingredient lists are hard to interpret, and how Gud For Us helps turn confusing packaging into a clearer decision.",
    heroEyebrow: "Food Label Guide",
    heroTitle:
      "How to scan food ingredients without turning every shopping trip into research.",
    heroDescription:
      "People asking how to scan food ingredients are usually stuck between two problems: labels are hard to read, and the process of checking them manually is too slow. This page explains what to look for, where scanners help, and how Gud For Us fits into that workflow.",
    targetQueries: [
      "how to scan food ingredients",
      "why ingredient lists are hard to understand",
      "food ingredient guide",
      "how to read food labels faster",
    ],
    heroHighlights: [
      {
        title: "Practical workflow",
        description:
          "Designed around real shopping decisions, not perfect textbook conditions.",
      },
      {
        title: "Label-language help",
        description:
          "Acknowledges that ingredient lists are dense, technical, and frequently optimized for compliance rather than readability.",
      },
      {
        title: "Bridge to product use",
        description:
          "Connects the educational explanation back to Gud For Us as a scanning tool, not just an abstract idea.",
      },
    ],
    sections: [
      {
        id: "why-labels-feel-hard",
        eyebrow: "Why Labels Feel Hard",
        title: "Why ingredient lists feel harder to scan than they should",
        paragraphs: [
          "Ingredient panels are not written for speed. They are written to satisfy labeling requirements, fit into small packaging spaces, and stay consistent across manufacturers. That creates a reading experience that feels technical even when the underlying ingredient is familiar.",
          "This is one reason people search for tools rather than just trying harder to read the label. The problem is not laziness. The problem is that modern packaging puts a lot of decision-making burden on the shopper in very little time.",
        ],
      },
      {
        id: "what-to-look-for",
        eyebrow: "Practical Guide",
        title: "What to look for when scanning food ingredients by hand",
        paragraphs: [
          "The first step is not to understand every ingredient perfectly. It is to reduce the label into decision-relevant signals. Start with the ingredient list itself, then look for naming patterns, repeated sweeteners, unfamiliar oils, and anything that matters to your own profile or goals.",
          "From there, ask a smaller set of questions: what is this product mostly made of, which ingredients are unfamiliar, and does anything here conflict with what I personally try to avoid or prioritize?",
        ],
        bullets: [
          "Look at the ingredient list before you get lost in front-of-pack marketing claims.",
          "Pay attention to the first few ingredients because they usually set the tone of the product.",
          "Flag terms you do not recognize and ask whether the issue is harmless unfamiliarity or something worth checking more closely.",
          "Re-check repeat purchases because formulas can change quietly over time.",
        ],
      },
      {
        id: "where-scanners-help",
        eyebrow: "Where Tools Matter",
        title: "Where an ingredient scanner becomes more useful than manual reading",
        paragraphs: [
          "Manual reading works best when the product is simple, the label is readable, and the user already knows what they care about. A scanner becomes more valuable when any of those conditions breaks down: the text is too dense, the naming conventions are too technical, or the user wants help translating the result into a decision.",
          "Gud For Us fits at that point of friction. It gives users a way to scan the product, understand ingredients faster, review a health score, see a compatibility score connected to their profile, and compare alternatives without turning the shopping trip into a research project.",
        ],
        callout: {
          label: "A practical rule of thumb",
          text: "Read the ingredient list before the front label. Front-of-pack claims are marketing. The ingredient list is the actual product — and it is worth checking more often than most people do.",
        },
      },
      {
        id: "how-gud-for-us-fits",
        eyebrow: "Product Fit",
        title: "How Gud For Us fits into this workflow",
        paragraphs: [
          "Gud For Us is not just a label scanner in the narrow sense. The value is that the scan leads to interpretation. Users can move from packaging text to ingredient context, then from ingredient context to a health score, a compatibility score, and a better-alternative suggestion when a stronger option exists.",
          "That makes the app relevant not only for people who want to scan more often, but for people who are tired of doing the same mental work over and over again without enough clarity to justify the effort.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the fastest way to scan food ingredients when shopping?",
        answer:
          "The fastest practical approach is to focus on the ingredient list first, identify unfamiliar or priority ingredients, and use a scanner when the label is too dense or too technical to evaluate quickly by hand.",
      },
      {
        question: "Why are ingredient lists so hard to understand?",
        answer:
          "Because they are often written for compliance, consistency, and packaging efficiency rather than for consumer readability. That means technical naming, crowded layouts, and a lot of context left unstated.",
      },
      {
        question: "When does an ingredient scanner app help more than reading the label yourself?",
        answer:
          "It helps most when the label is hard to read, the terms are unfamiliar, or the user wants a faster explanation tied to their own goals or profile rather than a raw list of ingredients.",
      },
      {
        question: "How does Gud For Us help with food ingredient scanning?",
        answer:
          "Gud For Us combines scanning with interpretation. It helps users move from the product label to ingredient understanding, health context, compatibility context, and possible alternatives in one flow.",
      },
    ],
    relatedLinks: [
      {
        href: "/app/ingredient-scanner-app",
        title: "Ingredient Scanner App",
        description:
          "The broader commercial page for scanner-related product intent.",
      },
      {
        href: "/app/check-ingredients-for-allergies",
        title: "Check Ingredients For Allergies",
        description:
          "A related educational page for people whose label-reading problem is tied to allergy risk.",
      },
      {
        href: "/app/blog/why-ingredient-lists-are-hard-to-understand",
        title: "Ingredient Labels Blog",
        description:
          "A longer educational article focused on why ingredient lists feel unreadable in the first place.",
      },
      {
        href: "/app/blog/allergy-ingredient-checker",
        title: "Allergy Label Blog",
        description:
          "A deeper article on hidden allergen names and ingredient-reading traps.",
      },
    ],
  },
  "check-ingredients-for-allergies": {
    slug: "check-ingredients-for-allergies",
    title: "Check Ingredients For Allergies",
    metaTitle:
      "How To Check Ingredients For Allergies | Know If Ingredients Are Safe For You | Gud For Us",
    metaDescription:
      "Learn how to check ingredients for allergies, how to know if ingredients are safe for you, and where Gud For Us helps by scanning labels, interpreting ingredients, and surfacing compatibility context.",
    heroEyebrow: "Allergy Safety Guide",
    heroTitle:
      "Checking ingredients for allergies is not just about reading faster. It is about reading with the right context.",
    heroDescription:
      "People searching how to check ingredients for allergies or how to know if ingredients are safe for them are usually trying to reduce uncertainty under pressure. This page explains that process clearly and shows where Gud For Us can make it easier.",
    targetQueries: [
      "how to check ingredients for allergies",
      "how to know if ingredients are safe for me",
      "ingredient safety guide",
      "allergy label checking",
    ],
    heroHighlights: [
      {
        title: "Built around personal relevance",
        description:
          "The most important question is not whether a product looks broadly fine but whether it fits the person who is about to buy it.",
      },
      {
        title: "Good for high-friction labels",
        description:
          "Especially useful when ingredient names, packaging, and shelf pressure make manual checking harder.",
      },
      {
        title: "Connected to the app flow",
        description:
          "This page explains the problem in educational terms while still pointing users toward Gud For Us as the practical tool.",
      },
    ],
    sections: [
      {
        id: "what-safe-for-me-means",
        eyebrow: "Core Idea",
        title: "Why safe for me is a harder question than safe in general",
        paragraphs: [
          "A product can be broadly acceptable for the average consumer and still be the wrong choice for a specific person. That is why searches like how to know if ingredients are safe for me matter so much. The searcher is not asking for a general product rating. They are asking for a judgment that takes their own reality seriously.",
          "That shift from general quality to personal fit is exactly where many shoppers hit a wall. Labels do not tell the whole story in plain language, and product scores often flatten important differences into one number.",
        ],
      },
      {
        id: "practical-checking-process",
        eyebrow: "Practical Process",
        title: "A better process for checking ingredients when allergies are involved",
        paragraphs: [
          "The first move is to slow down long enough to identify the actual ingredient list, not just the front-of-pack claims. Then the task becomes narrower: find the terms that matter, look for alternative names, watch for reformulations, and do not treat familiarity as proof that the product is unchanged or safe.",
          "This is exactly where digital tools can reduce mental load. A scanner can help users extract the label faster and compare the result against what matters to them, rather than expecting them to decode every ingredient from memory.",
        ],
        bullets: [
          "Check the ingredient list itself, not only the product name or package design.",
          "Treat unfamiliar names seriously enough to verify them instead of guessing.",
          "Re-check products you have bought before because formula changes happen.",
          "Use tools that help connect the label to your own profile rather than only to a universal score.",
        ],
      },
      {
        id: "where-gud-for-us-helps",
        eyebrow: "Product Fit",
        title: "Where Gud For Us helps when the question is personal safety",
        paragraphs: [
          "Gud For Us is useful in this context because it connects label scanning to interpretation and then to personal relevance. Instead of stopping at the ingredient list, the app can help users review the product through a health score, a compatibility score shaped by onboarding inputs, and a better-alternative path if the product does not look like the best fit.",
          "That does not turn the app into a substitute for professional advice or the physical package. What it does is make the checking process more practical, especially for people who are tired of doing difficult label work manually every time they shop.",
        ],
      },
      {
        id: "how-this-differs",
        eyebrow: "How These Pages Differ",
        title: "Why this page is different from the allergy scanner page",
        paragraphs: [
          "The allergy ingredient scanner page is more commercial. It is for people already shopping for a product category. This page is more educational. It is for people who are still figuring out the workflow, the question, and what kind of tool would actually help them.",
          "Both pages matter because they answer different intent. One captures users who want a solution now. The other captures users who are trying to understand the problem clearly enough to trust a solution.",
        ],
        callout: {
          label: "Not sure which page to start with?",
          text: "If you already know you want an allergy-focused scanner, the allergy scanner page is a faster starting point. This page is better if you are still figuring out the process and what kind of tool would actually help.",
        },
      },
    ],
    faqs: [
      {
        question: "How do I check if ingredients are safe for me?",
        answer:
          "Start with the ingredient list, identify what matters to your own situation, verify unfamiliar terms, and use tools that help connect label information to your personal profile instead of relying only on a universal score.",
      },
      {
        question: "What is the biggest mistake people make when checking labels for allergies?",
        answer:
          "The most common mistake is assuming that a familiar product, a clean-looking package, or a decent general score means the product is automatically a fit for them personally.",
      },
      {
        question: "Where does Gud For Us help in this process?",
        answer:
          "Gud For Us helps by turning the scan into an explanation. It gives users ingredient context, a health score, a compatibility score connected to their profile, and a better-alternative path when the current option looks weak.",
      },
      {
        question: "Should I trust an app more than the physical package?",
        answer:
          "No. The physical package remains essential. A good app is most valuable when it helps you interpret and compare what you are seeing, not when it replaces careful review of the actual label.",
      },
    ],
    relatedLinks: [
      {
        href: "/app/allergy-ingredient-scanner",
        title: "Allergy Ingredient Scanner",
        description:
          "The more product-focused page for users who already know they want an allergy-aware scanner.",
      },
      {
        href: "/app/how-to-scan-food-ingredients",
        title: "How To Scan Food Ingredients",
        description:
          "A related guide on building a faster label-reading and scanning workflow.",
      },
      {
        href: "/app/blog/allergy-ingredient-checker",
        title: "Allergy Blog Guide",
        description:
          "A deeper long-form article on hidden allergen names and labeling traps.",
      },
      {
        href: "/app/blog/why-ingredient-lists-are-hard-to-understand",
        title: "Ingredient Labels Blog",
        description:
          "A companion article on why product labels feel harder to interpret than they should.",
      },
    ],
  },
};

export function isSeoPage(slug: string) {
  return slug in seoPages;
}
