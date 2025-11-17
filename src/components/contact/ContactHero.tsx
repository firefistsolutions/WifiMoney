"use client";

import React from "react";
import RevealAnimation from "@/components/shared/RevealAnimation";

export default function ContactHero() {
  return (
    <section className="text-center space-y-4 mb-12">
      <RevealAnimation>
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text-gold">
          Let&apos;s Build Your Forex Future
        </h1>
      </RevealAnimation>
      <RevealAnimation delay={0.1}>
        <p className="text-xl text-white/80">
          We typically respond within 2 hours.
        </p>
      </RevealAnimation>
    </section>
  );
}

