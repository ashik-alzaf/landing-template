"use client"
import React from "react";
import Profile from "./profile/profile";

const DashboardNav = ({data}:any) => {
  return (
    <div>
      <Profile data={data} />
    </div>
  );
};

export default DashboardNav;
