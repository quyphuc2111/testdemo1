"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const carouselItems: Array<{
  image: string;
  title: string;
  bgColor: string;
  borderColor: string;
}> = [
    {
      image: "/images/virtual-class.png",
      title: "Hệ thống LMS",
      bgColor: "#FFEED8",
      borderColor: "#FFDEA8",
    },
    {
      image: "/images/information.png",
      title: "Diễn đàn",
      bgColor: "#E8F1FF",
      borderColor: "#DAEBFF",
    },
    {
      image: "/images/arcade-machine.png",
      title: "Chơi mà học",
      bgColor: "#EBDAFF",
      borderColor: "#DFC6FF",
    },
    {
      image: "/images/meta.png",
      title: "STEM",
      bgColor: "#FFECF2",
      borderColor: "#FFD8E8",
    },
    {
      image: "/images/mindmap.png",
      title: "Mindmap",
      bgColor: "#ADFFFE",
      borderColor: "#7DF5F5",
    },
  ];

const CarouselFeatures = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    align: "start",
    slidesToScroll: 1,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.reInit();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handlePrev = () => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  };

  const handleNext = () => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  };

  return (
    <motion.div className="h-[600px] flex flex-col items-center">
      <motion.h1
        className="font-normal text-[48px] text-center mt-20"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        SẢN PHẨM CỦA BKT EDU
      </motion.h1>

      {/* carousel */}
      <div className="relative w-max h-max mt-11">
        <motion.div
          className="absolute -top-5 -left-16 transform -translate-y-1/2"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/xanh-icon-1.svg"
            alt="icon"
            width={100}
            height={100}
          />
        </motion.div>
        <motion.div
          className="absolute -bottom-20 -right-10 transform"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/xanh-icon-2.svg"
            alt="icon"
            width={100}
            height={100}
          />
        </motion.div>

        <div className="w-full max-w-[1380px] px-7 2xl:px-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {carouselItems.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    className="min-w-[280px] max-w-[280px] h-[285px] flex flex-col gap-y-5 items-center justify-center rounded-3xl shrink-0"
                    style={{
                      backgroundColor: item.bgColor,
                      border: `1px solid ${item.borderColor}`,
                    }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    <motion.div
                      className="transition-all duration-300 transform"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={150}
                        height={150}
                      />
                    </motion.div>
                    <motion.p
                      className="text-center text-[24px] font-normal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.title}
                    </motion.p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Controls dưới: prev (trái) - dots (giữa) - next (phải) */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous"
            className="flex items-center hover:cursor-pointer justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${selectedIndex === index
                  ? "w-6 bg-[#FFA726]"
                  : "w-2.5 bg-gray-300"
                  }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next"
            className="flex items-center hover:cursor-pointer justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarouselFeatures;
