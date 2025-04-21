
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  isInView: boolean;
  className?: string;
}

const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  isInView,
  className = "",
}) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement || !isInView) {
      if (textElement) textElement.innerText = ""; // Reset khi ra khỏi tầm nhìn
      return;
    }

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;
    let interval: NodeJS.Timeout | null = null;

    const startAnimation = () => {
      clearInterval(interval as NodeJS.Timeout);

      interval = setInterval(() => {
        textElement.innerText = text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= text.length) {
          clearInterval(interval as NodeJS.Timeout);
        }

        iteration += 1 / 3;
      }, 30); // Cập nhật mỗi 30ms, giống mẫu
    };

    startAnimation();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInView, text]);

  return (
    <motion.h2
      ref={textRef}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
};

export default DecryptedText;
