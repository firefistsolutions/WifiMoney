"use client";

import React from "react";
import ProofCard, { ProofCardData } from "./ProofCard";
import RevealAnimation from "@/components/shared/RevealAnimation";
import SectionHeading from "@/components/shared/SectionHeading";

type ProofGridProps = {
  proofs: ProofCardData[];
  onOpenLightbox: (proof: ProofCardData) => void;
};

const CATEGORIES = [
  { id: "profit", label: "Profit Screenshots", description: "Real trading results from our community" },
  { id: "testimonial", label: "Video Testimonials", description: "Hear directly from successful traders" },
  { id: "community", label: "Community Highlights", description: "See our active trading community in action" },
  { id: "transformation", label: "Success Stories", description: "Journeys from beginner to consistent trader" },
];

export default function ProofGrid({ proofs, onOpenLightbox }: ProofGridProps) {
  return (
    <div className="space-y-20">
      {CATEGORIES.map((category) => {
        const categoryProofs = proofs.filter((proof) => proof.category === category.id);
        
        if (categoryProofs.length === 0) return null;

        return (
          <section key={category.id} className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#C9A646]/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#0072FF]/5 rounded-full blur-3xl -z-10" />
            
            <div className="relative space-y-8">
              <SectionHeading
                title={category.label}
                subtitle={category.description}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                {categoryProofs.map((proof, index) => (
                  <RevealAnimation key={proof.id} delay={index * 0.05}>
                    <ProofCard proof={proof} onOpen={onOpenLightbox} />
                  </RevealAnimation>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

