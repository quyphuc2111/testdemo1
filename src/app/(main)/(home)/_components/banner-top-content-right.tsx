import { motion } from "motion/react";
import Image from "next/image";

const BannerTopContentRight = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2">
      {/* vòng 1 */}
      <div className=" w-[750px] rounded-full bg-contain h-[727px] translate-x-1/3 relative">
        <svg
          className="absolute inset-0 "
          width="566"
          height="777"
          viewBox="0 0 566 777"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M799.5 388.504C799.5 602.779 620.652 776.508 400 776.508C179.348 776.508 0.5 602.779 0.5 388.504C0.5 174.229 179.348 0.5 400 0.5C620.652 0.5 799.5 174.229 799.5 388.504Z"
            fill="#E4F5FC"
            stroke="#C9ECF9"
          />
        </svg>

        {/* Group that rotates */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center -left-[25%]"
          initial={{ rotate: 55 }}
          whileInView={{ rotate: 0 }}
          transition={{
            repeat: 0,
            duration: 1,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "center",
          }}
        >
          {/* Image 1 */}
          <div
            className="absolute"
            style={{
              top: `55%`,
              left: `42%`,
              transform: `translate(-50%, -380px)`,
            }}
          >
            <Image
              src="/images/gif/gif-13.gif"
              alt="gif-13"
              width={73}
              height={84}
              className="rounded-full"
              unoptimized
            />
          </div>

          {/* Image 2 */}
          <div
            className="absolute"
            style={{
              top: `50%`,
              left: `49%`,
              transform: `translate(-300px, -50%)`, // Điều chỉnh khoảng cách từ tâm (300px)
            }}
          >
            <Image
              src="/images/gif/gif-14.gif"
              alt="gif-14"
              width={73}
              height={84}
              className="rounded-full"
              unoptimized
            />
          </div>

          {/* Image 3 */}
          <div
            className="absolute"
            style={{
              top: `40%`,
              left: `35%`,
              transform: `translate(-50%, 350px)`, // Điều chỉnh khoảng cách từ tâm (300px)
            }}
          >
            <Image
              src="/images/gif/gif-15.gif"
              alt="gif-15"
              width={73}
              height={84}
              className="rounded-full"
              unoptimized
            />
          </div>
        </motion.div>

        {/* vòng 2 */}
        <div className=" w-[576px] h-[602px] rounded-full absolute  top-1/2 -translate-y-1/2 left-[55%] -translate-x-1/2">
          <svg
            width="420"
            height="653"
            viewBox="0 0 420 653"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M625.5 326.504C625.5 506.535 485.569 652.443 313 652.443C140.431 652.443 0.5 506.535 0.5 326.504C0.5 146.473 140.431 0.565186 313 0.565186C485.569 0.565186 625.5 146.473 625.5 326.504Z"
              fill="#C9ECF9"
              stroke="#C9ECF9"
            />
          </svg>

          {/* Group that rotates */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center left-[25%]"
            initial={{ rotate: 55 }}
            whileInView={{ rotate: 0 }}
            transition={{
              repeat: 0,
              duration: 1,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "center",
            }}
          >
            {/* Image 3 */}
            <div
              className="absolute"
              style={{
                top: `-30%`,
                left: `-27%`,
                transform: `translate(-50%, 350px)`, // Điều chỉnh khoảng cách từ tâm (300px)
              }}
            >
              <Image
                src="/images/gif/gif-16.gif"
                alt="gif-16"
                width={73}
                height={84}
                className="rounded-full"
                unoptimized
              />
            </div>
          </motion.div>

          {/* vòng 3 */}
          <div className=" w-[423px] h-[456px]  rounded-full absolute top-[10%] left-[17%]">
            <svg
              width="305"
              height="507"
              viewBox="0 0 305 507"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M472.5 253.359C472.5 392.863 366.808 505.894 236.5 505.894C106.192 505.894 0.5 392.863 0.5 253.359C0.5 113.855 106.192 0.823975 236.5 0.823975C366.808 0.823975 472.5 113.855 472.5 253.359Z"
                fill="#AFE2F6"
                stroke="#AFE2F6"
              />
            </svg>

            {/* Group that rotates */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center -left-[25%]"
              initial={{ rotate: 55 }}
              whileInView={{ rotate: 0 }}
              exit={{ rotate: 55 }}
              transition={{
                repeat: 0,
                duration: 1,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "center",
              }}
            >
              {/* Image 1 */}
              <div
                className="absolute"
                style={{
                  top: `93%`,
                  left: `33%`,
                  transform: `translate(-50%, -380px)`,
                }}
              >
                <Image
                  src="/images/gif/gif-17.gif"
                  alt="gif-17"
                  width={73}
                  height={84}
                  className="rounded-full"
                  unoptimized
                />
              </div>

              {/* Image 2 */}
              <div
                className="absolute"
                style={{
                  top: `65%`,
                  left: `70%`,
                  transform: `translate(-300px, -50%)`,
                }}
              >
                <Image
                  src="/images/gif/gif-18.gif"
                  alt="gif-18"
                  width={100}
                  height={120}
                  className="rounded-full"
                  unoptimized
                />
              </div>

              {/* Image 3 */}
              <div
                className="absolute"
                style={{
                  top: `20%`,
                  left: `45%`,
                  transform: `translate(-50%, 350px)`,
                }}
              >
                <Image
                  src="/images/gif/gif-19.gif"
                  alt="gif-19"
                  width={73}
                  height={84}
                  className="rounded-full"
                  unoptimized
                />
              </div>
            </motion.div>

            {/* vòng 4 */}
            <div className=" w-[303px] h-[355px] rounded-full absolute top-[10%] left-[23%]">
              <svg
                width="193"
                height="407"
                viewBox="0 0 193 407"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M352.5 203.165C352.5 315.019 273.639 405.571 176.5 405.571C79.3611 405.571 0.5 315.019 0.5 203.165C0.5 91.3123 79.3611 0.76001 176.5 0.76001C273.639 0.76001 352.5 91.3123 352.5 203.165Z"
                  fill="#79CFF0"
                  stroke="#79CFF0"
                />
              </svg>

              {/* vòng 5 */}
              <div className=" w-[190px] h-[228px] rounded-full absolute top-[16%]  left-[18%] ">
                <svg
                  width="200"
                  height="239"
                  viewBox="0 0 200 239"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="100"
                    cy="119.649"
                    rx="100"
                    ry="119.356"
                    fill="#61A6C0"
                  />
                </svg>

                <h1 className="text-[42px] font-normal text-white absolute top-[25%] left-[15%]">
                  BKT <br></br> EDU
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTopContentRight;
