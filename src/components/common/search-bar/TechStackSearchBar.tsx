"use client";

import React from "react";

interface TechStackSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled: boolean;
}

/**
 * SearchBar 컴포넌트 디자인을 기반으로 한 확장 버전
 * 기술스택 입력에 필요한 props(value, onChange 등)를 추가
 */
export default function TechStackSearchBar({
  value,
  onChange,
  onKeyDown,
  placeholder = "최대 10개까지 선택 가능합니다",
  disabled = false,
}: TechStackSearchBarProps) {
  return (
    <div className="flex items-center w-[1335px] h-[90px] px-10 py-[25px] bg-white rounded-[20px] border border-gray">
      <label htmlFor="tech-stack-search" className="sr-only">
        기술스택 입력
      </label>

      {/* 기존 SearchBar와 동일한 검색 아이콘 SVG */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 60 60"
        className="mr-5"
        aria-hidden="true"
      >
        <path
          d="M58.995 54.1719L39.9756 35.3055C42.9818 31.3538 44.68 26.3777 44.4321 21.0055C43.9135 10.079 35.2345 1.06466 24.2608 0.0903808C10.7077 -1.11153 -0.647049 9.8377 0.0276236 23.1817C0.619684 34.8775 10.57 44.1741 22.379 44.0922C27.0834 44.0603 31.4435 42.5671 35.028 40.054L54.13 59.0023C55.4747 60.3362 57.6548 60.3362 58.9996 59.0023C60.3443 57.6684 60.3443 55.5058 58.9996 54.1719H58.995ZM6.97171 23.7007C5.93904 14.0125 14.1269 5.89052 23.889 6.91487C31.0029 7.66152 36.7216 13.3342 37.4743 20.3909C38.5115 30.0744 30.3191 38.201 20.557 37.1721C13.4431 36.4255 7.7244 30.7528 6.97171 23.6961V23.7007Z"
          fill="url(#paint0_linear_techstack)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_techstack"
            x1="2.05623"
            y1="2.02528"
            x2="62.9193"
            y2="63.3818"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00C7FF" />
            <stop offset="1" stopColor="#2E4FF1" />
          </linearGradient>
        </defs>
      </svg>

      {/* 제어 가능한 input (value, onChange 추가) */}
      <input
        id="tech-stack-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-full text-[length:var(--text-7)] placeholder-gray placeholder:text-[length:var(--text-7)] focus:outline-none"
      />
    </div>
  );
}
