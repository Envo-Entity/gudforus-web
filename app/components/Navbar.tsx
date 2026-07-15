"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import LiquidGlass from "./LiquidGlass";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("get-app");
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 80; // Offset for navbar height
        setIsInHero(scrollPosition < heroBottom);
      }
    };

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const barTint = isInHero ? "rgba(74,108,72,0.55)" : "rgba(250,250,247,0.72)";
  const barSpecular = isInHero ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.8)";
  const barBorder = isInHero ? "border-white/20" : "border-[#e5e3dd]";

  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        {/* Floating pill */}
        <div
          className={`relative rounded-full border shadow-lg transition-colors duration-500 ${barBorder}`}
        >
          <LiquidGlass
            className="absolute inset-0"
            cornerRadius={9999}
            edgeDepth={22}
            tint={barTint}
            specular={barSpecular}
          />
          <div className="relative px-5 sm:px-7 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link
                href="/"
                className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <Image
                  src="/gud.png"
                  alt="Gud For Us logo"
                  width={70}
                  height={70}
                  className={`rounded-md ${isInHero ? "" : "invert transition-colors duration-500"}`}
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a
                  className={`text-sm font-medium transition-colors duration-500 ${
                    isInHero
                      ? "text-green-50 hover:text-white"
                      : "text-[#5c5c52] hover:text-[#2d6a4f]"
                  }`}
                  href="#scores"
                >
                  How it works
                </a>

                <Link
                  href="/ishealthy"
                  className={`text-sm font-medium transition-colors duration-500 ${
                    isInHero
                      ? "text-green-50 hover:text-white"
                      : "text-[#5c5c52] hover:text-[#2d6a4f]"
                  }`}
                >
                  Is This Healthy
                </Link>

                <Link
                  href="/blog"
                  className={`text-sm font-medium transition-colors duration-500 ${
                    isInHero
                      ? "text-green-50 hover:text-white"
                      : "text-[#5c5c52] hover:text-[#2d6a4f]"
                  }`}
                >
                  Blog
                </Link>

                <a
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-[#2d6a4f] hover:bg-[#1f513b] transition-all shadow-lg hover:shadow-[0_4px_20px_rgba(45,106,79,0.25)] hover:-translate-y-[1px]"
                  href="#get-app"
                >
                  Get the App
                </a>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`focus:outline-none transition-colors duration-500 ${
                    isInHero
                      ? "text-green-50 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {mobileMenuOpen ? (
                    <X className="w-8 h-8" />
                  ) : (
                    <Menu className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu — its own floating glass panel below the pill */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-2 relative rounded-3xl border shadow-lg overflow-hidden transition-colors duration-500 ${barBorder}`}
          >
            <LiquidGlass
              className="absolute inset-0"
              cornerRadius={24}
              edgeDepth={18}
              tint={barTint}
              specular={barSpecular}
            />
            <div className="relative flex flex-col space-y-4 px-5 py-5">
              <a
                className={`text-sm font-medium transition-colors duration-500 ${
                  isInHero
                    ? "text-green-50 hover:text-white"
                    : "text-[#5c5c52] hover:text-[#2d6a4f]"
                }`}
                href="#scores"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </a>

              <Link
                className={`text-sm font-medium transition-colors duration-500 ${
                  isInHero
                    ? "text-green-50 hover:text-white"
                    : "text-[#5c5c52] hover:text-[#2d6a4f]"
                }`}
                href="/ishealthy"
                onClick={() => setMobileMenuOpen(false)}
              >
                Is This Healthy
              </Link>

              <Link
                className={`text-sm font-medium transition-colors duration-500 ${
                  isInHero
                    ? "text-green-50 hover:text-white"
                    : "text-[#5c5c52] hover:text-[#2d6a4f]"
                }`}
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <a
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-[#2d6a4f] hover:bg-[#1f513b] transition-all shadow-lg w-fit"
                href="#get-app"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get the App
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
