"use client";

import React from "react";
import ScoreCard from "@/components/ui/score-card";

const scoreData = [
  {
    title: "Health Score",
    description:
      "Evaluates how a product affects long-term health — including sugar load, inflammation risk, additives, and nutritional balance.",
    icon: "health" as const,
    score: 75,
  },
  {
    title: "Compatibility Score",
    description:
      "Personalized to your body and preferences. Accounts for dietary needs, allergies, conditions like diabetes, and lifestyle choices.",
    icon: "compatibility" as const,
    score: 88,
  },
  // {
  //   title: "Environment Score",
  //   description:
  //     "Measures personal compatibility across carbon footprint, water usage, sourcing, and packaging sustainability.",
  //   icon: "environment" as const,
  //   score: 62,
  // },
];

export default function ScoresSection() {
  return (
    <section
      className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50/50"
      id="scores"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Two Scores. One Clear Decision.
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Every product is evaluated across health, personal compatibility,
            and personal compatibility — so you know exactly what you&apos;re
            choosing.
          </p>
        </div>

        {/* Score Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {scoreData.map((card, index) => (
            <ScoreCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              score={card.score}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
