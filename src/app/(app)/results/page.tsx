"use client";

import React, { useState } from "react";
import ResultsHero from "@/components/results/ResultsHero";
import ProofGrid from "@/components/results/ProofGrid";
import { ProofCardData } from "@/components/results/ProofCard";
import Lightbox from "@/components/results/Lightbox";
import CommunityStats from "@/components/results/CommunityStats";
import SuccessStories from "@/components/results/SuccessStories";

// Sample proof data - replace with real data
const PROOF_DATA: ProofCardData[] = [
  {
    id: "1",
    type: "image",
    src: "#",
    title: "Weekly Profit Screenshot",
    profit: "$2,450",
    date: "Nov 2024",
    traderName: "Rajesh K.",
    category: "profit",
  },
  {
    id: "2",
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Success Story: From Zero to Consistent",
    category: "testimonial",
  },
  {
    id: "3",
    type: "image",
    src: "#",
    title: "Community Celebration",
    category: "community",
  },
  {
    id: "4",
    type: "image",
    src: "#",
    title: "Before & After Transformation",
    profit: "$8,500",
    date: "Oct 2024",
    traderName: "Priya S.",
    category: "transformation",
  },
  {
    id: "5",
    type: "image",
    src: "#",
    title: "Monthly Profit Report",
    profit: "$5,200",
    date: "Nov 2024",
    traderName: "Ahmed A.",
    category: "profit",
  },
  {
    id: "6",
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Live Trading Session Highlights",
    category: "testimonial",
  },
  {
    id: "7",
    type: "image",
    src: "#",
    title: "Telegram Community Activity",
    category: "community",
  },
  {
    id: "8",
    type: "image",
    src: "#",
    title: "Student Success Journey",
    profit: "$3,800",
    date: "Sep 2024",
    traderName: "Sarah J.",
    category: "transformation",
  },
];

export default function ResultsPage() {
  const [lightboxProof, setLightboxProof] = useState<ProofCardData | null>(
    null
  );

  return (
    <div className="space-y-12 md:space-y-20">
      <ResultsHero />

      <div className="relative">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A646]/5 to-transparent pointer-events-none -z-10" />
        
        <ProofGrid
          proofs={PROOF_DATA}
          onOpenLightbox={setLightboxProof}
        />
      </div>

      <div className="relative py-12">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A646]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0072FF]/5 rounded-full blur-3xl -z-10" />
        
        <CommunityStats />
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C9A646]/5 via-transparent to-[#0072FF]/5 rounded-3xl -z-10" />
        <SuccessStories />
      </div>

      <Lightbox proof={lightboxProof} onClose={() => setLightboxProof(null)} />
    </div>
  );
}

