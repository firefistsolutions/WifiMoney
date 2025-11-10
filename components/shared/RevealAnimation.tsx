"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealAnimationProps = {
  children: React.ReactNode;
  delay?: number; // seconds
};

export default function RevealAnimation({ children, delay = 0 }: RevealAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "-100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-animation h-full ${inView ? "is-visible" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}


