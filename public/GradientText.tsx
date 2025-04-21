import React, { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: `gradient ${animationSpeed}s linear infinite`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
  };

  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div
        className={`relative flex max-w-fit flex-row  font-medium backdrop-blur transition-shadow duration-500 overflow-hidden ${className}`}
      >
        {showBorder && (
          <div
            className="absolute inset-0 bg-cover z-0 pointer-events-none"
            style={{
              ...gradientStyle,
              animation: `gradient ${animationSpeed}s linear infinite`,
            }}
          >
            <div
              className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
              style={{
                width: "calc(100% - 2px)",
                height: "calc(100% - 2px)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        )}
        <div
          className="inline-block relative z-2 text-transparent"
          style={gradientStyle}
        >
          {children}
        </div>
      </div>
    </>
  );
}
