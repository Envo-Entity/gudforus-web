export default function Pillars() {
  return (
    <section id="cards" className="relative border-t border-foreground/20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader />
        <CardGrid />
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="mb-5 flex items-end justify-between pt-10">
      <h2
        className="text-2xl sm:text-3xl text-foreground tracking-tight font-semibold"
        style={{
          fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
        }}
      >
        Explore the pillars
      </h2>
    </div>
  );
}

function CardGrid() {
  const cards = [
    {
      image:
        "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/health.jpg",
      title: "🌱 Health",
      description:
        "The foundation of all we do. Without it, nothing else matters.",
      gradient: "from-emerald-400/10 via-transparent to-indigo-400/10",
      glow: "bg-[conic-gradient(from_0deg,rgba(16,185,129,0.10),rgba(99,102,241,0.12),transparent_60%)]",
    },
    {
      image:
        "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/nature.jpg",
      title: "🌿 Nature",
      description:
        "Our connection to the earth and the rhythms that sustain us.",
      gradient: "from-indigo-400/10 via-transparent to-emerald-400/10",
      glow: "bg-[conic-gradient(from_90deg,rgba(99,102,241,0.10),rgba(16,185,129,0.12),transparent_60%)]",
    },
    {
      image:
        "https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/sustainable.jpg",
      title: "♻️ Sustainability",
      description: "Living in harmony with our future and the planet we share.",
      gradient: "from-emerald-400/10 via-transparent to-sky-400/10",
      glow: "bg-[conic-gradient(from_180deg,rgba(16,185,129,0.10),rgba(56,189,248,0.12),transparent_60%)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <PillarCard key={index} {...card} />
      ))}
    </div>
  );
}

function PillarCard({
  image,
  title,
  description,
  gradient,
  glow,
}: {
  image: string;
  title: string;
  description: string;
  gradient: string;
  glow: string;
}) {
  return (
    <article className="group relative rounded-2xl bg-background/60 ring-1 ring-foreground/20 p-5 overflow-hidden transform-gpu transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 motion-reduce:transition-none">
      <div
        aria-hidden="true"
        className={`absolute -inset-12 opacity-0 group-hover:opacity-100 transition duration-700 blur-3xl ${glow}`}
      ></div>
      <div className="relative">
        <div className="relative [perspective:1200px]">
          <div className="relative aspect-[20/16] rounded-xl overflow-hidden transform-gpu transition duration-500 group-hover:[transform:translateZ(20px)_rotateX(2deg)] ring-1 ring-foreground/20">
            <img
              src={image}
              alt="Book cover art placeholder"
              className="h-full w-full object-cover opacity-95"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${gradient}`}
            ></div>
          </div>
        </div>
        <h3
          className="mt-5 text-lg text-foreground font-semibold tracking-tight"
          style={{
            fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
          }}
        >
          {title}
        </h3>
        <p
          className="mt-2 text-sm text-foreground"
          style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
        >
          {description}
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-emerald-400/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
    </article>
  );
}
