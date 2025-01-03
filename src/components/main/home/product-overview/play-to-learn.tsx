import { motion } from "framer-motion";
import TypingEffect from "react-typing-effect";

type PlayToLearnProps = {
  playToLearnListFeatures: Array<{ title: string }>;
};

const PlayToLearn: React.FC<PlayToLearnProps> = (props) => {
  return (
    <motion.div
      className="w-full h-[670px] xl:h-[760px] 2xl:h-[1080px] flex items-center justify-center gap-x-14 xl:gap-x-24 2xl:gap-x-52 mt-60 bg-play-and-learn-background bg-no-repeat bg-contain"
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
            text="Play to learn"
            speed={100}
            typingDelay={500}
            eraseSpeed={0}
            displayTextRenderer={(text) => (
              <span className="text-[24px] xl:text-[28px]  2xl:text-[36px] font-semibold">
                {text}
              </span>
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
                delay: index * 0.2,
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
                className="text-[20px] xl:text-[22px] 2xl:text-[34px] font-normal"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.2, // Delay cho phần text của li
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                <p>{feature.title}</p>
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <div className="rounded-xl overflow-hidden">
        <motion.img
          className="rounded-xl overflow-hidden 2xl:w-[665px] 2xl:h-[480px] xl:w-max w-[500px] xl:h-[431px] h-[360px]"
          src="/playtolearn.jpg"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
};

export default PlayToLearn;
