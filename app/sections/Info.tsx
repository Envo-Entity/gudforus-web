export default function Info() {
  return (
    <section className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] ring-1 ring-white/10 p-10 sm:p-16">
          <BackgroundGlow />
          <MainText />
          <SubText />
        </div>
      </div>
    </section>
  );
}

function BackgroundGlow() {
  return (
    <div
      aria-hidden="true"
      className="absolute -inset-20 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(16,185,129,0.25),transparent_50%)] blur-3xl opacity-30"
    ></div>
  );
}

function MainText() {
  return (
    <p
      className="text-center text-[22px] sm:text-[36px] md:text-[56px] lg:text-[64px] leading-[1.05] font-semibold tracking-tight text-white"
      style={{ fontFamily: "'Space Grotesk', ui-sans-serif, Inter, system-ui" }}
    >
      NON-NEGOTIABLES OF HEALTH AND WELLBEING
    </p>
  );
}

function SubText() {
  return (
    <p
      className="mt-4 text-center text-sm text-neutral-400"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      Layered, tactile type — fading into focus as you scroll.
    </p>
  );
}
