// src/components/common/Button.tsx

import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  ...props
}: ButtonProps) => {
  const buttonClasses = twMerge(
    clsx(
      "inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      {
        "bg-gradient-to-r from-primary to-sub text-white shadow-hover focus:ring-primary":
          variant === "primary",
        "bg-white border border-gray-300 text-gray-700 shadow-hover focus:ring-primary":
          variant === "secondary",
        // 방식에 따라 수정이 필요할 수 있음. 임의로 적어두었음.
        "rounded-full hover:bg-gray-100": variant === "icon",
      },
      {
        // 글자 스타일 적용 오류 해결 필요
        "w-[183px] h-[56px] rounded-[5px] text-sm":
          size === "sm" && variant !== "icon",
        "w-[270px] h-[90px] rounded-[20px] text-base":
          size === "md" && variant !== "icon",
        "w-[615px] h-[80px] rounded-[10px] text-lg":
          size === "lg" && variant !== "icon",
        "w-[1616px] h-[90px] rounded-[20px] text-xl":
          size === "xl" && variant !== "icon",
        // 방식에 따라 수정이 필요할 수 있음. 임의로 적어두었음.
        "w-[40px] h-[40px] rounded-full": size === "sm" && variant === "icon",
        "w-[56px] h-[56px] rounded-full": size === "md" && variant === "icon",
      },
      {
        "opacity-50 cursor-not-allowed": props.disabled || loading,
      }
    ),
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
