"use client";

import React, { useState } from "react";
import RevealAnimation from "@/components/shared/RevealAnimation";
import GlassCard from "@/components/shared/GlassCard";
import Button from "@/components/shared/Button";
import { Clock, Users, BookOpen, Calendar } from "lucide-react";
import { useEnrollModal } from "@/components/shared/EnrollModalProvider";

const CURRICULUM = [
  {
    week: 1,
    days: [
      { day: 1, title: "Basics of Forex" },
      { day: 2, title: "Forex Terminology" },
      { day: 3, title: "MT5 Operations" },
      { day: 4, title: "Fundamental and Sentimental Analysis" },
      { day: 5, title: "Q&A Session" },
    ],
  },
  {
    week: 2,
    days: [
      { day: 1, title: "Candlestick Pattern" },
      { day: 2, title: "Trend Analysis" },
      { day: 3, title: "Supply and Demand Zone" },
      { day: 4, title: "Trade Setup with Trend and Zone" },
      { day: 5, title: "Q&A Session" },
    ],
  },
  {
    week: 3,
    days: [
      { day: 1, title: "Structure Mapping" },
      { day: 2, title: "Imbalance (FVG), Order Block" },
      { day: 3, title: "Fibonacci and FVG" },
      { day: 4, title: "POI Identification and Trade Execution" },
      { day: 5, title: "Q&A Session" },
    ],
  },
];

const COURSE = {
  id: "1",
  title: "Forex Trading Mastery Program",
  description: "A comprehensive 3-week program designed to take you from beginner to confident trader. Learn the fundamentals, technical analysis, and advanced trading strategies with hands-on practice and expert guidance.",
  level: "Beginner" as const,
  duration: "3 Weeks",
  modules: 15,
  enrolled: 2500,
  icon: "📈",
};

export default function CoursesPage() {
  const { openModal } = useEnrollModal();
  const [activeWeek, setActiveWeek] = useState(1);
  
  const handleEnroll = () => {
    openModal(`Enroll in ${COURSE.title}`);
  };

  const activeWeekData = CURRICULUM.find((week) => week.week === activeWeek);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#C9A646]/10 via-black to-black p-12 md:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0072FF]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 text-center space-y-4">
          <RevealAnimation>
            <h1 className="text-4xl md:text-6xl font-extrabold gradient-text-gold">
              WiFi Money<br />
              Learning<br />
              Hub
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              World-class forex education<br />
              designed for results
            </p>
          </RevealAnimation>
        </div>
      </section>

      {/* Main Content */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Card */}
          <div className="lg:col-span-1">
            <RevealAnimation>
              <GlassCard className="p-0 overflow-hidden hover:border-[#C9A646]/40 hover:shadow-[0_0_30px_rgba(201,166,70,0.2)] transition-all duration-300 flex flex-col h-full">
                {/* Gold accent line at top */}
                <div className="h-1 bg-gradient-to-r from-[#C9A646] via-[#F4D03F] to-[#C9A646]" />
                
                {/* Image/Icon area with gradient overlay */}
                <div className="relative h-48 bg-gradient-to-br from-[#C9A646]/20 to-black flex items-center justify-center overflow-hidden flex-shrink-0">
                  <div className="text-6xl">{COURSE.icon}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Level badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-green-500/20 text-green-400 border-green-500/30">
                      {COURSE.level}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pt-6 flex flex-col flex-1 min-h-0">
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#C9A646] transition-colors">
                        {COURSE.title}
                      </h3>
                      <p className="text-sm text-white/70">{COURSE.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col gap-2 text-xs text-white/60 mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} />
                        <span>{COURSE.modules} Modules</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{COURSE.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} />
                        <span>{COURSE.enrolled.toLocaleString()}+ Enrolled</span>
                      </div>
                    </div>
                  </div>

                  {/* Enroll Now button - fixed at bottom */}
                  <div className="mt-auto pb-[5px]">
                    <Button
                      onClick={handleEnroll}
                      className="w-full"
                    >
                      Enroll Now →
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </RevealAnimation>
          </div>

          {/* Curriculum Section */}
          <div className="lg:col-span-2">
            <RevealAnimation>
              <GlassCard className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="text-[#C9A646]" size={24} />
                  <h2 className="text-2xl font-bold">Course Curriculum</h2>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-white/10">
                  {CURRICULUM.map((week) => (
                    <button
                      key={week.week}
                      onClick={() => setActiveWeek(week.week)}
                      className={`relative px-6 py-3 font-semibold transition-all duration-300 ${
                        activeWeek === week.week
                          ? "text-[#C9A646]"
                          : "text-white/60 hover:text-white/80"
                      }`}
                    >
                      <span>Week {week.week}</span>
                      {activeWeek === week.week && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C9A646] to-[#F4D03F]" />
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Curriculum Content */}
                {activeWeekData && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A646] to-[#F4D03F] flex items-center justify-center text-black font-bold">
                        {activeWeekData.week}
                      </div>
                      <h3 className="text-xl font-semibold text-[#C9A646]">
                        Week {activeWeekData.week}
                      </h3>
                    </div>
                    
                    <div className="space-y-2 pl-4">
                      {activeWeekData.days.map((day) => (
                        <div
                          key={day.day}
                          className="flex items-start gap-3 py-2 hover:bg-white/5 rounded-lg px-3 transition-colors"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white/80">
                            {day.day}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-white/90">{day.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCard>
            </RevealAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}

