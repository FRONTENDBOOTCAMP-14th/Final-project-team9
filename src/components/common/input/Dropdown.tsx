"use client";

import { useState, useRef, useEffect } from "react";
import { useDropdownStore } from "@/store/dropdown-store";
import { tw } from "@/utils";

interface DropdownProps {
  options: string[];
  placeholder?: string;
}

export default function Dropdown({ options, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const { selected, setSelected } = useDropdownStore();

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
    setSelected(option);
    setIsOpen(false);
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
    <div ref={dropdownRef} className={tw(`relative w-[396px]`)}>
      <button
        aria-label="드롭다운 열기"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
        className={tw(
          `flex items-center justify-between
           w-full px-[30px] py-[26px] border border-gray
           text-left text-7 bg-white
         hover:border-primary`,
          isOpen
            ? `rounded-t-[10px] 
               border-b-2 border-b-[#9c9c9c]`
            : `rounded-[10px]`,
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
             z-10
           text-gray bg-white`,
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
                `px-[30px] py-5 border-b border-[#eeeeee] rounded-[10px]
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
