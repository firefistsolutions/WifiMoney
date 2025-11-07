"use client";
import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import placeholder from "@/utils/placeholders";
import React, { useRef } from "react";

const TESTIMONIALS = [
  { name: "Rakesh, Mumbai", text: "I made my first $500 profit within 2 weeks! The mentorship is invaluable.", badge: "$500 Profit", img: 0 },
  { name: "Sarah, Dubai", text: "The mentorship changed my game — I trade full time now.", badge: "Full-Time Trader", img: 1 },
  { name: "Aditya, Pune", text: "WiFi Money is not just a course; it's a community of winners.", badge: "—", img: 2 },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="space-y-8">
      <SectionHeading title="What Our Students Say" subtitle="Real people. Real profits. Real transformations." />
      <div className="relative">
        <button aria-label="Scroll left" className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2" onClick={() => scrollBy(-320)}>
          ◀
        </button>
        <div ref={containerRef} className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto py-2">
          {TESTIMONIALS.map((t) => (
            <GlassCard key={t.name} className="min-w-[300px] snap-center p-6">
              <div className="flex items-center gap-4">
                <img src={placeholder("founder", t.img, "auto=format&fit=crop&w=160&q=80")} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="text-sm text-white/70">{t.name}</div>
                  <div className="text-xs text-[#C9A646]">{t.badge}</div>
                </div>
              </div>
              <p className="mt-4 text-sm italic text-white/80">“{t.text}”</p>
            </GlassCard>
          ))}
        </div>
        <button aria-label="Scroll right" className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2" onClick={() => scrollBy(320)}>
          ▶
        </button>
      </div>
    </section>
  );
}



