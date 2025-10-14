"use client";

import { useState, useRef, useEffect } from "react";
import { useDropdownStore } from "@/store/dropdown-store";
import { tw } from "@/utils";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  width?: string;
  height?: string;
  className?: string; // [수정 1] className prop을 선택적으로 받을 수 있도록 추가
}

export default function Dropdown({
  options,
  placeholder,
  width = "396px",
  height = "96px",
  className, // [수정 2] className을 props로 받음
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
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    index: number
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
           hover:border-primary`,
          isOpen
            ? `rounded-t-[10px] border-b-2 border-b-[#9c9c9c]`
            : `rounded-[10px]`,
          className // [수정 3] 외부에서 받은 className을 여기에 적용
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
             text-gray bg-white z-10`
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
                 hover:text-deep focus:text-deep`
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
