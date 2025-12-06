"use client";

import { motion } from "motion/react";
import Image from "next/image";

const featureItems: Array<{
  image: string;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
  delay: number;
}> = [
  {
    image: "/images/virtual-class.png",
    title: "Hệ thống LMS",
    description: "Quản lý học tập toàn diện",
    bgColor: "bg-[#FFEED8]",
    borderColor: "border-[#FFDEA8]",
    delay: 0.1,
  },
  {
    image: "/images/information.png",
    title: "Diễn đàn",
    description: "Trao đổi tri thức đa chiều",
    bgColor: "bg-[#E8F1FF]",
    borderColor: "border-[#DAEBFF]",
    delay: 0.2,
  },
  {
    image: "/images/arcade-machine.png",
    title: "Chơi mà học",
    description: "Hứng thú trong từng bài giảng",
    bgColor: "bg-[#EBDAFF]",
    borderColor: "border-[#DFC6FF]",
    delay: 0.3,
  },
  {
    image: "/images/meta.png",
    title: "STEM",
    description: "Khơi nguồn sáng tạo khoa học",
    bgColor: "bg-[#FFECF2]",
    borderColor: "border-[#FFD8E8]",
    delay: 0.4,
  },
  {
    image: "/images/mindmap.png",
    title: "Mindmap",
    description: "Tư duy logic và sáng tạo",
    bgColor: "bg-[#ADFFFE]",
    borderColor: "border-[#7DF5F5]",
    delay: 0.5,
  },
];

const CarouselFeatures = () => {
  return (
    <section className="py-20 xl:py-28 relative overflow-hidden snap-start min-h-screen flex items-center justify-center">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-1/2 right-10 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 xl:px-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[#FFA726] font-bold tracking-wider text-sm md:text-base uppercase mb-2">
            Hệ sinh thái giáo dục
          </h2>
          <h1 className="font-bold text-3xl md:text-5xl text-[#004C70]">
            SẢN PHẨM CỦA BKT EDU
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-8 w-full">
          {featureItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative group p-6 rounded-4xl border ${item.borderColor} ${item.bgColor} flex flex-col items-center text-center gap-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>

              <div className="flex flex-col gap-2 relative z-10 w-full">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#004C70] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 font-medium transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 w-full">
                  {item.description}
                </p>
              </div>
              <div className="absolute inset-0 rounded-4xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselFeatures;
