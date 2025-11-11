"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import Button from "@/components/shared/Button";
import placeholder from "@/utils/placeholders";
import React, { useState } from "react";
import { X } from "lucide-react";
import { useEnrollModal } from "@/components/shared/EnrollModalProvider";

type Course = {
  title: string;
  desc: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  icon: string;
  learnPoints: string[];
  trainerName: string;
  trainerImg: number;
};

const COURSES: Course[] = [
  {
    title: "Beginner to Pro Forex Mastery",
    desc: "Build your foundation and learn how the markets move.",
    duration: "8 Days Live Program",
    level: "Beginner",
    icon: "🧠",
    learnPoints: [
      "Understanding forex market fundamentals and currency pairs",
      "Reading charts and identifying market trends",
      "Basic trading strategies for consistent profits",
    ],
    trainerName: "Kiran Sharma",
    trainerImg: 0,
  },
  {
    title: "Technical Analysis & Chart Patterns",
    desc: "Master patterns and indicators used by professionals.",
    duration: "10 Days Live Program",
    level: "Intermediate",
    icon: "💹",
    learnPoints: [
      "Advanced chart patterns and technical indicators",
      "Price action analysis and entry/exit strategies",
      "Risk-reward ratio optimization",
    ],
    trainerName: "Sarah Johnson",
    trainerImg: 1,
  },
  {
    title: "Risk Management & Psychology",
    desc: "Protect capital and master the trader mindset.",
    duration: "7 Days Live Program",
    level: "Intermediate",
    icon: "🛡️",
    learnPoints: [
      "Position sizing and risk management techniques",
      "Emotional control and trading psychology",
      "Building a disciplined trading routine",
    ],
    trainerName: "Mike Chen",
    trainerImg: 2,
  },
  {
    title: "Advanced Trading Strategies",
    desc: "Unlock advanced techniques for consistency.",
    duration: "12 Days Live Program",
    level: "Advanced",
    icon: "⚡",
    learnPoints: [
      "Multi-timeframe analysis and strategy stacking",
      "Advanced order types and execution techniques",
      "Scaling strategies for growing accounts",
    ],
    trainerName: "Priya Patel",
    trainerImg: 0,
  },
  {
    title: "Live Trading Sessions",
    desc: "Watch real-time trades and live analysis.",
    duration: "Weekly Sessions",
    level: "All Levels",
    icon: "🎥",
    learnPoints: [
      "Real-time market analysis and trade setups",
      "Live Q&A with expert traders",
      "Review of actual trades and outcomes",
    ],
    trainerName: "Expert Team",
    trainerImg: 1,
  },
];

type CourseModalProps = {
  course: Course | null;
  onClose: () => void;
};

function CourseModal({ course, onClose }: CourseModalProps) {
  const { openModal } = useEnrollModal();
  
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl bg-black border border-white/10 rounded-3xl p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl">{course.icon}</div>
          <div>
            <h3 className="text-2xl font-bold">{course.title}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-white/70">{course.duration}</span>
              <span className="rounded-full border border-[#C9A646] px-3 py-1 text-xs text-[#C9A646]">{course.level}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">What you&apos;ll learn:</h4>
          <ul className="space-y-2">
            {course.learnPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-white/80">
                <span className="text-[#C9A646] mt-1">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <img
            src={placeholder("founder", course.trainerImg, "auto=format&fit=crop&w=80&h=80&q=80")}
            alt={course.trainerName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="text-sm text-white/70">Trainer</div>
            <div className="font-semibold">{course.trainerName}</div>
          </div>
        </div>

        <Button className="w-full" onClick={() => { onClose(); openModal(`Join Next Batch - ${course.title}`); }}>Join Next Batch →</Button>
      </div>
    </div>
  );
}

const PLANS = [
  {
    name: "Basic",
    duration: "7 Days",
    access: "Limited",
    liveAnalysis: false,
    fee: "Free",
  },
  {
    name: "Premium",
    duration: "Lifetime",
    access: "Full",
    liveAnalysis: true,
    fee: "$199",
  },
  {
    name: "Inner Circle",
    duration: "Lifetime + 1-on-1",
    access: "Full + Mentorship",
    liveAnalysis: true,
    fee: "$499",
  },
];

export default function CourseBreakdown() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <section className="space-y-8">
      <SectionHeading
        title="Your Learning Journey with WiFi Money"
        subtitle="Structured curriculum. Practical lessons. Real profits."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c) => (
          <GlassCard key={c.title} className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{c.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="rounded-full border border-[#C9A646] px-3 py-1 text-xs text-[#C9A646]">{c.level}</span>
                  <span className="text-xs text-white/70">{c.duration}</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">{c.title}</h4>
                <p className="text-sm text-white/70 mb-4">{c.desc}</p>
                <button
                  onClick={() => setSelectedCourse(c)}
                  className="text-sm text-[#C9A646] hover:text-[#F4D03F] transition-colors"
                >
                  View Details →
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Compare Plans Table */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-3xl md:text-4xl font-extrabold gradient-text-gold">Compare Plans</h3>
          <p className="text-white/70 text-sm md:text-base">Choose the plan that fits your trading journey</p>
        </div>
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <table className="w-full border-collapse min-w-[600px] md:min-w-0">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 font-semibold">Plan</th>
                <th className="text-left p-4 font-semibold">Duration</th>
                <th className="text-left p-4 font-semibold">Access</th>
                <th className="text-left p-4 font-semibold">Live Analysis</th>
                <th className="text-left p-4 font-semibold">Fee</th>
              </tr>
            </thead>
            <tbody>
              {PLANS.map((plan, idx) => (
                <tr key={plan.name} className={`border-b border-white/5 ${idx % 2 === 0 ? "bg-white/5" : ""}`}>
                  <td className="p-4 font-semibold">{plan.name}</td>
                  <td className="p-4 text-white/80">{plan.duration}</td>
                  <td className="p-4 text-white/80">{plan.access}</td>
                  <td className="p-4">{plan.liveAnalysis ? "✅" : "❌"}</td>
                  <td className="p-4 font-semibold text-[#C9A646]">{plan.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </section>
  );
}
