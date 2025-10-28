// src/components/common/Button.tsx

import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg" | "xl" | "filter" | "search";
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
      type = "button", // 기본값: submit 사고 방지
      ...rest
    },
    ref,
  ) => {
    // disabled를 분리해 loading과 함께 안전 처리
    const { disabled: disabledProp, ...restProps } = rest;
    const isDisabled = Boolean(disabledProp || loading);

    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed";

    const variantStyles = {
      primary: "bg-gradient-to-r from-primary to-sub text-white shadow-hover",
      secondary: "bg-white border border-gray-300 text-black shadow-hover",
      icon: "bg-transparent rounded-full hover:bg-gray-200",
    } as const;

    const sizeStyles = {
      sm: "w-[183px] h-[53px] text-[24px] rounded-[5px]",
      md: "w-[270px] h-[90px] text-[28px] rounded-[20px]",
      lg: "w-[615px] h-[80px] text-[28px] rounded-[10px]",
      xl: "w-[1616] h-[90px] text-[28px] rounded-[20px]",
      filter: "w-[190px] h-[60px] px-[25px]",
      search: "w-[307px] h-[90px] px-10 text-[28px] rounded-[20px]",
    } as const;

    // 아이콘 임시 값
    const iconButtonSizeStyles = {
      sm: "w-[32px] h-[32px]",
      md: "w-[40px] h-[40px]",
      lg: "w-[48px] h-[48px]",
      xl: "w-[56px] h-[56px]",
    } as const;

    // clsx로 조건 조합 → twMerge로 Tailwind 중복/충돌 정리
    const buttonClasses = twMerge(
      clsx(
        baseStyles,
        variantStyles[variant],
        variant === "icon"
          ? (iconButtonSizeStyles[size as keyof typeof iconButtonSizeStyles] ??
              "")
          : sizeStyles[size],
        { "opacity-50": isDisabled },
        className,
      ),
    );

    return (
      <button
        ref={ref}
        type={type} // 실제로 전달
        className={buttonClasses}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        disabled={isDisabled} // 명시적으로 지정
        {...restProps} // disabled는 제외된 나머지 props만 전달
      >
        {/*
          로딩 중일 땐 글자 대신 간단한 표시를 해줘서
          버튼 크기가 갑자기 변하는 걸 막아줌
        */}
        {loading ? "..." : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
