import React from "react";
import { twMerge } from "tailwind-merge";
type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <div>
      <button
        className={twMerge(
          "bg-red-500 px-5 py-2 cur text-white rounded",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
