"use client";

import React from "react";
import GlassCard from "@/components/shared/GlassCard";
import { MapPin } from "lucide-react";

export default function MapSection() {
  return (
    <section className="space-y-4">
      <GlassCard className="p-0 overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-[#C9A646]/20 via-[#0072FF]/10 to-black flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-[#C9A646] mx-auto mb-4" />
            <p className="text-white/60">Map Placeholder</p>
            <p className="text-white/40 text-sm mt-2">Dubai, UAE</p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}

