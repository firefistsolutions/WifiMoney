"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "glass" | "outline";
  isLoading?: boolean;
};

export function Button({
  className,
  children,
  variant = "primary",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const base = "relative inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A646] disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-[linear-gradient(135deg,#C9A646_0%,#F4D03F_100%)] text-black hover:shadow-[0_0_40px_rgba(201,166,70,0.5)] hover:scale-[1.03]",
    glass:
      "backdrop-blur-xl border border-white/20 text-white bg-white/5 hover:bg-white/10",
    outline:
      "border-2 border-[#C9A646] text-[#C9A646] hover:bg-[#C9A646] hover:text-black",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-black" />
        )}
        {children}
      </span>
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-[1200ms] [mask-image:linear-gradient(black,black)] hover:translate-x-[200%]" />
      )}
    </button>
  );
}

export default Button;


