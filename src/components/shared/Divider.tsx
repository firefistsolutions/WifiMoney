import React from "react";
import clsx from "clsx";

type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  gradient?: "gold" | "blue" | "none";
};

export function Divider({ className, gradient = "gold", ...rest }: DividerProps) {
  const bg =
    gradient === "gold"
      ? "bg-[linear-gradient(90deg,transparent,#C9A646,#F4D03F,transparent)]"
      : gradient === "blue"
      ? "bg-[linear-gradient(90deg,transparent,#0072FF,#00C6FF,transparent)]"
      : "bg-white/10";

  return <div className={clsx("h-px w-full", bg, className)} {...rest} />;
}

export default Divider;



