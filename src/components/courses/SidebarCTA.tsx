"use client";

import React from "react";
import GlassCard from "@/components/shared/GlassCard";
import Button from "@/components/shared/Button";
import { Check } from "lucide-react";
import { useEnrollModal } from "@/components/shared/EnrollModalProvider";

export default function SidebarCTA() {
  const { openModal } = useEnrollModal();
  const features = [
    "All courses included",
    "Lifetime access",
    "Live weekly sessions",
    "Private community",
  ];

  return (
    <div className="sticky top-24">
      <GlassCard className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Enroll once. Learn forever.</h3>
          </div>

          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-5 h-5 rounded-full bg-[#C9A646] flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-black" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-white/10">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-extrabold gradient-text-gold">$300</span>
              <span className="text-sm text-white/50 line-through">$500</span>
            </div>
            <Button className="w-full" onClick={() => openModal("Join the Academy")}>Join the Academy</Button>
          </div>

          <div className="text-xs text-center text-white/60 pt-2 border-t border-white/10">
            💳 Secure Payment • 7-day guarantee
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

