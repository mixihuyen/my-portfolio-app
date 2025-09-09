"use client";
import { Leaf, Code, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import AboutData from "@/public/about.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false, 
});

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 }, // Reduced x translation for smaller screens
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.2, // Reduced delay for smoother mobile experience
      },
    }),
  };

  return (
    <section id="about" className="py-12 bg-white/50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 md:px-30">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full lg:w-1/2">
            <div>
              <p className="text-base sm:text-lg text-green-700 mb-4">
                Hi, I&apos;m an aspiring mobile developer who loves turning ideas into apps people enjoy using. My current focus is iOS development with Swift & SwiftUI, but I also explore cross-platform solutions like Flutter and React Native.
              </p>
              <p className="text-base sm:text-lg text-green-700 mb-4">
                As an intern-level developer, I may still be early in my journey,
                 but I&apos;m eager to learn, build, and grow through real projects. 
                 Each line of code is a chance for me to improve and bring meaningful value to users.
              </p>
              <p className="text-base sm:text-lg text-green-700">
                Beyond coding, I enjoy connecting with nature and seeking balance. This mindset also shapes how I approach development — aiming for clean, efficient, and sustainable solutions.
              </p>
            </div>
            <div className="w-full ">
              <Lottie
                animationData={AboutData}
                loop={true}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            {[0, 1, 2].map((index: number) => (
              <motion.div
                key={index}
                className="border border-green-300 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                custom={index}
                whileHover={{
                  y: -8,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3 },
                }}
              >
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <motion.div
                        className="bg-green-100 p-2 sm:p-3 rounded-full"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        {index === 0 && (
                          <Code className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                        )}
                        {index === 1 && (
                          <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                        )}
                        {index === 2 && (
                          <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                        )}
                      </motion.div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">
                          {index === 0
                            ? "App Development"
                            : index === 1
                            ? "Clean & Sustainable Design"
                            : "Passion for Learning"}
                        </h3>
                        <p className="text-sm sm:text-base text-green-700">
                          {index === 0
                            ? "I focus on building mobile apps with Swift & SwiftUI, and also have experience experimenting with Flutter and React Native for cross-platform development. My priority is performance, design consistency, and usability."
                            : index === 1
                            ? "I believe apps should be not only functional but also lightweight and optimized. Writing clean code and designing with efficiency helps create products that are reliable and sustainable over time."
                            : "I’m always curious about new tools, frameworks, and design patterns. Continuous learning keeps me growing as a developer and helps me bring fresh ideas into every project I work on."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
