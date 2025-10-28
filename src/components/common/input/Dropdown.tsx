// Dropdown.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { useDropdownStore } from "@/store/dropdown-store";
import { tw } from "@/utils";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  width?: string;
  height?: string;
  className?: string;
  required?: boolean;
  onChange?: (selected: string) => void;
  value?: string;
}

export default function Dropdown({
  options,
  placeholder,
  width = "396px",
  height = "96px",
  className,
  required,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const { selectedValues, setSelected } = useDropdownStore();
  const selected = selectedValues[placeholder ?? ""] || null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (option: string) => {
    setSelected(placeholder ?? "", option);
    setIsOpen(false);
    onChange?.(option);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    index: number,
  ) => {
    const listLength = options.length;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(options[index]);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + listLength) % listLength;
      optionRefs.current[prevIndex]?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % listLength;
      optionRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div ref={dropdownRef} className="relative" style={{ width }}>
      {required && (
        <span className="absolute left-[12px] top-[8px] text-red-500 z-10">
          *
        </span>
      )}

      <button
        type="button"
        aria-label="드롭다운 열기"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ width: "100%", height }}
        className={tw(
          `flex items-center justify-between
           px-[30px] border border-gray
           text-left text-7 bg-white
           hover:border-primary cursor-pointer`,
          isOpen
            ? `rounded-t-[10px] border-b-2 border-b-[#9c9c9c]`
            : `rounded-[10px]`,
          className,
        )}
      >
        {selected ? (
          <span className={tw(`text-deep`)}>{selected}</span>
        ) : (
          <span className={tw(`text-gray`)}>{placeholder}</span>
        )}
        <span className={tw(`text-deep text-4`)}>▼</span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="드롭다운 옵션 목록"
          className={tw(
            `absolute w-full
             rounded-b-[10px] border border-gray border-t-0
             text-gray bg-white`,
            "z-20", // [수정] z-index 값을 10에서 20으로 높여서 별표보다 위에 오도록 합니다.
          )}
        >
          {options.map((option, index) => (
            <li
              key={option}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              role="option"
              aria-selected={selected === option}
              tabIndex={0}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={tw(
                `px-[30px] py-5 border-b border-[#eeeeee]
                 text-5 cursor-pointer
                 hover:text-deep focus:text-deep`,
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
