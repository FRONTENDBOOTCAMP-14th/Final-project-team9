"use client";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center max-w-[1420px] h-[110px] px-10 py-[25px] bg-white rounded-[20px] border border-gray">
      <label htmlFor="search" className="sr-only">
        검색어 입력
      </label>

      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        className="mr-10"
        aria-hidden="true"
      >
        <path
          d="M58.995 54.1719L39.9756 35.3055C42.9818 31.3538 44.68 26.3777 44.4321 21.0055C43.9135 10.079 35.2345 1.06466 24.2608 0.0903808C10.7077 -1.11153 -0.647049 9.8377 0.0276236 23.1817C0.619684 34.8775 10.57 44.1741 22.379 44.0922C27.0834 44.0603 31.4435 42.5671 35.028 40.054L54.13 59.0023C55.4747 60.3362 57.6548 60.3362 58.9996 59.0023C60.3443 57.6684 60.3443 55.5058 58.9996 54.1719H58.995ZM6.97171 23.7007C5.93904 14.0125 14.1269 5.89052 23.889 6.91487C31.0029 7.66152 36.7216 13.3342 37.4743 20.3909C38.5115 30.0744 30.3191 38.201 20.557 37.1721C13.4431 36.4255 7.7244 30.7528 6.97171 23.6961V23.7007Z"
          fill="url(#paint0_linear_239_215)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_239_215"
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

      <input
        value={value} // store 값 그대로 보여줌
        onChange={onChange}
        id="search"
        type="text"
        placeholder="검색어를 입력하세요."
        className="w-full h-full text-7 placeholder-gray placeholder:text-7"
      />
    </div>
  );
}
