"use client";

import React from "react";
import CourseCard, { CourseCardData } from "./CourseCard";
import RevealAnimation from "@/components/shared/RevealAnimation";

type CoursesListProps = {
  courses: CourseCardData[];
  onEnroll?: (course: CourseCardData) => void;
};

export default function CoursesList({ courses, onEnroll }: CoursesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {courses.map((course, index) => (
        <RevealAnimation key={course.id} delay={index * 0.1}>
          <CourseCard
            course={course}
            onEnroll={() => onEnroll?.(course)}
          />
        </RevealAnimation>
      ))}
    </div>
  );
}

