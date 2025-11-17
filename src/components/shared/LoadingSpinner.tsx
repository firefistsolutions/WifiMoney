import React from "react";
import clsx from "clsx";

type LoadingSpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: number;
};

export function LoadingSpinner({ className, size = 24, ...rest }: LoadingSpinnerProps) {
  return (
    <div
      className={clsx(
        "animate-spin rounded-full border-2 border-white/30 border-t-white", 
        className
      )}
      style={{ width: size, height: size }}
      {...rest}
    />
  );
}

export default LoadingSpinner;



