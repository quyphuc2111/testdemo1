import { motion } from "motion/react";

type BKTForumOverviewProps = {
  forumListFeatures: Array<{ title: string }>;
};

const BKTForumOverview: React.FC<BKTForumOverviewProps> = (props) => {
  return (
    <motion.div className="w-max h-max flex items-center gap-x-64 mt-56">
      <motion.img
        src="/forum-1.svg"
        loading="lazy"
        width={700}
        height={531}
        initial={{ opacity: 0, x: 100 }} // Start with opacity 0 and slide from right
        whileInView={{ opacity: 1, x: 0 }} // Fade in and slide to original position
        transition={{
          duration: 0.8,
          delay: 0.5, // Delay to sync with the list items
          ease: "easeOut", // Smooth easing
        }}
      />

      <section>
        <motion.h1
          className="font-semibold text-[36px]"
          initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and slightly below
          whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up to position
          transition={{ duration: 0.8, delay: 0.2 }} // Smooth transition with slight delay
        >
          BKT FORUM
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
          {props.forumListFeatures.map((feature, index) => (
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
              <span className="text-[34px] font-normal">{feature.title}</span>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </motion.div>
  );
};

export default BKTForumOverview;
