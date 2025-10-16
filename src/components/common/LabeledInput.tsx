// src/components/common/LabeledInput.tsx

import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  required?: boolean;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  (
    { label, error, icon, className, containerClassName, required, ...props },
    ref,
  ) => {
    const formFieldContainerStyles = twMerge("relative", containerClassName);

    const inputBoxStyles = twMerge(
      "relative w-full h-[80px] rounded-[10px] border-[1px] border-white bg-white transition-colors",
      clsx({
        "border-red-500": error,
        "focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600":
          !error,
      }),
    );

    const inputElementStyles = twMerge(
      "peer h-full w-full bg-transparent px-[30px] pt-[36px] pb-[12px] text-[24px] text-black placeholder:text-transparent focus:outline-none",
      clsx({
        "pr-[90px]": !!icon,
      }),
      className,
    );

    const labelStyles = twMerge(
      "absolute left-[30px] text-[#DBDBDB] transition-all duration-200 ease-in-out pointer-events-none",
      "top-[24px] text-[24px]",
      "peer-focus:top-[12px] peer-focus:text-[16px] peer-focus:text-[#DBDBDB]",
      "peer-[:not(:placeholder-shown)]:top-[12px] peer-[:not(:placeholder-shown)]:text-[16px] peer-[:not(:placeholder-shown)]:text-[#DBDBDB]",
    );

    return (
      <div className={formFieldContainerStyles}>
        <div className={inputBoxStyles}>
          {required && (
            <span className="absolute left-[12px] top-[8px] text-red-500">
              *
            </span>
          )}
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

        {/* [수정] div를 삭제하고, 에러가 있을 때만 p 태그가 렌더링되도록 합니다. */}
        {error && (
          <p className="mt-[10px] text-[20px] text-[#FF0606]">{error}</p>
        )}
      </div>
    );
  },
);

LabeledInput.displayName = "LabeledInput";
export default LabeledInput;
