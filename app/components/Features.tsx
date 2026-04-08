export default function Features() {
  const features = [
    {
      category: "Ingredient Quality",
      title: "Beyond the Label",
      description:
        "We don't just read the label; our AI interprets it. Understand the source, processing method, and true quality of every additive.",
    },
    {
      category: "Diet Compatibility",
      title: "Personalized Filters",
      description:
        "Vegan, Keto, Gluten-Free, or Low-FODMAP? Set your profile once, and get instant compatibility checks on any product worldwide.",
    },
    {
      category: "Health Impact",
      title: "Long-term Wellness",
      description:
        "See how products affect your glucose, inflammation, and energy levels based on the latest nutritional science data.",
    },
    {
      category: "Eco Impact",
      title: "Planet First",
      description:
        "Make choices that support the earth. View carbon footprint, water usage, and packaging recyclability at a glance.",
    },
  ];

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6">
            Designed with care for
            <br className="hidden sm:block" />
            conscious consumers.
          </h2>
          <div className="w-24 h-1 bg-[#2E7D32] rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <span className="text-xs sm:text-sm font-bold text-[#2E7D32] uppercase tracking-wider mb-2 block">
                {feature.category}
              </span>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#2E7D32] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
