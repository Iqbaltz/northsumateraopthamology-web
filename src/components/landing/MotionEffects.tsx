"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "main [data-reveal], main [data-reveal-item], footer [data-reveal], footer [data-reveal-item]";

/** Adds one-time, scroll-triggered entrance motion without changing layout. */
export function MotionEffects() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    if (elements.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const revealTimers: number[] = [];

    const clearMotionStyles = (element: HTMLElement) => {
      element.style.removeProperty("transition-delay");
      element.style.removeProperty("will-change");
    };

    elements.forEach((element, index) => {
      const requestedDelay = Number(element.dataset.revealDelay);
      const staggerDelay = element.hasAttribute("data-reveal-item") ? (index % 4) * 80 : 0;
      const delay = Number.isFinite(requestedDelay) ? requestedDelay : staggerDelay;

      if (delay > 0) {
        element.style.transitionDelay = `${delay}ms`;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("is-revealed");

          const delay = Number.parseFloat(element.style.transitionDelay) || 0;
          const timer = window.setTimeout(() => clearMotionStyles(element), delay + 850);
          revealTimers.push(timer);

          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px 40px 0px", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));

    // Fallback safety timeout: ensure everything is visible even if missed by observer
    const safetyTimer = window.setTimeout(() => {
      elements.forEach((el) => {
        el.classList.add("is-revealed");
        clearMotionStyles(el);
      });
    }, 2800);

    return () => {
      observer.disconnect();
      window.clearTimeout(safetyTimer);
      revealTimers.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}

