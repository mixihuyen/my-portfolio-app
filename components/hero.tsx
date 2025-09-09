"use client";

import { useRef, useState } from "react";
import { Link } from "react-scroll";
import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import GradientText from "@/public/GradientText";
import GradientBorderWrapper from "@/public/GradientBorderWrapper";
import DecryptedText from "@/public/DecryptedText";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import profileAnimation from "@/public/profile-animation.json";

// Split text utility
const splitText = (text: string, type: "char" | "word") => {
  return type === "char"
    ? text.split("").map((char, index) => ({
        key: `${char}-${index}`,
        value: char === " " ? "\u00A0" : char,
      }))
    : text
        .split(" ")
        .map((word, index) => ({ key: `${word}-${index}`, value: word }));
};

// Animation variants
const charVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 15px rgba(22, 163, 74, 0.5)",
    transition: { duration: 0.3 },
  },
};

// Variants cho hiệu ứng ném avatar xuống
const avatarVariants = {
  hidden: {
    opacity: 0,
    y: -100,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.5,
      duration: 0.8,
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.3 },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 }); // Hỗ trợ scroll hai chiều
  const [showAvatar, setShowAvatar] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nameText = "Hello, I'm Mixi Huyen";
  const titleText = "Mobile Developer";
  const descriptionText =
    "I’m an aspiring mobile developer, focusing on iOS with Swift & SwiftUI, while also exploring cross-platform frameworks like Flutter and React Native. I’m eager to learn, build, and grow through creating apps that bring real value to users.";

  const nameChars = splitText(nameText, "char");
  const descriptionWords = splitText(descriptionText, "word");

  const handleLottieComplete = () => {
    setIsFlipped(true);
    setTimeout(() => setShowAvatar(true), 500);
  };

  const handleImageClick = () => {
    if (showAvatar) setIsModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center justify-center py-16 relative px-4"
    >
      <div className="container flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 py-12 max-w-6xl">
        {/* Avatar */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "exit"}
          variants={avatarVariants}
        >
          <GradientBorderWrapper
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            borderSize={2}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 shadow-lg cursor-pointer flex-shrink-0 rounded-full"
          >
            <motion.div
              className="w-full h-full rounded-full overflow-hidden"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ perspective: 1000 }}
              onClick={handleImageClick}
            >
              {showAvatar ? (
                <motion.img
                  src="/avt.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{ duration: 0 }}
                  style={{ transformStyle: "preserve-3d" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {profileAnimation ? (
                    <Lottie
                      animationData={profileAnimation}
                      loop={false}
                      onComplete={handleLottieComplete}
                      className="w-3/4 h-3/4 md:w-40 md:h-40 object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 animate-pulse rounded-full" />
                  )}
                </div>
              )}
            </motion.div>
          </GradientBorderWrapper>
        </motion.div>

        {/* Texts */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start">
          {/* Animated Gradient Name */}
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            <h1>
              {nameChars.map((char, index) => (
                <motion.span
                  key={char.key}
                  custom={index}
                  variants={charVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "exit"}
                  className="inline-block"
                >
                  {char.value}
                </motion.span>
              ))}
            </h1>
          </GradientText>

          {/* Job Title với DecryptedText */}
          <DecryptedText
            text={titleText}
            isInView={isInView}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-green-700 mb-6"
          />

          {/* Description */}
          <p className="text-base sm:text-lg text-green-700 max-w-2xl mb-8 px-4 md:px-0">
            {descriptionWords.map((word, index) => (
              <motion.span
                key={word.key}
                custom={index}
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? "visible" : "exit"}
                className="inline-block mr-1 relative"
              >
                {word.value}
                <motion.span
                  className="absolute -top-1 -right-1 w-1 h-1 bg-green-500 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          x: [0, 5, 10],
                          y: [0, -5, -10],
                        }
                      : { opacity: 0 }
                  }
                  transition={{
                    delay: index * 0.04 + 0.2,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                />
              </motion.span>
            ))}
          </p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial="hidden"
            animate={isInView ? "visible" : "exit"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
              exit: { opacity: 0, transition: { duration: 0.3 } },
            }}
          >
            {/* View Projects */}
  <Link
    to="projects"
    smooth={true}
    duration={500}
    className="cursor-pointer"
  >
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 hover:shadow-md hover:shadow-green-200"
    >
      View Projects
    </motion.div>
  </Link>

  {/* Contact Me */}
  <Link
    to="contact"
    smooth={true}
    duration={500}
    className="cursor-pointer"
  >
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      className="border border-green-600 text-green-600 px-6 py-2 rounded-md hover:bg-green-100 hover:shadow-md hover:shadow-green-200"
    >
      Contact Me
    </motion.div>
  </Link>
          </motion.div>
        </div>

        {/* Scroll down arrow */}
        <Link
          to="about"
          smooth={true}
          duration={500}
          className="absolute bottom-8 animate-bounce cursor-pointer"
        >
          <motion.div
            animate={{ rotate: isModalOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </motion.div>
        </Link>
      </div>

      {/* Modal Avatar Full */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative max-w-xl w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/avt.png"
                alt="Profile Large"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
