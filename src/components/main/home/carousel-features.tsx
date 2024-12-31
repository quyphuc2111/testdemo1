import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const carouselItems: Array<{
  image: string;
  title: string;
  bgColor: string;
  borderColor: string;
}> = [
  {
    image: "/virtual-class.png",
    title: "Hệ thống LMS",
    bgColor: "#FFEED8",
    borderColor: "#FFDEA8",
  },
  {
    image: "/information.png",
    title: "Diễn đàn",
    bgColor: "#E8F1FF",
    borderColor: "#DAEBFF",
  },
  {
    image: "/arcade-machine.png",
    title: "Chơi mà học",
    bgColor: "#EBDAFF",
    borderColor: "#DFC6FF",
  },
  {
    image: "/meta.png",
    title: "STEM",
    bgColor: "#FFECF2",
    borderColor: "#FFD8E8",
  },
  {
    image: "/mindmap.png",
    title: "Mindmap",
    bgColor: "#ADFFFE",
    borderColor: "#7DF5F5",
  },
  {
    image: "/virtual-class.png",
    title: "Hệ thống LMS",
    bgColor: "#FFEED8",
    borderColor: "#FFDEA8",
  },
  {
    image: "/information.png",
    title: "Diễn đàn",
    bgColor: "#E8F1FF",
    borderColor: "#DAEBFF",
  },
  {
    image: "/arcade-machine.png",
    title: "Chơi mà học",
    bgColor: "#EBDAFF",
    borderColor: "#DFC6FF",
  },
  {
    image: "/meta.png",
    title: "STEM",
    bgColor: "#FFECF2",
    borderColor: "#FFD8E8",
  },
  {
    image: "/mindmap.png",
    title: "Mindmap",
    bgColor: "#ADFFFE",
    borderColor: "#7DF5F5",
  },
];

const CarouselCustom = styled(Carousel)`
  .react-multiple-carousel__arrow.react-multiple-carousel__arrow--right {
    transform: translateX(52px) !important;
    border: 3px solid #ffffff;
  }
  .react-multiple-carousel__arrow.react-multiple-carousel__arrow--left {
    transform: translateX(-40px) !important;
    border: 3px solid #ffffff;
  }
  .react-multiple-carousel__arrow::before {
    font-size: 14px;
  }
`;

const CarouselFeatures = () => {
  return (
    <div className="h-[600px] flex flex-col items-center ">
      <h1 className="font-normal text-[48px] text-center mt-20">
        SẢN PHẨM CỦA BKT EDU
      </h1>

      {/* carousel */}
      <div className="relative w-max h-max mt-11 ">
        <img
          src="/xanh-icon-1.svg"
          className="absolute -top-5 -left-16 transform -translate-y-1/2 "
        />
        <img
          src="/xanh-icon-2.svg"
          className="absolute -bottom-20 -right-10 transform  "
        />

        <CarouselCustom
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          className=" w-[1380px] px-10"
          itemClass="w-max"
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="w-[280px] h-[285px] flex flex-col gap-y-5 items-center justify-center rounded-3xl"
              style={{
                backgroundColor: item.bgColor,
                border: `1px solid ${item.borderColor}`,
              }}
            >
              <img src={item.image} width={150} height={150} />
              <p className="text-center  text-[24px] font-normal">
                {item.title}
              </p>
            </div>
          ))}
        </CarouselCustom>
      </div>
    </div>
  );
};

export default CarouselFeatures;
