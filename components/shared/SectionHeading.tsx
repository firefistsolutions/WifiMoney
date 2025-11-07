import React from "react";
import clsx from "clsx";

type SectionHeadingProps = {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
};

export function SectionHeading({ overline, title, subtitle, align = "center", className }: SectionHeadingProps) {
  const alignment = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <div className={clsx("flex flex-col gap-3", alignment, className)}>
      {overline && <span className="text-sm tracking-wide text-[#C9A646]">{overline}</span>}
      <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">{title}</h2>
      {subtitle && <p className="max-w-2xl text-balance text-white/70">{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;



