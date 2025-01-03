import { motion } from "framer-motion";
import TypingEffect from "react-typing-effect";
import BannerTopContentRight from "./banner-top-content-right";

const BannerTop = () => {
  return (
    <div className="w-full h-[1075px] relative bg-cover bg-no-repeat bg-banner-top-background">
      {/* Title */}
      <section className="flex flex-col gap-y-14 w-[550px] absolute left-[5%] 2xl:left-[15%] top-1/2 -translate-y-1/2 ">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-left text-[48px] font-semibold text-[#004C70]"
        >
          <TypingEffect
            text="HỆ THỐNG BKT LMS"
            speed={100}
            typingDelay={500}
            eraseSpeed={0}
            displayTextRenderer={(text) => (
              <span className="text-[32px] xl:text-[36px] 2xl:text-[48px] font-semibold">
                {text}
              </span>
            )}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-justify w-[430px] 2xl:w-[650px] text-[18px] xl:text-[20px] 2xl:text-[24px] text-[#004C70]"
        >
          Được xây dựng và phát triển bởi công ty Cổ Phần Đầu tư Thương Mại và
          công nghệ BKT. Nguồn học liệu số và các chức năng tiện ích trên
          website sẽ giúp người quản lý, nhà trường thuận tiện trong việc kiểm
          tra, đánh giá chất lượng an toàn trường học và giúp giáo viên, học
          sinh thuận tiện trong quá trình triển khai chương trình dạy học.
        </motion.p>
      </section>

      {/* Content right */}
      <BannerTopContentRight />
    </div>
  );
};

export default BannerTop;
