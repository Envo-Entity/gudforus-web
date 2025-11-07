"use client";
import React, { useEffect, useRef, useState } from "react";

type Page = {
  front: {
    cover?: boolean;
    hidePageNumber?: boolean;
    content: React.ReactNode;
  };
  back: {
    cover?: boolean;
    hidePageNumber?: boolean;
    content: React.ReactNode;
  };
};

type FlipBookProps = {
  pages: Page[];
};

export default function FlipBook({ pages }: FlipBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keep --c in sync with currentPage
  useEffect(() => {
    if (bookRef.current) {
      bookRef.current.style.setProperty("--c", String(currentPage));
    }
  }, [currentPage]);

  useEffect(() => {
    const section = document.getElementById("flipbook-section");
    const scrollSpacer = document.getElementById("scroll-spacer");
    const indicator = document.getElementById("scroll-indicator");
    const bookContainer = document.getElementById("book-container");

    if (!section || !scrollSpacer || !bookContainer) {
      console.warn("FlipBook: missing required DOM elements");
      return;
    }

    // Set total pages for spacer height calculation
    scrollSpacer.style.setProperty("--total-pages", String(pages.length));
    containerRef.current = bookContainer as HTMLDivElement;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionBottom = window.scrollY + rect.bottom;
      const sectionHeight = Math.max(rect.height, 1);

      // Viewport center position
      const viewportCenter = window.scrollY + window.innerHeight / 2;

      // Check if section is in view
      const isInView =
        viewportCenter >= sectionTop && viewportCenter <= sectionBottom;

      if (!isInView) {
        // Hide book when outside section
        bookContainer.style.opacity = "0";
        return;
      }

      // Show book
      bookContainer.style.opacity = "1";

      // Calculate normalized progress through entire section (0 to 1)
      const rawProgress = (viewportCenter - sectionTop) / sectionHeight;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Phase boundaries
      // Total phases: pages.length + 2 (one for scroll-in, pages.length for flipping, one for scroll-out)
      const totalPhases = pages.length + 2;
      const phaseSize = 1 / totalPhases;

      let bookYOffset = 0; // Vertical offset in vh units
      let pageIndex = 0;

      if (progress < phaseSize) {
        // PHASE 1: SCROLL-IN (book moves from bottom to center)
        const phaseProgress = progress / phaseSize;
        bookYOffset = 100 * (1 - phaseProgress); // 100vh to 0vh
        pageIndex = 0;
      } else if (progress < 1 - phaseSize) {
        // PHASE 2: PAGE FLIPPING (book stays centered)
        const phaseStart = phaseSize;
        const phaseEnd = 1 - phaseSize;
        const phaseProgress = (progress - phaseStart) / (phaseEnd - phaseStart);
        bookYOffset = 0; // stays at center
        pageIndex = Math.round(phaseProgress * (pages.length - 1));
      } else {
        // PHASE 3: SCROLL-OUT (book moves from center to top)
        const phaseProgress = (progress - (1 - phaseSize)) / phaseSize;
        bookYOffset = -100 * phaseProgress; // 0vh to -100vh
        pageIndex = pages.length - 1;
      }

      // Apply vertical transform to book container
      bookContainer.style.transform = `translate(-50%, calc(-50% + ${bookYOffset}vh))`;

      // Update current page
      setCurrentPage(Math.max(0, Math.min(pageIndex, pages.length - 1)));

      // Hide indicator after initial scroll
      if (indicator && progress > 0.05) {
        indicator.style.opacity = "0";
      }
    };

    // Initial setup
    onScroll();

    // Attach scroll listener
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Auto-hide indicator after 3 seconds
    const hideTimer = setTimeout(() => {
      if (indicator) {
        indicator.style.opacity = "0";
      }
    }, 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(hideTimer);
    };
  }, [pages.length]);

  // Click to scroll to specific page
  const scrollToPageIndex = (pageIndex: number) => {
    const section = document.getElementById("flipbook-section");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = Math.max(rect.height, 1);

    // Calculate target progress for the page
    const totalPhases = pages.length + 2;
    const phaseSize = 1 / totalPhases;

    // Page flipping phase starts after scroll-in phase
    const flipPhaseStart = phaseSize;
    const flipPhaseEnd = 1 - phaseSize;

    // Progress within flip phase
    const pageProgress = pages.length > 1 ? pageIndex / (pages.length - 1) : 0;
    const targetProgress =
      flipPhaseStart + pageProgress * (flipPhaseEnd - flipPhaseStart);

    const targetCenter = sectionTop + targetProgress * sectionHeight;
    const targetScrollTop = targetCenter - window.innerHeight / 2;

    window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  };

  const handlePageClick = (
    evt: React.MouseEvent,
    idx: number,
    isFront: boolean
  ) => {
    if ((evt.target as HTMLElement).closest("a")) return;
    const nextPage = isFront ? idx + 1 : idx;
    const clampedPage = Math.max(0, Math.min(nextPage, pages.length - 1));
    setCurrentPage(clampedPage);
    scrollToPageIndex(clampedPage);
  };

  return (
    <div className="book" ref={bookRef}>
      {pages.map((page, idx) => (
        <div
          key={idx}
          className="page"
          style={{ ["--i" as any]: idx } as React.CSSProperties}
        >
          <div
            className={`front ${page.front.cover ? "cover" : ""}`}
            onClick={(evt) => handlePageClick(evt, idx, true)}
          >
            {page.front.content}
            {!page.front.cover && !page.front.hidePageNumber && (
              <span className="page-number">{idx * 2 + 1}.</span>
            )}
          </div>

          <div
            className={`back ${page.back.cover ? "cover" : ""}`}
            onClick={(evt) => handlePageClick(evt, idx, false)}
          >
            {page.back.content}
            {!page.back.cover && !page.back.hidePageNumber && (
              <span className="page-number">{idx * 2 + 2}.</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
