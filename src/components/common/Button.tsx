// src/components/common/Button.tsx

import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      // variant를 따로 지정하지 않으면 기본으로 'primary' 스타일을 적용
      variant = "primary",
      size = "md",
      loading = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed";
    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      icon: "bg-transparent rounded-full hover:bg-gray-200",
    };

    // 지금은 임시 값
    const sizeStyles = {
      sm: "h-[32px] px-3 text-sm",
      md: "h-[40px] px-4 text-base",
      lg: "h-[48px] px-6 text-lg",
      xl: "h-[56px] px-8 text-xl",
    };

    // 아이콘 임시 값
    const iconButtonSizeStyles = {
      sm: "w-[32px] h-[32px]",
      md: "w-[40px] h-[40px]",
      lg: "w-[48px] h-[48px]",
      xl: "w-[56px] h-[56px]",
    };

    // 위에서 만든 스타일들을 상황에 맞게 조합해 주는 부분.
    const buttonClasses = twMerge(
      baseStyles,
      variantStyles[variant],
      variant === "icon" ? iconButtonSizeStyles[size] : sizeStyles[size],
      clsx({ "opacity-50": props.disabled || loading }),
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={props.disabled || loading}
        {...props}
      >
        {/*
          로딩 중일 땐 글자 대신 간단한 표시를 해줘서
          버튼 크기가 갑자기 변하는 걸 막아줌
        */}
        {loading ? "..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
