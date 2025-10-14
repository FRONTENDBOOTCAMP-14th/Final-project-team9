"use client";

import { useEffect } from "react";
import type { SuccessToastProps } from "./types";

export default function SuccessToast({
  isVisible,
  onClose,
}: SuccessToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "415px",
          height: "48px",
          padding: "0 24px",
          backgroundColor: "#d9d9d9",
          borderRadius: "999px",
          boxShadow: "none",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: "28px",
            height: "28px",
            backgroundColor: "#7ED957",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "12px",
            flexShrink: 0,
          }}
        >
          <svg
            width="16"
            height="16"
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
        <span
          style={{
            fontSize: "20px",
            color: "#000000",
            fontWeight: "normal",
            lineHeight: "1",
            textAlign: "center",
            flex: 1,
          }}
        >
          지원 완료 되었습니다.
        </span>
      </div>
    </div>
  );
}
