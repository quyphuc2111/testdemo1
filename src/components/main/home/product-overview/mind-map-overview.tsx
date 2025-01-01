import { AnimatePresence, motion } from "motion/react";

type MindMapOverviewProps = {
  mindMapFeatures: Array<{ title: string }>;
};

const MindMapOverview: React.FC<MindMapOverviewProps> = (props) => {
  return (
    <div className="w-full h-[1080px] flex items-center justify-center bg-mindmap-background bg-no-repeat bg-contain">
      <motion.div
        className="w-full h-full flex items-center justify-center gap-x-64"
        initial={{ opacity: 0 }} // Ban đầu ẩn
        whileInView={{ opacity: 1 }} // Khi vào viewport sẽ xuất hiện
        transition={{ duration: 1, ease: "easeInOut" }} // Thời gian và easing
      >
        <section>
          <motion.h1
            className="font-semibold text-[36px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Mindmap
          </motion.h1>

          <motion.ul
            className="flex flex-col gap-y-5 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {props.mindMapFeatures.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-x-2"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <img src="/gif/gif-12.gif" width={50} height={50} />
                <span className="text-[34px] font-normal">{feature.title}</span>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        <AnimatePresence>
          <motion.img
            src="/mindmap-1.svg"
            loading="lazy"
            width={700}
            height={531}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.5,
            }}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MindMapOverview;
