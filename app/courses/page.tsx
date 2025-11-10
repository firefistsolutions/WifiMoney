"use client";

import React from "react";
import RevealAnimation from "@/components/shared/RevealAnimation";
import CoursesList from "@/components/courses/CoursesList";
import SidebarCTA from "@/components/courses/SidebarCTA";
import { CourseCardData } from "@/components/courses/CourseCard";

const ALL_COURSES: CourseCardData[] = [
  {
    id: "1",
    title: "Beginner to Pro Forex Mastery",
    description: "Build your foundation and learn how the markets move with comprehensive lessons from basics to advanced strategies.",
    level: "Beginner",
    duration: "8 Weeks",
    modules: 12,
    enrolled: 2500,
    icon: "🧠",
  },
  {
    id: "2",
    title: "Technical Analysis & Chart Patterns",
    description: "Master patterns and indicators used by professionals to identify high-probability trade setups.",
    level: "Intermediate",
    duration: "6 Weeks",
    modules: 10,
    enrolled: 1800,
    icon: "💹",
  },
  {
    id: "3",
    title: "Risk Management & Psychology",
    description: "Protect capital and master the trader mindset with proven risk management techniques.",
    level: "Intermediate",
    duration: "4 Weeks",
    modules: 8,
    enrolled: 1500,
    icon: "🛡️",
  },
  {
    id: "4",
    title: "Advanced Trading Strategies",
    description: "Unlock advanced techniques for consistency including multi-timeframe analysis and strategy stacking.",
    level: "Advanced",
    duration: "10 Weeks",
    modules: 15,
    enrolled: 1200,
    icon: "⚡",
  },
  {
    id: "5",
    title: "Live Trading Sessions",
    description: "Watch real-time trades and live analysis with expert traders in weekly interactive sessions.",
    level: "All Levels",
    duration: "Weekly",
    modules: 0,
    enrolled: 5000,
    icon: "🎥",
  },
  {
    id: "6",
    title: "Forex Fundamentals Masterclass",
    description: "Deep dive into economic indicators, central bank policies, and market fundamentals that drive currency movements.",
    level: "Beginner",
    duration: "5 Weeks",
    modules: 9,
    enrolled: 2200,
    icon: "📊",
  },
];

export default function CoursesPage() {
  const handleEnroll = (course: CourseCardData) => {
    // Navigate to enroll page or open enrollment modal
    window.location.href = `/enroll?course=${course.id}`;
  };

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

      {/* Main Content Grid */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Courses List */}
          <div className="lg:col-span-3">
            <CoursesList
              courses={ALL_COURSES}
              onEnroll={handleEnroll}
            />
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <SidebarCTA />
          </div>
        </div>
      </section>
    </div>
  );
}
