"use client";

import React, { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  target: number;
  durationMs?: number;
  suffix?: string;
  className?: string;
};

export default function AnimatedCounter({ target, durationMs = 1500, suffix = "", className }: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasRun, setHasRun] = useState(false);

  // Validate target
  const validTarget = typeof target === 'number' && !isNaN(target) ? target : 0;

  useEffect(() => {
    if (!validTarget) {
      setValue(0);
      return;
    }

    const el = ref.current;
    if (!el) {
      // If element doesn't exist yet, set value immediately
      setValue(validTarget);
      return;
    }
    
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const p = Math.min(1, elapsed / durationMs);
            setValue(Math.floor(p * validTarget));
            if (p < 1) {
              requestAnimationFrame(step);
            } else {
              setValue(validTarget);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [durationMs, validTarget, hasRun]);

  // Immediate fallback: show target if visible on mount
  useEffect(() => {
    if (!hasRun && ref.current && validTarget > 0) {
      const checkVisibility = () => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight + 200 && rect.bottom > -200;
          if (isVisible) {
            setValue(validTarget);
            setHasRun(true);
          }
        }
      };
      checkVisibility();
      const timeout = setTimeout(checkVisibility, 100);
      return () => clearTimeout(timeout);
    }
  }, [hasRun, validTarget]);

  if (!validTarget) {
    return <span className={className}>0{suffix}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}



