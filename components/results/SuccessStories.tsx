"use client";

import React from "react";
import GlassCard from "@/components/shared/GlassCard";
import RevealAnimation from "@/components/shared/RevealAnimation";
import SectionHeading from "@/components/shared/SectionHeading";
import { Quote } from "lucide-react";

export type SuccessStory = {
  id: string;
  name: string;
  location: string;
  profit: string;
  quote: string;
  image?: string;
};

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    location: "Mumbai, India",
    profit: "$12,500",
    quote: "Started with zero knowledge. Now trading consistently for 8 months. WiFi Money changed my life.",
  },
  {
    id: "2",
    name: "Priya Sharma",
    location: "Delhi, India",
    profit: "$8,300",
    quote: "The mentorship and community support here is unmatched. I finally understand risk management.",
  },
  {
    id: "3",
    name: "Ahmed Al-Mansoori",
    location: "Dubai, UAE",
    profit: "$15,200",
    quote: "From losing money to making consistent profits. The strategies actually work in real markets.",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    location: "Nairobi, Kenya",
    profit: "$6,800",
    quote: "Best investment I ever made. The live sessions and Telegram community keep me motivated daily.",
  },
];

export default function SuccessStories() {
  return (
    <section className="space-y-12">
      <SectionHeading
        title="Success Stories"
        subtitle="Hear from traders who transformed their lives"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SUCCESS_STORIES.map((story, index) => (
          <RevealAnimation key={story.id} delay={index * 0.1}>
            <GlassCard className="p-6 hover:border-[#C9A646]/40 hover:shadow-[0_0_30px_rgba(201,166,70,0.2)] transition-all duration-300 group">
              {/* Gold accent line */}
              <div className="h-1 bg-gradient-to-r from-[#C9A646] via-[#F4D03F] to-[#C9A646] rounded-full mb-4" />
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A646] to-[#F4D03F] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Quote className="w-7 h-7 text-black" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-white text-lg group-hover:text-[#C9A646] transition-colors">
                        {story.name}
                      </h3>
                      <p className="text-sm text-white/60">{story.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#C9A646] font-bold text-xl">
                        {story.profit}
                      </p>
                      <p className="text-xs text-white/50">Profit</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    &quot;{story.quote}&quot;
                  </p>
                </div>
              </div>
            </GlassCard>
          </RevealAnimation>
        ))}
      </div>
    </section>
  );
}

