// src/components/common/LabeledInput.tsx

import React, { forwardRef } from "react"; // [수정됨] forwardRef를 {} 안에 넣어서 제대로 import 했습니다.
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
    // 이 컴포넌트의 너비와 높이는 사용하는 곳(LoginForm 등)에서 결정합니다.
    const formFieldContainerStyles = twMerge("relative", containerClassName);

    const inputBoxStyles = twMerge(
      "relative w-full h-full rounded-[10px] border-[1px] border-white bg-white transition-colors",
      clsx({
        "border-red-500": error,
        "focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600":
          !error,
      })
    );

    const inputElementStyles = twMerge(
      "peer h-full w-full bg-transparent px-[30px] pt-[36px] pb-[12px] text-[24px] text-black placeholder:text-transparent focus:outline-none",
      clsx({
        "pr-[90px]": !!icon,
      }),
      className
    );

    const labelStyles = twMerge(
      "absolute left-[30px] text-[#DBDBDB] transition-all duration-200 ease-in-out pointer-events-none",
      // 기본 위치를 정가운데(h-80px 기준)로 맞췄습니다.
      "top-[24px] text-[24px]",
      // 활성 상태일 때의 위치
      "peer-focus:top-[12px] peer-focus:text-[16px] peer-focus:text-[#DBDBDB]",
      "peer-[:not(:placeholder-shown)]:top-[12px] peer-[:not(:placeholder-shown)]:text-[16px] peer-[:not(:placeholder-shown)]:text-[#DBDBDB]"
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
