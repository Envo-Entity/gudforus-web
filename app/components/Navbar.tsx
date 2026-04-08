"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";

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
          : "bg-[#fafaf7]/90 border-[#e5e3dd]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {/* <span
              className={`font-display font-semibold text-2xl tracking-tight transition-colors duration-500 ${
                isInHero ? "text-white" : "text-gray-900"
              }`}
            >
              GudForUs
            </span> */}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden py-4 border-t transition-colors duration-500 ${
              isInHero ? "border-white/20" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col space-y-4 px-4 pb-4">
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
