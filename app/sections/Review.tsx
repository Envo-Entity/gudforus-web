export default function Review() {
  return (
    <section id="testimonials" className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader />
        <TestimonialCarousel />
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
        What readers say
      </h2>
      <div className="text-sm text-neutral-400">Swipe or tab through</div>
    </div>
  );
}

function TestimonialCarousel() {
  const testimonials = [
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=120&auto=format&fit=crop",
      name: "Sarah M.",
      role: "Wellness Coach",
      quote: "GoodForUs helped me reconnect with what truly matters in life.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
      name: "James K.",
      role: "Sustainable Living Advocate",
      quote: "A beautiful guide to living intentionally in our modern world.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=120&auto=format&fit=crop",
      name: "Elena R.",
      role: "Mindfulness Teacher",
      quote: "The non-negotiables became my daily compass.",
    },
  ];

  return (
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mb-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({
  image,
  name,
  role,
  quote,
}: {
  image: string;
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <figure className="snap-start min-w-[280px] md:min-w-[360px] rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 p-6 transition hover:-translate-y-1 hover:ring-emerald-400/30 transform-gpu">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt=""
          className="h-9 w-9 rounded-full object-cover ring-1 ring-white/20"
        />
        <div>
          <figcaption className="text-sm text-white font-medium">
            {name}
          </figcaption>
          <div className="text-xs text-neutral-400">{role}</div>
        </div>
      </div>
      <blockquote
        className="mt-4 text-sm text-neutral-200"
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
      >
        "{quote}"
      </blockquote>
    </figure>
  );
}
