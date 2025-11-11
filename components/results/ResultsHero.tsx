"use client";

import React from "react";
import RevealAnimation from "@/components/shared/RevealAnimation";

export default function ResultsHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#C9A646]/10 via-black to-black p-8 md:p-12 lg:p-16">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0072FF]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10 text-center space-y-4">
        <RevealAnimation>
          <h1 className="text-4xl md:text-6xl font-extrabold gradient-text-gold">
            Real Traders. Real Results.
          </h1>
        </RevealAnimation>
        <RevealAnimation delay={0.1}>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
            Don&apos;t take our word for it. See the proof.
          </p>
        </RevealAnimation>
      </div>
    </section>
  );
}

