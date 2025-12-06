"use client";

import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";

type TypingEffectProps = {
  text: string;
  speed?: number;
  typingDelay?: number;
  className?: string;
};

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 80,
  typingDelay = 0,
  className,
}) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Typewriter
        words={[text]}
        typeSpeed={speed}
        delaySpeed={typingDelay + 800}
        deleteSpeed={80}
        cursor={true}
        cursorColor="#014C70"
        cursorStyle="|"
        loop={0}
      />
    </motion.span>
  );
};

export default TypingEffect;
