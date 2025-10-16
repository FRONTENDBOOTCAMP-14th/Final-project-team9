//이메일 복사 성공 메세지에 재사용 가능
"use client";

import { useEffect } from "react";
import type { SuccessToastProps } from "@/types/project";
import { FORM_CONSTANTS } from "./constants";

export default function SuccessToast({
  isVisible,
  onClose,
  message = "지원 완료 되었습니다.",
}: SuccessToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, FORM_CONSTANTS.TOAST_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]"
    >
      <div className="flex items-center justify-center w-[415px] h-12 px-6 bg-[#d9d9d9] rounded-full shadow-none">
        <div
          aria-hidden="true"
          className="w-[30px] h-[30px] bg-[#3de400] rounded-full flex items-center justify-center mr-3 shrink-0"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            />
          </svg>
        </div>
        <span className="text-[length:var(--text-5)] text-black font-normal leading-none text-center flex-1">
          {message}
        </span>
      </div>
    </div>
  );
}
