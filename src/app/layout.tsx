import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pfBeauSans = localFont({
  src: [
    {
      path: "../../public/fonts/FS PFBeauSansPro-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-XThin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-XThinItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/FS PFBeauSansPro-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-pf-beausans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BKT LMS - Hệ thống hỗ trợ học tập và giảng dạy Elearning",
  description: "BKT LMS - Hệ thống hỗ trợ học tập và giảng dạy Elearning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pfBeauSans.variable}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
