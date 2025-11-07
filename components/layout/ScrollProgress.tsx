"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-white/5">
      <div
        className="h-full bg-[linear-gradient(90deg,#C9A646,#F4D03F)] shadow-[0_0_20px_rgba(201,166,70,0.6)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}



