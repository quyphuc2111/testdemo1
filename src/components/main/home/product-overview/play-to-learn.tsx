import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TypingEffect from "react-typing-effect";

type PlayToLearnProps = {
  playToLearnListFeatures: Array<{ title: string }>;
};

const PlayToLearn: React.FC<PlayToLearnProps> = (props) => {
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingDone(true); // Sau 2s, kích hoạt typing cho các mục li
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="w-full h-[1080px] flex items-center justify-center gap-x-64 mt-60 bg-play-and-learn-background bg-no-repeat bg-contain"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        type: "spring",
        stiffness: 150,
      }}
    >
      <motion.section
        className="min-w-[700px]"
        initial={{ opacity: 0, y: 50, rotate: -15 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          duration: 1.8,
          type: "spring",
          stiffness: 120,
          damping: 25,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="font-semibold text-[36px]"
          initial={{ opacity: 0, scale: 0.8, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 1.5,
            stiffness: 200,
            damping: 30,
          }}
        >
          <TypingEffect
            text="Learn to game"
            speed={100}
            typingDelay={500}
            eraseSpeed={0}
            displayTextRenderer={(text) => (
              <span className="text-[36px] font-semibold">{text}</span>
            )}
          />
        </motion.h1>

        <motion.ul
          className="flex flex-col gap-y-5 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          {props.playToLearnListFeatures.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-x-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: typingDone ? 0.3 + index * 0.2 : 0,
              }}
            >
              <motion.div
                className="min-w-[50px]" // Duy trì kích thước ảnh ổn định
                initial={{ opacity: 0, rotate: 90, x: -30 }}
                animate={{ opacity: 1, rotate: 0, x: 0 }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                }}
              >
                <motion.img
                  src="/gif/gif-12.gif"
                  width={50}
                  height={50}
                  alt="feature-icon"
                />
              </motion.div>
              <motion.span
                className="text-[34px] font-normal"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: typingDone ? 0.5 + index * 0.2 : 0, // Delay cho phần text của li
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                {typingDone ? (
                  <TypingEffect
                    text={feature.title}
                    speed={90}
                    typingDelay={500}
                    eraseSpeed={100}
                    displayTextRenderer={(text) => <span>{text}</span>}
                  />
                ) : (
                  <span>{feature.title}</span> // Nếu chưa hoàn thành typing tiêu đề thì không hiển thị typing
                )}
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.div
        className=""
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        viewport={{ amount: 0.5 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <motion.img
          src="/playtolearn-1.svg"
          loading="lazy"
          width={700}
          height={531}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1.1,
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          viewport={{ amount: 0.5 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default PlayToLearn;
