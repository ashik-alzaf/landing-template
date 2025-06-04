"use client";
import Navber from "@/components/(custom)/shared/navber/navber";
import { usePathname } from "next/navigation";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLogin = pathname.includes("sing-up") || pathname.includes('dashboard');
  return (
    <div>
      {!isLogin && <Navber />}
      {children}
    </div>
  );
};

export default LandingLayout;
