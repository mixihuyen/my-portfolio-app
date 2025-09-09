"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import AnimatedBackground from "./animated-background"
import GradientText from "@/public/GradientText"

interface IntroAnimationProps {
  onComplete: () => void
  duration?: number
}

export default function IntroAnimation({ onComplete, duration = 3000 }: IntroAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const welcomeText = "Welcome to"
  const portfolioText = "My Portfolio"
  const subText = "explore my work and discover who I am."

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 100)
    const timer2 = setTimeout(() => setCurrentStep(2), 1000)
    const timer3 = setTimeout(() => setCurrentStep(3), 1500)
    const timer4 = setTimeout(() => {
      setIsComplete(true)
      setTimeout(onComplete, 800)
    }, duration)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [duration, onComplete])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: { duration: 1, ease: "easeInOut" },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  const decorationVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  }

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br flex items-center justify-center z-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Background */}
          <AnimatedBackground />

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent/60 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${40 + (i % 2) * 15}%`,
                willChange: "transform, opacity",
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [0.6, 1, 0.6],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Main Content */}
          <div className="text-center px-2 sm:px-4 max-w-screen-sm sm:max-w-4xl relative z-10">
            {currentStep >= 0 && (
              <motion.div variants={textVariants} initial="hidden" animate="visible" className="mb-4 sm:mb-8">
                <h1 className="text-xl sm:text-3xl md:text-5xl text-emerald-700 font-light tracking-wide mx-auto">
                  {welcomeText.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                      style={{ transformOrigin: "center bottom" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>
            )}

            {currentStep >= 1 && (
              <motion.div variants={textVariants} initial="hidden" animate="visible" className="mb-6 sm:mb-12 relative flex justify-center">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="text-3xl sm:text-6xl md:text-9xl font-bold inline-block"
                >
                  <h2 className="text-center">{portfolioText}</h2>
                </GradientText>

                <motion.div
                  className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "90%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </motion.div>
            )}

            {currentStep >= 2 && (
              <motion.div variants={textVariants} initial="hidden" animate="visible" className="mb-8 sm:mb-20">
                <motion.p
                  className="text-base sm:text-2xl md:text-3xl text-blue-600 font-light tracking-wide mx-auto max-w-md sm:max-w-2xl"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {subText}
                </motion.p>
              </motion.div>
            )}
          </div>

          {/* Decorative corner elements */}
          <motion.div
            className="absolute top-4 sm:top-8 left-4 sm:left-8 w-12 sm:w-24 h-12 sm:h-24 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-emerald-500 rounded-tl-lg"
            style={{ willChange: "transform, opacity" }}
            variants={decorationVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 sm:w-24 h-12 sm:h-24 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-blue-500 rounded-br-lg"
            style={{ willChange: "transform, opacity" }}
            variants={decorationVariants}
            initial="hidden"
            animate="visible"
          />

          <motion.div
            className="absolute top-1/4 right-1/4 w-20 sm:w-32 h-20 sm:h-32 bg-emerald-500/20 rounded-full blur-md sm:blur-xl"
            style={{ willChange: "transform, opacity" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/5 w-16 sm:w-24 h-16 sm:h-24 bg-blue-500/20 rounded-full blur-md sm:blur-lg"
            style={{ willChange: "transform, opacity" }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}