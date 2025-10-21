"use client";

import { useState } from "react";
import SearchFilterSection from "@/components/find-project/SearchFilterSection";
import SearchResultsSection from "@/components/find-project/SearchResultsSection";
import { fetchProjects } from "@/hooks/fetchProjects";
import { useSearchFilterStore } from "@/store/search-filter-store";
import type { ProjectCard } from "@/types/project";

export default function FindProjectContent() {
  const [searchResults, setSearchResults] = useState<ProjectCard[]>([]);
  const filters = useSearchFilterStore((state) => state.filters);
  const hasSearched = useSearchFilterStore((state) => state.hasSearched);
  const setHasSearched = useSearchFilterStore((state) => state.setHasSearched);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);

    const data = await fetchProjects(filters);
    setSearchResults(data);
    setLoading(false);
  };

  return (
    <>
      <SearchFilterSection onSearch={() => void handleSearch()} />
      {loading ? (
        <p className="mt-[318px]">검색 중...</p>
      ) : hasSearched ? (
        <SearchResultsSection results={searchResults} />
      ) : null}
      <div className="mt-[318px]" aria-hidden="true" />
    </>
  );
}
