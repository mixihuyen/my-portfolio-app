import React from "react";

interface GradientBorderWrapperProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  borderSize?: number;
}

export default function GradientBorderWrapper({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 4,
  borderSize = 4,
}: GradientBorderWrapperProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center aspect-square w-full ${className}`}
    >
      <div
        className="absolute inset-0 animate-spin-gradient rounded-[inherit] z-0"
        style={{
          background: `conic-gradient(${colors.join(", ")})`,
          animationDuration: `${animationSpeed}s`,
          margin: `-${borderSize}px`,
        }}
      />
      <div
        className="relative z-10 bg-white rounded-[inherit] flex items-center justify-center w-full h-full overflow-hidden"
        style={{ margin: `${borderSize}px` }}
      >
        {children}
      </div>
    </div>
  );
}
