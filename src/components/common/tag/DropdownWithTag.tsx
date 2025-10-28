"use client";

import { useDropdownStore } from "@/store/dropdown-store";
import { useSearchFilterStore } from "@/store/search-filter-store";
import Tag from "./Tag";

export default function DropdownWithTag() {
  const { selectedValues, setSelected } = useDropdownStore();
  const setPosition = useSearchFilterStore((state) => state.setPosition);
  const setDuration = useSearchFilterStore((state) => state.setDuration);
  const setField = useSearchFilterStore((state) => state.setField);
  const setDomain = useSearchFilterStore((state) => state.setDomain);

  const handleRemove = (key: string) => {
    console.log("태그 제거 전 selectedValues:", selectedValues);
    setSelected(key, "");
    switch (key) {
      case "직무":
        setPosition("");
        break;
      case "기간":
        setDuration("");
        break;
      case "분야":
        setField("");
        break;
      case "도메인":
        setDomain("");
        break;
    }
    console.log(
      `태그 제거 후 ${key} 초기화`,
      useSearchFilterStore.getState().filters,
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-6.5">
      {Object.entries(selectedValues)
        .filter(([_, value]) => value)
        .map(([key, value]) => (
          <Tag
            key={key}
            label={value ?? ""}
            onRemove={() => handleRemove(key)}
          />
        ))}
    </div>
  );
}
