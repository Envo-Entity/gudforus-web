"use client";
import dynamic from "next/dynamic";
const Stories = dynamic(() => import("react-insta-stories"), { ssr: false });

export default function Story() {
  return (
    <section id="story" className="relative border-t border-foreground/20">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <StoryCopy />
          <StoryVisual />
        </div>
      </div>
    </section>
  );
}

function StoryCopy() {
  return (
    <div>
      <h2
        className="text-2xl sm:text-3xl text-foreground tracking-tight font-semibold"
        style={{
          fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
        }}
      >
        Our Story
      </h2>
      <p className="mt-1 text-sm uppercase tracking-[0.28em] text-foreground">
        Born from a Need for Clarity
      </p>
      <div
        className="mt-6 space-y-4 text-foreground text-[15px]"
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
      >
        <p>
          In an age of endless information and constant disruption, we found
          ourselves searching for what truly matters. The noise was
          overwhelming, but beneath it all, certain truths remained constant.
        </p>
        <p>
          GoodForus emerged from this search — a guide to help others navigate
          modern life while staying rooted in timeless principles. Health,
          nature, and sustainability aren't trends. They're the foundations of a
          life well-lived.
        </p>
        <p>
          This is more than an ebook. It's a movement toward conscious living,
          supported by design, grounded in facts, and inspired by the wisdom of
          nature.
        </p>
      </div>
    </div>
  );
}

function StoryVisual() {
  const stories = [
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story1.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story2.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story3.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story4.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story5.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story6.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story7.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story8.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story9.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story10.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story11.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story12.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story13.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story14.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story15.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story16.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story17.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story18.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story19.webp",
      duration: 3000,
    },
    {
      url: "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/story20.webp",
      duration: 3000,
    },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-12 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(99,102,241,0.25),transparent_60%)] blur-3xl opacity-30"></div>
      <div className="relative mx-auto w-full max-w-md aspect-4/5 rounded-[28px] overflow-hidden ring-1 ring-foreground/20 bg-background/60">
        <Stories
          key={JSON.stringify(stories)}
          loop
          keyboardNavigation
          defaultInterval={3000}
          stories={stories}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
