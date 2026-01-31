"use client";
import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import Button from "@/components/shared/Button";
import placeholder from "@/utils/placeholders";
import React, { useRef } from "react";
import Link from "next/link";

const TICKER_ITEMS = [
  "🔥 Vivek earned $420 this week",
  "Priya hit her first 2% profit",
  "Raj booked $310 on Gold",
  "Sarah made $550 in one session",
  "Mike profited $890 this month",
  "Aditya earned $320 trading EUR/USD",
  "Rakesh made $500 in 2 weeks",
];

const TESTIMONIALS = [
  {
    name: "Vivek",
    city: "Mumbai",
    profit: "$420",
    quote: "My first profitable week after joining WiFi Money!",
    img: 0,
  },
  {
    name: "Priya",
    city: "Delhi",
    profit: "2% ROI",
    quote: "Hit my first consistent profit target thanks to the mentorship.",
    img: 1,
  },
  {
    name: "Raj",
    city: "Pune",
    profit: "$310",
    quote: "The live trading sessions are game-changers for understanding market dynamics.",
    img: 2,
  },
  {
    name: "Sarah",
    city: "Dubai",
    profit: "$550",
    quote: "From beginner to full-time trader in 3 months with WiFi Money.",
    img: 0,
  },
  {
    name: "Mike",
    city: "Bangalore",
    profit: "$890",
    quote: "The risk management strategies saved me from major losses.",
    img: 1,
  },
];

function LiveTicker() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#C9A646]/20 via-[#C9A646]/10 to-[#C9A646]/20 border-y border-[#C9A646]/30 py-4">
      <div className="flex animate-scroll-ticker whitespace-nowrap">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <span key={idx} className="mx-8 text-sm md:text-base text-white/90 font-medium">
            {item} •
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <>
      {/* Live Ticker Bar */}
      <LiveTicker />

      <section className="space-y-8 py-12">
        <SectionHeading title="Results & Testimonials" subtitle="Real people. Real profits. Real transformations." />

        {/* Testimonials Slider */}
        <div className="relative">
          <button
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-2 md:p-3 transition-colors hidden md:block"
            onClick={() => scrollBy(-320)}
          >
            ◀
          </button>
          <div ref={containerRef} className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto py-2 px-4 md:px-12">
            {TESTIMONIALS.map((t) => (
              <GlassCard key={`${t.name}-${t.city}`} className="min-w-[300px] snap-center p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={placeholder("founder", t.img, "auto=format&fit=crop&w=160&q=80")}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/70">{t.city}</div>
                    <div className="text-sm text-[#C9A646] font-semibold mt-1">{t.profit}</div>
                  </div>
                </div>
                <p className="text-sm text-white/80 italic">&quot;{t.quote}&quot;</p>
              </GlassCard>
            ))}
          </div>
          <button
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-2 md:p-3 transition-colors hidden md:block"
            onClick={() => scrollBy(320)}
          >
            ▶
          </button>
        </div>

        {/* See More Results Button */}
        <div className="text-center pt-4">
          <Link href="/results">
            <Button>See More Results →</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
