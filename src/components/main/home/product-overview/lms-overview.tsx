import { motion } from "motion/react";

type LMSOverviewProps = {
  lmsListFeatures: Array<{ title: string }>;
};

const LMSOverview: React.FC<LMSOverviewProps> = (props) => {
  return (
    <motion.div className="w-max flex items-center gap-x-64 mt-48">
      <section>
        <motion.h1
          className="font-semibold text-[36px]"
          initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and slightly below
          whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up to position
          transition={{ duration: 0.8, delay: 0.2 }} // Smooth transition with slight delay
        >
          Quản lý dạy học và thi trực tuyến LMS
        </motion.h1>

        <motion.ul
          className="flex flex-col gap-y-5 mt-4"
          initial={{ opacity: 0 }} // Start with opacity 0
          whileInView={{ opacity: 1 }} // Fade in when it enters the viewport
          transition={{
            duration: 1,
            delay: 0.5, // Delay to ensure smooth appearance after title
          }}
        >
          {props.lmsListFeatures.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-x-2"
              initial={{ opacity: 0, x: -100 }} // Start with opacity 0 and off to the left
              whileInView={{ opacity: 1, x: 0 }} // Slide in from the left with fade-in effect
              transition={{
                duration: 0.6,
                delay: index * 0.1, // Staggered delay for each list item
                ease: [0.25, 0.1, 0.25, 1], // Easing for a smooth effect
              }}
            >
              <img src="/gif/gif-12.gif" width={50} height={50} />
              <p className="text-[34px] font-normal">{feature.title}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <motion.img
        src="/lms-1.svg"
        loading="lazy"
        width={700}
        height={531}
        initial={{ opacity: 0, x: 100 }} // Start with opacity 0 and off to the right
        whileInView={{ opacity: 1, x: 0 }} // Slide in and fade in when it comes into view
        transition={{
          duration: 0.8,
          delay: 0.5, // Delay to match the list items
          ease: "easeOut", // Smooth easing
        }}
      />
    </motion.div>
  );
};

export default LMSOverview;
