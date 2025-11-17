"use client";

import React from "react";
import { X } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import { CourseCardData } from "./CourseCard";

type CurriculumModalProps = {
  course: CourseCardData | null;
  onClose: () => void;
};

export default function CurriculumModal({ course, onClose }: CurriculumModalProps) {
  if (!course) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-black border border-white/10 rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
            <p className="text-white/70">{course.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Curriculum</h3>
            <p className="text-white/60">Curriculum details will be displayed here.</p>
            {/* Stub: Add actual curriculum content later */}
          </div>
        </div>
      </div>
    </div>
  );
}

