"use client";

import Button from "@/components/common/Button";
import { useDropdownStore } from "@/store/dropdown-store";
import { useSearchFilterStore } from "@/store/search-filter-store";

export default function ResetFilterButton() {
  const { resetAll } = useDropdownStore();
  const setSearchQuery = useSearchFilterStore((state) => state.setSearchQuery);
  const setPosition = useSearchFilterStore((state) => state.setPosition);
  const setDuration = useSearchFilterStore((state) => state.setDuration);
  const setField = useSearchFilterStore((state) => state.setField);
  const setDomain = useSearchFilterStore((state) => state.setDomain);

  const handleReset = () => {
    resetAll();
    setSearchQuery("");
    setPosition("");
    setDuration("");
    setField("");
    setDomain("");
  };

  return (
    <Button
      role="button"
      aria-label="필터 초기화"
      size="filter"
      variant="secondary"
      className="text-gray rounded-[10px] cursor-pointer"
      onClick={handleReset}
    >
      <div className="flex items-center gap-3">
        <svg
          width="30"
          height="16"
          viewBox="0 0 30 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="-0.136719"
            width="30"
            height="3.72414"
            fill="url(#paint0_linear_201_1060)"
          />
          <rect
            y="6.07031"
            width="30"
            height="3.72414"
            fill="url(#paint1_linear_201_1060)"
          />
          <rect
            y="12.2764"
            width="30"
            height="3.72414"
            fill="url(#paint2_linear_201_1060)"
          />
          <ellipse
            cx="9.13082"
            cy="7.93215"
            rx="3.91304"
            ry="3.72414"
            fill="url(#paint3_linear_201_1060)"
            stroke="white"
            strokeWidth="2"
          />
          <ellipse
            cx="22.8252"
            cy="1.72414"
            rx="3.91304"
            ry="3.72414"
            fill="url(#paint4_linear_201_1060)"
            stroke="white"
            strokeWidth="2"
          />
          <rect
            x="27.9912"
            y="-8"
            width="4"
            height="41"
            transform="rotate(45 27.9912 -8)"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_201_1060"
              x1="2.5"
              y1="-0.590908"
              x2="4.63443"
              y2="9.72582"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2E4FF1" />
              <stop offset="1" stopColor="#00C7FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_201_1060"
              x1="2.5"
              y1="5.61612"
              x2="4.63443"
              y2="15.9328"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2E4FF1" />
              <stop offset="1" stopColor="#00C7FF" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_201_1060"
              x1="2.5"
              y1="11.8222"
              x2="4.63443"
              y2="22.1389"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2E4FF1" />
              <stop offset="1" stopColor="#00C7FF" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_201_1060"
              x1="5.86995"
              y1="3.29963"
              x2="15.5769"
              y2="9.41942"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2E4FF1" />
              <stop offset="1" stopColor="#00C7FF" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_201_1060"
              x1="19.5643"
              y1="-2.90838"
              x2="29.2713"
              y2="3.21141"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2E4FF1" />
              <stop offset="1" stopColor="#00C7FF" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-5">필터 초기화</span>
      </div>
    </Button>
  );
}
