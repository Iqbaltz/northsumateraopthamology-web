"use client";

import { useEffect, useRef, useState } from "react";

function formatMetric(value: number, decimals: number, suffix: string) {
  return `${value.toFixed(decimals)}${suffix}`;
}

export function AnimatedMetric({ value }: { value: string }) {
  const elementRef = useRef<HTMLElement>(null);
  const target = Number.parseFloat(value);
  const suffix = value.endsWith("%") ? "%" : "";
  const decimals = value.includes(".") ? value.split(".")[1].replace(/\D/g, "").length : 0;
  const [displayValue, setDisplayValue] = useState(() => formatMetric(0, decimals, suffix));

  useEffect(() => {
    const element = elementRef.current;
    if (!element || Number.isNaN(target)) return;

    let animationFrame = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationFrame = requestAnimationFrame(() => setDisplayValue(value));
      return () => cancelAnimationFrame(animationFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const duration = 1450;
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplayValue(formatMetric(target * eased, decimals, suffix));

          if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        observer.unobserve(element);
      },
      { threshold: 0.55 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [decimals, suffix, target, value]);

  return (
    <strong
      ref={elementRef}
      aria-label={value}
      className="min-w-[3ch] font-serif text-[60px] leading-[1.15] font-normal text-[#296464] tabular-nums transition-[color,transform] duration-300 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:text-[#07868f] max-[1200px]:text-[40px] max-[1200px]:leading-12"
    >
      <span aria-hidden="true">{displayValue}</span>
    </strong>
  );
}
