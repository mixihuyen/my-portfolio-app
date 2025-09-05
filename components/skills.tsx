"use client";

import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const pondRef = useRef<HTMLDivElement>(null);
  const [fishes, setFishes] = useState<
    Array<{
      skill: string;
      x: number;
      y: number;
      speed: number;
      direction: number;
      color: string;
      size: number;
    }>
  >([]);

  const skills = [
    "Flutter",
    "React Native",
    "React JS",
    "Java Android",
    "Switf",
    "Swift UI",
    "JavaScript",
    "Dart",
    "TypeScript",
    "UI/UX Design",
    "Firebase",
    "RESTful APIs",
    "Git",
    "Redux",
    "Node.js",
  ];

  const colors = [
    "bg-orange-400",
    "bg-yellow-400",
    "bg-red-400",
    "bg-pink-400",
    "bg-purple-400",
    "bg-blue-400",
    "bg-cyan-400",
    "bg-teal-400",
  ];

  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true; // Đánh dấu đã chạy
            initFishes();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const initFishes = () => {
    if (!pondRef.current) return;

    const pondWidth = pondRef.current.offsetWidth;
    const pondHeight = pondRef.current.offsetHeight;

    const newFishes = skills.map((skill) => {
      return {
        skill,
        x: Math.random() * (pondWidth - 100),
        y: Math.random() * (pondHeight - 50),
        speed: 1.0, // Slower speed
        direction: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.95 + Math.random() * 0.1,
      };
    });

    setFishes(newFishes);
    animateFishes();
  };

  const animateFishes = () => {
    if (!pondRef.current) return;

    const pondWidth = pondRef.current.offsetWidth;
    const pondHeight = pondRef.current.offsetHeight;

    let animationFrameId: number;

    const updateFishPositions = () => {
      setFishes((prevFishes) => {
        return prevFishes.map((fish) => {
          // Calculate new position
          const newX = fish.x + Math.cos(fish.direction) * fish.speed;
          const newY = fish.y + Math.sin(fish.direction) * fish.speed;
          let newDirection = fish.direction;

          // Check boundaries and change direction if needed
          if (newX < 0 || newX > pondWidth - 100) {
            newDirection = Math.PI - newDirection;
          }

          if (newY < 0 || newY > pondHeight - 50) {
            newDirection = -newDirection;
          }

          // Occasionally change direction randomly for more natural movement
          if (Math.random() < 0.01) {
            // Reduced from 0.02 for more stable movement
            newDirection += (Math.random() - 0.5) * 0.3; // Reduced from 0.5 for gentler turns
          }

          return {
            ...fish,
            x: newX,
            y: newY,
            direction: newDirection,
          };
        });
      });

      animationFrameId = requestAnimationFrame(updateFishPositions);
    };

    updateFishPositions();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Skills
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto"></div>
          <p className="mt-4 text-lg text-green-700 max-w-2xl mx-auto">
            Technologies and skills I&apos;ve worked with and mastered in my
            mobile app development journey.
          </p>
        </div>

        <div
          ref={pondRef}
          className="relative mx-auto w-full max-w-4xl h-[500px] rounded-xl overflow-hidden bg-gradient-to-b from-blue-300 to-blue-500 shadow-xl"
        >
          {/* Water surface effect */}
          <div className="absolute top-0 left-0 w-full h-12 bg-blue-200 opacity-30 animate-pulse"></div>

          {/* Water plants */}
          <div className="absolute bottom-0 left-10 w-16 h-32 bg-green-700 rounded-t-full opacity-60"></div>
          <div className="absolute bottom-0 left-20 w-12 h-24 bg-green-600 rounded-t-full opacity-50"></div>
          <div className="absolute bottom-0 right-10 w-14 h-28 bg-green-700 rounded-t-full opacity-60"></div>
          <div className="absolute bottom-0 right-24 w-10 h-20 bg-green-600 rounded-t-full opacity-50"></div>

          {/* Rocks */}
          <div className="absolute bottom-2 left-1/3 w-16 h-10 bg-gray-600 rounded-full opacity-70"></div>
          <div className="absolute bottom-3 right-1/3 w-20 h-12 bg-gray-700 rounded-full opacity-60"></div>

          {/* Bubbles */}
          <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-bubble1"></div>
          <div className="absolute bottom-10 left-1/2 w-3 h-3 bg-white rounded-full opacity-50 animate-bubble2"></div>
          <div className="absolute bottom-5 right-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-bubble3"></div>

          {/* Fish */}
          {fishes.map((fish, index) => (
            <div
              key={index}
              className="absolute transition-transform duration-500" // Increased duration for smoother movement
              style={{
                left: `${fish.x}px`,
                top: `${fish.y}px`,
                transform: `scale(${fish.size})`,
                zIndex: 10,
              }}
            >
              <div className="relative flex items-center">
                {/* Fish body - simple rectangle with rounded corners */}
                <div
                  className={`${fish.color} rounded-md px-4 py-2 flex items-center justify-center shadow-md`}
                >
                  <span className="text-sm font-bold text-white drop-shadow-md whitespace-nowrap">
                    {fish.skill}
                  </span>
                </div>

                {/* Small bubble from fish */}
                {Math.random() > 0.8 && (
                  <div className="absolute right-0 -top-2 w-1 h-1 bg-white rounded-full opacity-70 animate-bubble1"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
