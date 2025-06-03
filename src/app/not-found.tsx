import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center h-[calc(100vh-100px)] items-center">
      <Image
        src="/images/not-found.jpg"
        width={384}
        height={200}
        alt="Not found"
      />
    </div>
  );
};

export default NotFound;
