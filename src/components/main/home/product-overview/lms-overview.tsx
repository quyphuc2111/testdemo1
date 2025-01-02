import { motion } from "motion/react";

type LMSOverviewProps = {
  lmsListFeatures: Array<{ title: string }>;
};

const LMSOverview: React.FC<LMSOverviewProps> = (props) => {
  return (
    <motion.div className="w-max flex items-center gap-x-14 xl:gap-x-24 2xl:gap-x-64 mt-48">
      <section>
        <motion.h1
          className="font-semibold text-[24px] xl:text-[28px]  2xl:text-[36px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Quản lý dạy học và thi trực tuyến LMS
        </motion.h1>

        <motion.ul
          className="flex flex-col gap-y-5 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
        >
          {props.lmsListFeatures.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-x-2"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <img src="/gif/gif-12.gif" width={50} height={50} />
              <p className="text-[20px] xl:text-[22px] 2xl:text-[34px] font-normal">
                {feature.title}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <div className="rounded-xl overflow-hidden w-max h-max">
        <motion.img
          src="/lms-1.svg"
          className="rounded-xl overflow-hidden 2xl:w-[700px] 2xl:h-[531px] w-max h-[431px]"
          loading="lazy"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
};

export default LMSOverview;
