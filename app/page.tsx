import {
  Navbar,
  Hero,
  PhoneScrollPreview,
  ScoresSection,
  VideoSection,
  FeatureCards,
  Footer,
} from "./components";

export default function AppPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="max-sm:hidden">
          <PhoneScrollPreview />
        </div>
        <ScoresSection />
        <VideoSection />
        <FeatureCards />
      </main>
      <Footer />
    </>
  );
}
