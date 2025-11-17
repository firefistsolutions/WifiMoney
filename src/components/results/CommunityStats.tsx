"use client";

import React from "react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import RevealAnimation from "@/components/shared/RevealAnimation";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import { useEnrollModal } from "@/components/shared/EnrollModalProvider";

export default function CommunityStats() {
  const { openModal } = useEnrollModal();
  
  return (
    <section className="space-y-12">
      <SectionHeading
        title="Our Impact in Numbers"
        subtitle="Real results from real traders"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <RevealAnimation>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text-gold mb-2">
              <AnimatedCounter target={25000} suffix="+" />
            </div>
            <p className="text-white/70 text-sm md:text-base">
              Traders Mentored
            </p>
          </div>
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text-gold mb-2">
              <AnimatedCounter target={82} suffix="%" />
            </div>
            <p className="text-white/70 text-sm md:text-base">
              Consistency Rate
            </p>
          </div>
        </RevealAnimation>

        <RevealAnimation delay={0.2}>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text-gold mb-2">
              <AnimatedCounter target={35} suffix="+" />
            </div>
            <p className="text-white/70 text-sm md:text-base">Countries</p>
          </div>
        </RevealAnimation>

        <RevealAnimation delay={0.3}>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text-gold mb-2">
              $<AnimatedCounter target={18} suffix="M+" />
            </div>
            <p className="text-white/70 text-sm md:text-base">
              Profits Generated
            </p>
          </div>
        </RevealAnimation>
      </div>

      <div className="text-center pt-8">
        <RevealAnimation delay={0.4}>
          <p className="text-xl text-white/80 mb-6">Want to be next?</p>
          <Button onClick={() => openModal("Join the Community")}>Join the Community →</Button>
        </RevealAnimation>
      </div>
    </section>
  );
}

