"use client";

import { useState } from "react";
import SearchFilterSection from "@/components/find-project/SearchFilterSection";
import SearchResultsSection from "@/components/find-project/SearchResultsSection";
import { useSearchFilterStore } from "@/store/search-filter-store";
import type { ProjectCard } from "@/types/project";

export default function FindProjectContent() {
  const [searchResults, setSearchResults] = useState<ProjectCard[]>([]);
  const { filters, hasSearched, setHasSearched } = useSearchFilterStore();

  const handleSearch = () => {
    // TODO: 나중에 Supabase에서 데이터 가져오기
    // const fetchData = async () => {
    //   const data = await fetchProjectsFromSupabase(filters);
    //   setSearchResults(data);
    // };
    // fetchData();

    console.log("검색 필터:", filters); // 디버깅용

    // 임시로 빈 배열 설정 (검색 기능 테스트용)
    setSearchResults([]);
    setHasSearched(true);
  };

  return (
    <>
      <SearchFilterSection onSearch={handleSearch} />
      {hasSearched && <SearchResultsSection results={searchResults} />}
      <div className="mt-[318px]" aria-hidden="true" />
    </>
  );
}
