export default function Pillars() {
  return (
    <section id="cards" className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader />
        <CardGrid />
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="mb-8 flex items-end justify-between">
      <h2
        className="text-2xl sm:text-3xl text-white tracking-tight font-semibold"
        style={{
          fontFamily: "'Space Grotesk', ui-sans-serif, Inter, system-ui",
        }}
      >
        Explore the pillars
      </h2>
      <p className="text-sm text-neutral-400">Hover to feel depth</p>
    </div>
  );
}

function CardGrid() {
  const cards = [
    {
      image:
        "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop",
      title: "What are the Non-Negotiables of Life? 🌱 Health",
      description:
        "The foundation of all we do. Without it, nothing else matters.",
      gradient: "from-emerald-400/10 via-transparent to-indigo-400/10",
      glow: "bg-[conic-gradient(from_0deg,rgba(16,185,129,0.10),rgba(99,102,241,0.12),transparent_60%)]",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      title: "🌿 Nature",
      description:
        "Our connection to the earth and the rhythms that sustain us.",
      gradient: "from-indigo-400/10 via-transparent to-emerald-400/10",
      glow: "bg-[conic-gradient(from_90deg,rgba(99,102,241,0.10),rgba(16,185,129,0.12),transparent_60%)]",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
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
    <article className="group relative rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 p-5 overflow-hidden transform-gpu transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 motion-reduce:transition-none">
      <div
        aria-hidden="true"
        className={`absolute -inset-12 opacity-0 group-hover:opacity-100 transition duration-700 blur-3xl ${glow}`}
      ></div>
      <div className="relative">
        <div className="relative [perspective:1200px]">
          <div className="relative h-40 rounded-xl overflow-hidden transform-gpu transition duration-500 group-hover:[transform:translateZ(20px)_rotateX(2deg)] ring-1 ring-white/10">
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
          className="mt-5 text-lg text-white font-semibold tracking-tight"
          style={{
            fontFamily: "'Space Grotesk', ui-sans-serif, Inter, system-ui",
          }}
        >
          {title}
        </h3>
        <p
          className="mt-2 text-sm text-neutral-300"
          style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
        >
          {description}
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-emerald-400/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
    </article>
  );
}
