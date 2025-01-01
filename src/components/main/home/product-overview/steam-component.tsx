import { motion } from "motion/react";
import TypingEffect from "react-typing-effect";

type steamComponentProps = {
  stemListFeatures: Array<{ title: string }>;
};

const StemOverview: React.FC<steamComponentProps> = (props) => {
  return (
    <motion.div
      className="w-full h-[1080px] flex items-center justify-center gap-x-64 bg-stem-background bg-no-repeat bg-contain"
      initial={{ opacity: 0 }} // Initial opacity set to 0
      whileInView={{ opacity: 1 }} // Appear when in the viewport
      transition={{ duration: 1, ease: "easeInOut" }} // Apply the same duration and easing as the "Mindmap" section
    >
      <div className="rounded-xl overflow-hidden">
        <motion.img
          className="rounded-xl"
          src="/stem-1.svg"
          loading="lazy"
          width={680}
          height={600}
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        />
      </div>

      <section className="-translate-y-12">
        <motion.h1
          className="font-semibold text-[36px]"
          initial={{ opacity: 0, y: 50 }} // Start with offset
          whileInView={{ opacity: 1, y: 0 }} // Transition to its original position
          transition={{ duration: 0.8, delay: 0.2 }} // Apply the same timing as the "Mindmap" title
        >
          <TypingEffect
            text="STEM"
            speed={100}
            typingDelay={500}
            eraseSpeed={0}
            displayTextRenderer={(text) => (
              <span className="text-[36px] font-semibold">{text}</span>
            )}
          />
        </motion.h1>

        <motion.ul
          className="flex flex-col gap-y-5 mt-4 min-w-[400px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.5, // Add delay to match "Mindmap" effect
          }}
        >
          {props.stemListFeatures.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-x-2"
              initial={{ opacity: 0, x: -100 }} // Start with offset
              whileInView={{ opacity: 1, x: 0 }} // Transition to the center
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1], // Apply similar easing for consistency
              }}
            >
              <img src="/gif/gif-12.gif" width={50} height={50} />
              <motion.span
                className="text-[34px] font-normal"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                <p>{feature.title}</p>
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </motion.div>
  );
};

export default StemOverview;
