"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiMessenger, SiZalo } from "react-icons/si";

const FooterGlobalComponent = () => {
  return (
    <footer className="relative bg-linear-to-br from-[#004C70] to-[#002840] text-white pt-20 pb-10 overflow-hidden">
      {/* Ambient Backgroud Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-[100px] opacity-20 mix-blend-overlay animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#FFA726] rounded-full blur-[100px] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6 justify-center items-center">
            <div className="relative w-48 h-20">
              <Image
                src="/images/logo-2xl.png"
                alt="BKT Logo"
                fill
                className="object-contain opacity-90"
              />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              BKT EDU - Nền tảng giáo dục số toàn diện, giúp kết nối và nâng cao
              chất lượng dạy và học với công nghệ tiên tiến nhất.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {[
                {
                  Icon: SiFacebook,
                  href: "https://www.facebook.com/profile.php?id=100068012732411#",
                },
                {
                  Icon: SiMessenger,
                  href: "https://www.facebook.com/messages/t/102046912062861",
                },
                { Icon: SiZalo, href: "https://zalo.me/0337218868" },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFA726] hover:text-white transition-all duration-300 group"
                >
                  <Icon
                    size={18}
                    className="text-slate-300 group-hover:text-white"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="lg:pl-8">
            <h3 className="text-lg font-bold mb-6 text-[#FFA726] uppercase tracking-wider">
              Khám phá
            </h3>
            <ul className="space-y-4">
              {[
                "Trang chủ",
                "Giới thiệu",
                "Tính năng",
                "Tin tức",
                "Tuyển dụng",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#FFA726] uppercase tracking-wider">
              Hỗ trợ
            </h3>
            <ul className="space-y-4">
              {[
                "Điều khoản sử dụng",
                "Chính sách bảo mật",
                "Trung tâm trợ giúp",
                "Liên hệ báo giá",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#FFA726] uppercase tracking-wider">
              Liên hệ
            </h3>
            <ul className="space-y-5">
              <li className="flex gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FFA726] transition-colors duration-300">
                  <MapPin
                    size={16}
                    className="text-slate-300 group-hover:text-white"
                  />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                  Số 308,Tầng 3 tòa A1, Khu IA20, KĐT Nam Thăng Long, Phường Phú
                  Thượng, Hà Nội
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FFA726] transition-colors duration-300">
                  <Phone
                    size={16}
                    className="text-slate-300 group-hover:text-white"
                  />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  0337 218 868
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FFA726] transition-colors duration-300">
                  <Mail
                    size={16}
                    className="text-slate-300 group-hover:text-white"
                  />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  info.bktjsc@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} BKT Education. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterGlobalComponent;
