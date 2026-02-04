"use client";

import React, { useEffect, useState } from "react";
import Globe from "./globe";

interface ScorePreviewProps {
  score: number;
  maxScore?: number;
  icon: "health" | "compatibility" | "environment";
  className?: string;
  animateOnMount?: boolean;
  clean?: boolean;
  title?: string;
}

const ScorePreview: React.FC<ScorePreviewProps> = ({
  score,
  maxScore = 100,
  icon,
  className = "",
  animateOnMount = true,
  clean = false,
  title,
}) => {
  const [animatedScore, setAnimatedScore] = useState(
    animateOnMount ? 0 : score,
  );
  const [animatedWidth, setAnimatedWidth] = useState(
    animateOnMount ? 0 : (score / maxScore) * 100,
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple visibility trigger for animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!animateOnMount || !isVisible) return;

    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    const widthIncrement = ((score / maxScore) * 100) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setAnimatedScore(score);
        setAnimatedWidth((score / maxScore) * 100);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(increment * currentStep));
        setAnimatedWidth(widthIncrement * currentStep);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, maxScore, animateOnMount, isVisible]);

  // Calculate gradient color based on score
  const getGradientColor = () => {
    const percentage = (animatedScore / maxScore) * 100;
    if (percentage < 40) {
      return "linear-gradient(90deg, #ef4444 0%, #f97316 100%)";
    } else if (percentage < 70) {
      return "linear-gradient(90deg, #f97316 0%, #eab308 100%)";
    } else {
      return "linear-gradient(90deg, #22c55e 0%, #16a34a 100%)";
    }
  };

  const renderIcon = () => {
    switch (icon) {
      case "health":
        return (
          <img
            src="/app-images/heart.png"
            alt="Health"
            className="sm:w-22 sm:h-22 w-20 h-20 object-contain drop-shadow-sm"
          />
        );
      case "compatibility":
        return (
          <img
            src="/app-images/compatibility.png"
            alt="Compatibility"
            className="sm:w-25 sm:h-25 w-20 h-20 object-contain drop-shadow-sm"
          />
        );
      case "environment":
        return (
          <div className="sm:w-25 sm:h-25 w-20 h-20 rounded-full overflow-hidden shadow-sm">
            <Globe size={80} className="!h-20" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`${
        clean
          ? "p-0"
          : "bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
      } ${className}`}
      style={
        clean
          ? {}
          : {
              background: "linear-gradient(145deg, #ffffff 0%, #fafafa 100%)",
            }
      }
    >
      <div className="flex flex-row-reverse items-center gap-3">
        {/* Icon */}
        <div className="shrink-0">{renderIcon()}</div>

        {/* Score and Progress */}
        <div className="flex-1">
          {/* Title if provided */}
          {title && (
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          )}

          {/* Score Value */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-5xl font-semibold text-gray-900 tracking-tight">
              {animatedScore}
            </span>
            <span className="text-lg text-gray-400 font-medium">
              / {maxScore}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${animatedWidth}%`,
                background: getGradientColor(),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePreview;
