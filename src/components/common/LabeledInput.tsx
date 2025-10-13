// src/components/common/LabeledInput.tsx

import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, error, icon, className, containerClassName, ...props }, ref) => {
    const formFieldContainerStyles = twMerge(
      "relative w-[615px]",
      containerClassName
    );

    const inputBoxStyles = twMerge(
      "relative h-[80px] w-full rounded-[10px] border-[1px] border-white bg-white transition-colors",
      clsx({
        "border-red-500": error,
        "focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600":
          !error,
      })
    );

    // 입력되는 텍스트의 위치는 활성 상태를 기준으로 고정합니다.
    const inputElementStyles = twMerge(
      "peer h-full w-full bg-transparent px-[30px] pt-[36px] pb-[12px] text-[24px] text-black placeholder:text-transparent focus:outline-none",
      clsx({
        "pr-[90px]": !!icon,
      }),
      className
    );

    // [수정됨] 라벨의 '기본' top 위치만 원래대로 되돌렸습니다.
    const labelStyles = twMerge(
      "absolute left-[30px] text-gray-400 transition-all duration-200 ease-in-out pointer-events-none",
      // 기본 상태 (placeholder 위치): 원래대로 top-[24px]
      "top-[24px] text-[24px]",
      // 활성 상태 (위로 올라간 라벨 위치): top-[12px]
      "peer-focus:top-[12px] peer-focus:text-[16px] peer-focus:text-gray-500",
      "peer-[:not(:placeholder-shown)]:top-[12px] peer-[:not(:placeholder-shown)]:text-[16px] peer-[:not(:placeholder-shown)]:text-gray-500"
    );

    return (
      <div className={formFieldContainerStyles}>
        <div className={inputBoxStyles}>
          <input
            ref={ref}
            className={inputElementStyles}
            placeholder={label}
            {...props}
          />
          <label htmlFor={props.id} className={labelStyles}>
            {label}
          </label>

          {icon && (
            <div className="absolute right-[30px] top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-[10px] text-[20px] text-[#FF0606]">{error}</p>
        )}
      </div>
    );
  }
);

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;
