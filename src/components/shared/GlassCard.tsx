import React from "react";
import clsx from "clsx";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  noHover?: boolean;
};

export function GlassCard({ as: Tag = "div", className, children, noHover = false, ...rest }: GlassCardProps) {
  return (
    <Tag
      className={clsx(
        "relative rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 overflow-hidden",
        !noHover && "hover:shadow-[0_0_40px_rgba(201,166,70,0.3)] hover:scale-[1.02]",
        className
      )}
      {...rest}
    >
      {!noHover && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(201,166,70,0.12)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}

export default GlassCard;



