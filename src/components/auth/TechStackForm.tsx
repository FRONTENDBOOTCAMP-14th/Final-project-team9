// src/components/auth/TechStackSelect.tsx

"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import Tag from "@/components/common/tag/Tag";
import { ALL_STACKS } from "@/constants/stacks";

// 상수를 사용해 유지보수성을 높입니다.
const MAX_STACK_COUNT = 3;

interface TechStackSelectProps {
  nickname: string;
}

const TechStackSelect = ({ nickname }: TechStackSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStacks, setFilteredStacks] = useState<string[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

  // 키보드 네비게이션을 위한 상태 (현재 하이라이트된 아이템의 인덱스)
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filtered = ALL_STACKS.filter(
        (stack) =>
          stack.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedStacks.includes(stack)
      );
      setFilteredStacks(filtered);
    } else {
      setFilteredStacks([]);
    }
    // 검색어가 바뀔 때마다 하이라이트를 초기화합니다.
    setActiveIndex(-1);
  }, [searchTerm, selectedStacks]);

  const handleSelectStack = (stack: string) => {
    if (
      selectedStacks.length < MAX_STACK_COUNT &&
      !selectedStacks.includes(stack)
    ) {
      setSelectedStacks([...selectedStacks, stack]);
      setSearchTerm("");
    }
  };

  const handleRemoveStack = (stackToRemove: string) => {
    setSelectedStacks(
      selectedStacks.filter((stack) => stack !== stackToRemove)
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredStacks.length === 0) return;

    // ArrowDown 키: 아래로 이동
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % filteredStacks.length);
    }
    // ArrowUp 키: 위로 이동
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredStacks.length) % filteredStacks.length
      );
    }
    // Enter 키: 선택
    else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredStacks.length) {
        handleSelectStack(filteredStacks[activeIndex]);
      }
    }
    // Escape 키: 검색창 닫기
    else if (e.key === "Escape") {
      setSearchTerm("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("최종 선택된 스택:", selectedStacks);
    // 실제로는 여기서 API 호출 등의 로직이 실행됩니다.
  };

  const isMaxSelected = selectedStacks.length >= MAX_STACK_COUNT;
  const placeholderText = isMaxSelected
    ? `최대 ${MAX_STACK_COUNT}개까지 선택할 수 있습니다.`
    : `${MAX_STACK_COUNT}개를 모두 선택하였습니다.`;

  return (
    <div className="w-full max-w-[615px]">
      <div className="flex justify-center mb-[40px]">
        <Image
          src="/assets/joyin-logo.webp"
          alt="Joyin 로고"
          width={80}
          height={80}
        />
      </div>
      <div className="text-center mb-[40px]">
        <h1 className="text-[32px] text-[#2E4FF2] font-[jalnan]">회원가입</h1>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-[32px] text-[#16296D]">
          <span className="font-bold">{nickname}</span>님 거의 다 왔어요!
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="relative">
          <div className="w-[615px] h-[80px] rounded-[10px] border border-gray-300 bg-white flex items-center justify-between px-[30px]">
            <span className="text-black text-[24px] flex-shrink-0 mr-[91px]">
              Tech Stack
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholderText}
              disabled={isMaxSelected}
              className="flex-grow h-full bg-transparent text-[24px] text-black placeholder:text-[#D9D9D9] focus:outline-none ml-4 disabled:bg-transparent"
              autoComplete="off" // 브라우저 자동완성 끄기
            />
          </div>

          {searchTerm && (
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-[10px] z-10">
              {filteredStacks.length > 0 ? (
                <ul>
                  {filteredStacks.map((stack, index) => (
                    <li
                      key={stack}
                      onClick={() => handleSelectStack(stack)}
                      className={`px-6 py-3 cursor-pointer text-lg ${
                        index === activeIndex
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {stack}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-6 py-3 text-gray-500">
                  검색결과가 없습니다
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-4 min-h-[40px]">
          {selectedStacks.map((stack) => (
            <Tag
              key={stack}
              label={stack}
              onRemove={() => handleRemoveStack(stack)}
              className="w-[190px] h-[40px] rounded-[20px] justify-between text-lg"
            />
          ))}
        </div>

        <p className="text-center text-[24px] text-[#16296D] mt-[20px] font-bold">
          나중에 선택 가능해요
        </p>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={selectedStacks.length === 0} // 선택된 스택이 없을 때 버튼 비활성화
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default TechStackSelect;
