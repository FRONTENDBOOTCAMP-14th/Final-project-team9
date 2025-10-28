import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/input/Dropdown";
import ResetFilterButton from "@/components/common/reset-filter-button/ResetFilterButton";
import SearchBar from "@/components/common/search-bar/SearchBar";
import DropdownWithTag from "@/components/common/tag/DropdownWithTag";
import { jalnan } from "@/fonts";
import fetchFilterOptions from "@/hooks/fetchFilterOptions";
import { useSearchFilterStore } from "@/store/search-filter-store";

interface SearchFilterSectionProps {
  onSearch: () => void;
}

export default function SearchFilterSection({
  onSearch,
}: SearchFilterSectionProps) {
  const [options, setOptions] = useState<{
    positions: string[];
    fields: string[];
    domains: string[];
  }>({
    positions: [],
    fields: [],
    domains: [],
  });

  const filters = useSearchFilterStore((state) => state.filters);
  const setPosition = useSearchFilterStore((state) => state.setPosition);
  const setDuration = useSearchFilterStore((state) => state.setDuration);
  const setField = useSearchFilterStore((state) => state.setField);
  const setDomain = useSearchFilterStore((state) => state.setDomain);
  const setSearchQuery = useSearchFilterStore((state) => state.setSearchQuery);

  useEffect(() => {
    async function getOptions() {
      try {
        const result = await fetchFilterOptions();
        setOptions({
          positions: result.position.map((p) => p.name),
          fields: result.field.map((f) => f.name),
          domains: result.domain.map((d) => d.name),
        });
      } catch (error) {
        console.error("필터 옵션 불러오기 실패", error);
      }
    }
    void getOptions();
  }, []);

  return (
    <section
      className="mt-45 bg-white shadow-2xl rounded-[80px] px-25 py-20 w-full max-w-[1620px] mx-8"
      aria-label="프로젝트 검색 필터"
    >
      <h1 className={`${jalnan.className} text-12 text-deep leading-none`}>
        프로젝트 찾기
      </h1>
      <p className="text-5 text-gray mt-5.5">
        원하는 조건을 검색하고 필터링하여 프로젝트를 찾아보세요.
      </p>

      <div className="mt-15">
        <SearchBar
          value={filters.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div
        className="flex justify-between mt-10"
        role="group"
        aria-label="검색 필터"
      >
        <Dropdown
          options={options.positions}
          onChange={(value) => setPosition(value)}
          placeholder="직무"
          width="250px"
        />
        <Dropdown
          options={["1개월", "3개월", "6개월", "1년", "1년 이상"]}
          onChange={(value) => setDuration(value)}
          placeholder="기간"
          width="250px"
        />
        <Dropdown
          options={options.fields}
          onChange={(value) => setField(value)}
          placeholder="분야"
          width="250px"
        />
        <Dropdown
          options={options.domains}
          onChange={(value) => setDomain(value)}
          placeholder="도메인"
          width="250px"
        />
      </div>

      <div className="flex gap-15 mt-7.5">
        <ResetFilterButton />
        <DropdownWithTag />
      </div>

      <div className="flex justify-center mt-10">
        <Button
          size="search"
          onClick={onSearch}
          aria-label="프로젝트 검색 실행"
        >
          <div className="flex items-center gap-[29px]">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M39.3247 36.1129L26.647 23.5359C28.6508 20.9015 29.7828 17.5843 29.6176 14.003C29.2719 6.71903 23.4868 0.70974 16.1721 0.0602511C7.138 -0.740987 -0.43065 6.55817 0.0190639 15.4537C0.413711 23.2506 7.04623 29.4481 14.9177 29.3935C18.0535 29.3722 20.9598 28.3767 23.3491 26.7014L36.0818 39.3331C36.9782 40.2223 38.4314 40.2223 39.3277 39.3331C40.2241 38.4438 40.2241 37.0022 39.3277 36.1129H39.3247ZM4.64775 15.7997C3.95941 9.34126 9.41716 3.92683 15.9242 4.60971C20.6661 5.10744 24.478 8.88905 24.9797 13.5933C25.6711 20.0487 20.2103 25.4662 13.7032 24.7803C8.96133 24.2825 5.14947 20.5009 4.64775 15.7967V15.7997Z"
                fill="white"
              />
            </svg>
            <span>프로젝트 검색</span>
          </div>
        </Button>
      </div>
    </section>
  );
}
