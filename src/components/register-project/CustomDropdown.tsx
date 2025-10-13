"use client";

import React from "react";

interface CustomDropdownProps {
  options: string[];
  placeholder: string;
  value: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  width?: string;
  height?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  placeholder,
  value,
  onSelect,
  isOpen,
  setIsOpen,
  width = "571px",
  height = "90px",
}) => {
  const isSmall = height === "50px";
  const paddingY = isSmall ? "py-[12px]" : "py-[26px]";
  const paddingX = isSmall ? "px-[20px]" : "px-[30px]";

  return (
    <div className="relative" style={{ width }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full ${paddingX} ${paddingY} border border-gray-200 text-left bg-white hover:border-blue-500 ${
          isOpen ? "border-blue-500 ring-2 ring-blue-500" : ""
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
        style={{
          height,
          fontSize: "var(--text-7)",
          color: value ? "var(--color-gray)" : "#9ca3af",
        }}
      >
        <span className="block truncate">{value || placeholder}</span>
        <span
          className={`text-deep text-lg transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              style={{
                fontSize: "var(--text-7)",
                color: "var(--color-gray)",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
