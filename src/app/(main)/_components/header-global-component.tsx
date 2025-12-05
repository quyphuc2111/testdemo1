"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navList } from "@/contants/header-nav-list";

const HeaderGlobalComponent = () => {

    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (!isHome) {
            // Các trang khác: luôn nền trắng
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        // Kiểm tra ngay lần đầu load (trường hợp reload khi không ở top)
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 h-28 transition-colors duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
                }`}
        >
            <nav className="w-full px-8 xl:px-10 2xl:px-28 h-full flex justify-between items-center">
                {/* logos */}
                <section>
                    <motion.div
                        className="w-[120px] h-[52px]  xl:w-[140px] xl:h-[62px]"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                        }}
                    >
                        <Image
                            src="/images/logo-2xl.png"
                            alt="Logo"
                            width={140}
                            height={62}
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </section>

                {/* nav list */}
                <section className="flex items-center gap-x-12 xl:gap-x-12 2xl:gap-x-16">
                    <ul className="w-full flex items-center gap-x-12 xl:gap-x-14 2xl:gap-x-20">
                        {navList.slice(0, -1).map((navItem, index) => (
                            <motion.li
                                key={index}
                                className="hover:cursor-pointer"
                                initial={{ y: 100, opacity: 0 }} // Bắt đầu ngoài màn hình và mờ dần
                                whileInView={{ y: 0, opacity: 1 }} // Di chuyển vào và làm rõ
                                exit={{ y: -100, opacity: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: (navList.length - 2 - index) * 0.1, // Độ trễ tăng dần từ cuối lên đầu
                                }}
                            >
                                <Link
                                    href={navItem.link}
                                    target={navItem.link.startsWith("http") ? "_blank" : "_self"}
                                    className="text-[16px] 2xl:text-[20px] font-normal"
                                >
                                    {navItem.title}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Đăng nhập button */}
                    <ul>
                        <motion.li
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: 0,
                            }}
                        >
                            <Link
                                href={navList[navList.length - 1].link}>
                                <button
                                    className="px-4 py-2 hover:cursor-pointer  xl:w-[180px] xl:h-[52px] text-[16px] 2xl:text-[20px]   rounded-[48px] border border-[#FFA726] font-normal  text-[#FFA726] bg-white "
                                >
                                    {navList[navList.length - 1].title}
                                </button>
                            </Link>
                        </motion.li>
                    </ul>
                </section>
            </nav>
        </header>
    );
}

export default HeaderGlobalComponent