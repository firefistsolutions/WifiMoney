import React from "react";
import clsx from "clsx";

type IconBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function IconBox({ children, className, ...rest }: IconBoxProps) {
  return (
    <div
      className={clsx(
        "flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#1A1A1A] text-[#C9A646] shadow-[20px_20px_60px_#0d0d0d,-20px_-20px_60px_#272727]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}



