"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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

  return (
    <nav
      className={`fixed w-full z-50 backdrop-blur-md border-b transition-colors duration-500 ${
        isInHero
          ? "bg-[#4a6c48]/90 border-white/20"
          : "bg-[#F2F0E9]/90 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src="/gud.png"
              alt="Logo"
              width={70}
              height={70}
              className={`rounded-md ${isInHero ? "" : "invert transition-colors duration-500"}`}
            />
            {/* <span
              className={`font-display font-semibold text-2xl tracking-tight transition-colors duration-500 ${
                isInHero ? "text-white" : "text-gray-900"
              }`}
            >
              GudForUs
            </span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              className={`text-sm font-medium transition-colors duration-500 ${
                isInHero
                  ? "text-green-50 hover:text-white"
                  : "text-gray-600 hover:text-[#2E7D32]"
              }`}
              href="#scores"
            >
              How it works
            </a>

            <a
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-[#2E7D32] hover:bg-[#1B5E20] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(46,125,50,0.3)]"
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
              <span className="material-icons-round text-3xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden py-4 border-t transition-colors duration-500 ${
              isInHero ? "border-white/20" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col space-y-4">
              <a
                className={`text-sm font-medium transition-colors duration-500 ${
                  isInHero
                    ? "text-green-50 hover:text-white"
                    : "text-gray-600 hover:text-[#2E7D32]"
                }`}
                href="#scores"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </a>

              <a
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-[#2E7D32] hover:bg-[#1B5E20] transition-all shadow-lg w-fit"
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
