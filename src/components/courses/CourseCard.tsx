"use client";

import React from "react";
import GlassCard from "@/components/shared/GlassCard";
import Button from "@/components/shared/Button";
import { Clock, Users, BookOpen } from "lucide-react";

export type CourseCardData = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  modules: number;
  enrolled: number;
  icon: string;
  image?: string;
};

type CourseCardProps = {
  course: CourseCardData;
  onEnroll?: () => void;
};

export default function CourseCard({ course, onEnroll }: CourseCardProps) {
  const levelColors = {
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "All Levels": "bg-[#C9A646]/20 text-[#C9A646] border-[#C9A646]/30",
  };

  return (
    <GlassCard className="group p-0 overflow-hidden hover:border-[#C9A646]/40 hover:shadow-[0_0_30px_rgba(201,166,70,0.2)] transition-all duration-300 flex flex-col h-full">
      {/* Gold accent line at top */}
      <div className="h-1 bg-gradient-to-r from-[#C9A646] via-[#F4D03F] to-[#C9A646]" />
      
      {/* Image/Icon area with gradient overlay */}
      <div className="relative h-48 bg-gradient-to-br from-[#C9A646]/20 to-black flex items-center justify-center overflow-hidden flex-shrink-0">
        <div className="text-6xl group-hover:scale-110 transition-transform">{course.icon}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Level badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[course.level]}`}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 flex flex-col flex-1 min-h-0">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#C9A646] transition-colors line-clamp-3 min-h-[4.5rem]">
              {course.title}
            </h3>
            <p className="text-sm text-white/70 line-clamp-2">{course.description}</p>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-2 text-xs text-white/60 mb-4">
            <div className="flex items-center gap-2">
              <BookOpen size={14} />
              <span>{course.modules} Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>{course.enrolled.toLocaleString()}+ Enrolled</span>
            </div>
          </div>
        </div>

        {/* Enroll Now button - fixed at bottom */}
        <div className="mt-auto pb-[5px]">
          <Button
            onClick={onEnroll}
            className="w-full"
          >
            Enroll Now →
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}

