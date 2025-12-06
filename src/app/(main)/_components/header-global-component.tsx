"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navList } from "@/contants/header-nav-list";
import { Menu, X, ChevronRight } from "lucide-react";

const HeaderGlobalComponent = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Premium Glassmorphism Header Class
  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
    isScrolled || isMobileMenuOpen || !isHome
      ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 h-20"
      : "bg-transparent h-24"
  }`;

  return (
    <header className={headerClass}>
      <nav className="container mx-auto px-4 md:px-8 xl:px-12 h-full flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="relative z-50 shrink-0 group">
          <motion.div
            layout
            className="relative transition-all duration-500 origin-left"
            style={{
              width: isScrolled || !isHome ? 120 : 150,
              height: isScrolled || !isHome ? 48 : 60,
            }}
          >
            <Image
              src="/images/logo-2xl.png"
              alt="BKT Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:drop-shadow-md"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navList.slice(0, -1).map((navItem, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                <Link
                  href={navItem.link}
                  className={`text-[15px] font-semibold tracking-wide transition-colors duration-300 ${
                    isScrolled || !isHome
                      ? "text-slate-700 hover:text-[#004C70]"
                      : "text-[#004C70] hover:text-[#FFA726]"
                  }`}
                >
                  {navItem.title}
                </Link>
                {/* Animated Underline */}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full ${
                    isScrolled || !isHome ? "bg-[#004C70]" : "bg-[#FFA726]"
                  }`}
                ></span>
              </motion.li>
            ))}
          </ul>

          <Link href={navList[navList.length - 1].link}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-full font-bold text-white shadow-xl transition-all duration-300 bg-linear-to-r from-[#FFA726] to-[#FF9100] shadow-orange-200`}
            >
              {navList[navList.length - 1].title}
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden mt-2 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isMobileMenuOpen
                ? "bg-slate-100 text-slate-800"
                : isScrolled || !isHome
                ? "text-slate-800"
                : "text-[#004C70]"
            }`}
          >
            {isMobileMenuOpen ? (
              <X size={28} strokeWidth={2} />
            ) : (
              <Menu size={28} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Mobile Fullscreen Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed inset-0 bg-sky-100 z-40 flex flex-col justify-start items-center h-screen gap-8 pt-25 pb-10 overflow-y-auto"
            >
              <ul className="flex flex-col items-center gap-6 w-full px-6">
                {navList.map((navItem, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="w-full max-w-xs md:max-w-md"
                  >
                    {index === navList.length - 1 ? (
                      <Link href={navItem.link} className="block w-full">
                        <button className="w-full py-4 rounded-xl bg-linear-to-r from-[#FFA726] to-[#FF9100] text-white font-bold text-lg shadow-xl shadow-orange-200">
                          {navItem.title}
                        </button>
                      </Link>
                    ) : (
                      <Link
                        href={navItem.link}
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 hover:bg-[#E0F7FA] text-slate-700 hover:text-[#004C70] font-bold text-lg transition-all duration-300 group"
                      >
                        {navItem.title}
                        <ChevronRight
                          size={20}
                          className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0"
                        />
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default HeaderGlobalComponent;
