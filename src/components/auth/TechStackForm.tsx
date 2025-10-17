"use client";

import type { KeyboardEvent } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import TagList from "@/components/common/tag/TagList";
import { ALL_STACKS } from "@/constants/stacks";

const MAX_STACK_COUNT = 3;

interface TechStackSelectProps {
  nickname: string;
}

const TechStackSelect = ({ nickname }: TechStackSelectProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStacks, setFilteredStacks] = useState<string[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
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

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % filteredStacks.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredStacks.length) % filteredStacks.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredStacks.length) {
        handleSelectStack(filteredStacks[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setSearchTerm("");
    }
  };

  // 3. handleSubmit 함수를 임시 완료 로직으로 수정
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 나중에 이 부분에 실제 DB 저장 로직이 들어갑니다.
    console.log("최종 선택된 스택:", selectedStacks);

    // (임시) 사용자에게 가입 완료 알림을 보여줍니다.
    alert("가입이 완료되었습니다! Joyin에 오신 것을 환영합니다.");

    // (임시) 메인 페이지로 이동시킵니다.
    // 나중에 complete 페이지가 만들어지면 '/onboarding/complete'로 경로만 바꿔주세요.
    router.push("/");
  };

  const isMaxSelected = selectedStacks.length >= MAX_STACK_COUNT;
  const placeholderText = isMaxSelected
    ? `최대 ${MAX_STACK_COUNT}개까지 선택할 수 있습니다.`
    : "기술 스택을 검색해주세요.";

  return (
    <div className="w-full max-w-[615px]">
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
              autoComplete="off"
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
          <TagList
            items={selectedStacks}
            removable={true}
            onRemove={handleRemoveStack}
            tagClassName="w-[190px] h-[40px] rounded-[20px] justify-between text-lg"
          />
        </div>

        <p className="text-center text-[24px] text-[#16296D] mt-[20px] font-bold">
          나중에 선택 가능해요
        </p>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={selectedStacks.length === 0}
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default TechStackSelect;
