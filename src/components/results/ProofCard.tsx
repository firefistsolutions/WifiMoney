"use client";

import React from "react";
import GlassCard from "@/components/shared/GlassCard";
import { Play, Image as ImageIcon, Video as VideoIcon } from "lucide-react";

export type ProofCardData = {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title?: string;
  profit?: string;
  date?: string;
  traderName?: string;
  category: "profit" | "testimonial" | "community" | "transformation";
};

type ProofCardProps = {
  proof: ProofCardData;
  onOpen: (proof: ProofCardData) => void;
};

export default function ProofCard({ proof, onOpen }: ProofCardProps) {
  // Generate a gradient based on category for visual variety
  const getGradient = () => {
    const gradients = {
      profit: "from-[#C9A646]/30 via-[#F4D03F]/20 to-black",
      testimonial: "from-[#0072FF]/30 via-[#00C6FF]/20 to-black",
      community: "from-[#C9A646]/25 via-[#0072FF]/25 to-black",
      transformation: "from-[#F4D03F]/30 via-[#C9A646]/20 to-black",
    };
    return gradients[proof.category] || "from-[#C9A646]/20 to-black";
  };

  return (
    <GlassCard
      className="group cursor-pointer overflow-hidden hover:border-[#C9A646]/40 hover:shadow-[0_0_30px_rgba(201,166,70,0.2)] transition-all duration-300 flex flex-col h-full"
      onClick={() => onOpen(proof)}
    >
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${getGradient()} flex-shrink-0`}>
        {proof.type === "video" ? (
          <>
            <div className="w-full h-full flex items-center justify-center">
              <VideoIcon className="w-20 h-20 text-[#C9A646]/50" />
            </div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#C9A646] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <ImageIcon className="w-20 h-20 text-[#C9A646]/50" />
          </div>
        )}
        
        {proof.profit && (
          <div className="absolute top-4 left-4 bg-[#C9A646] text-black px-3 py-1 rounded-full text-sm font-bold">
            {proof.profit}
          </div>
        )}
        
        {proof.date && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
            {proof.date}
          </div>
        )}
      </div>
      
      {proof.title && (
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-sm font-semibold text-white/90 line-clamp-2">{proof.title}</h3>
          {proof.traderName && (
            <p className="text-xs text-white/60 mt-2">by {proof.traderName}</p>
          )}
        </div>
      )}
    </GlassCard>
  );
}

