"use client";

import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

type ParallaxSectionProps = PropsWithChildren<{ amount?: number; className?: string }>;

export default function ParallaxSection({ children, amount = 100, className }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight || document.documentElement.clientHeight;
        const progress = 1 - Math.min(Math.max(rect.top / viewportH, 0), 1);
        setOffset(-amount * progress);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [amount]);

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${offset}px)` }}>
      {children}
    </div>
  );
}


