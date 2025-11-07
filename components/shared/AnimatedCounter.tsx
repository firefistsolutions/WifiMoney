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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / durationMs);
            setValue(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [durationMs, target, hasRun]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}



