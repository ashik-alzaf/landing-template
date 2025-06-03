import Navber from "@/components/(custom)/shared/navber/navber";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navber />
      {children}
    </div>
  );
};

export default LandingLayout;
