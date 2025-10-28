"use client";

import type { KeyboardEvent } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import TagList from "@/components/common/tag/TagList";
import { useFetchStacks } from "@/hooks/useFetchStacks";
import { supabase } from "@/lib/supabase";
import { sanitizeHTML, normalizeWhitespace } from "@/utils/sanitize";

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
  const { stacks: allStacksFromDB, loading, error } = useFetchStacks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() !== "" && !loading && !error) {
      const filtered = allStacksFromDB.filter(
        (stack) =>
          stack.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedStacks.includes(stack),
      );
      setFilteredStacks(filtered);
    } else {
      setFilteredStacks([]);
    }
    setActiveIndex(-1);
  }, [searchTerm, selectedStacks, allStacksFromDB, loading, error]);

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
      selectedStacks.filter((stack) => stack !== stackToRemove),
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredStacks.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredStacks.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + filteredStacks.length) % filteredStacks.length,
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelectStack(filteredStacks[activeIndex]);
    } else if (e.key === "Escape") {
      setSearchTerm("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("사용자 정보 로딩 실패");

      let stackIds: number[] = [];
      if (selectedStacks.length > 0) {
        const { data: stacksData, error: stacksError } = await supabase
          .from("tech_stacks")
          .select("id")
          .in("name", selectedStacks);
        if (stacksError) throw new Error("스택 ID 조회 실패");
        if (stacksData) stackIds = stacksData.map((s) => s.id);
      }

      if (stackIds.length > 0) {
        const stacksToInsert = stackIds.map((stackId) => ({
          user_id: user.id,
          tech_stack_id: stackId,
        }));
        const { error: insertError } = await supabase
          .from("user_tech_stacks")
          .insert(stacksToInsert);
        if (insertError) throw new Error("스택 저장 실패");
      }

      console.log("최종 선택된 스택 저장 완료:", selectedStacks);

      router.push("/onboarding/complete");
    } catch (error: unknown) {
      console.error(error);
      alert(error instanceof Error ? error.message : "알 수 없는 오류 발생");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isMaxSelected = selectedStacks.length >= MAX_STACK_COUNT;
  const placeholderText = isMaxSelected
    ? `최대 ${MAX_STACK_COUNT}개`
    : "기술 스택 검색";

  if (loading) return <div className="text-center p-8">로딩 중...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-[615px]">
      <div className="text-center mb-8">
        <h2 className="text-[32px] text-[#16296D]">
          <span className="font-bold">{nickname}</span>님 거의 다 왔어요!
        </h2>
      </div>
      <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col">
        <div className="relative">
          <div className="w-full h-[80px] rounded-[10px] border border-gray-300 bg-white flex items-center justify-between px-[30px]">
            <span className="text-black text-[24px] flex-shrink-0 mr-4">
              Tech Stack
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                const sanitized = normalizeWhitespace(
                  sanitizeHTML(e.target.value),
                );
                setSearchTerm(sanitized);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholderText}
              disabled={isMaxSelected}
              className="flex-grow h-full bg-transparent text-[24px] text-black placeholder:text-[#D9D9D9] focus:outline-none disabled:bg-transparent"
              autoComplete="off"
            />
          </div>
          {searchTerm && (
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-[10px] z-10 max-h-60 overflow-y-auto">
              {filteredStacks.length > 0 ? (
                <ul>
                  {filteredStacks.map((stack, index) => (
                    <li
                      key={stack}
                      onClick={() => handleSelectStack(stack)}
                      className={`px-6 py-3 cursor-pointer text-lg ${index === activeIndex ? "bg-gray-100" : "hover:bg-gray-100"}`}
                    >
                      {stack}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-6 py-3 text-gray-500">검색결과 없음</div>
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "다음"}
        </Button>
      </form>
    </div>
  );
};

export default TechStackSelect;
