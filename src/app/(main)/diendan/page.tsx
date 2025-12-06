"use client";

import { useEffect } from "react";

const DienDan = () => {
  useEffect(() => {
    // Get Nextcloud cookies from localStorage
    const savedCookies = localStorage.getItem("nextcloud_cookies");
    
    if (savedCookies) {
      // Redirect through API route to set cookies
      const cookiesEncoded = encodeURIComponent(savedCookies);
      window.location.href = `/api/forum/redirect?cookies=${cookiesEncoded}`;
    } else {
      // No cookies, redirect to login
      window.location.href = "/login?returnUrl=/diendan";
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full border-4 border-[#004C70] animate-spin border-t-transparent" />
        <span className="text-lg text-[#004C70]">Đang chuyển đến diễn đàn...</span>
      </div>
    </div>
  );
};

export default DienDan;
