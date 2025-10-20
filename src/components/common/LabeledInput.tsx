import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// forwardRef 관련 타입을 제거합니다.
export interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

// forwardRef를 사용하지 않는 일반 함수 컴포넌트로 변경합니다.
const LabeledInput = ({
  label,
  error,
  icon,
  className,
  containerClassName,
  ...props
}: LabeledInputProps) => {
  const formFieldContainerStyles = twMerge("relative", containerClassName);

  const inputBoxStyles = twMerge(
    "relative w-full h-[80px] rounded-[10px] border-[1px] border-white bg-white transition-colors",
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
    "top-[24px] text-[24px]",
    "peer-focus:top-[12px] peer-focus:text-[16px] peer-focus:text-[#DBDBDB]",
    "peer-[:not(:placeholder-shown)]:top-[12px] peer-[:not(:placeholder-shown)]:text-[16px] peer-[:not(:placeholder-shown)]:text-[#DBDBDB]"
  );

  return (
    <div className={formFieldContainerStyles}>
      <div className={inputBoxStyles}>
        {/* ref prop을 받지 않도록 수정되었습니다. */}
        <input className={inputElementStyles} placeholder={label} {...props} />
        <label htmlFor={props.id} className={labelStyles}>
          {label}
        </label>
        {icon && (
          <div className="absolute right-[30px] top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-[10px] text-[20px] text-[#FF0606]">{error}</p>}
    </div>
  );
};

export default LabeledInput;
