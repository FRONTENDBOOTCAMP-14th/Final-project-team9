"use client";

import { useDropdownStore } from "@/store/dropdown-store";
import { useSearchFilterStore } from "@/store/search-filter-store";
import { useToastStore } from "@/store/toast-store";
import Tag from "./Tag";

export default function DropdownWithTag() {
  const { selectedValues, setSelected } = useDropdownStore();
  const setPosition = useSearchFilterStore((state) => state.setPosition);
  const setDuration = useSearchFilterStore((state) => state.setDuration);
  const setField = useSearchFilterStore((state) => state.setField);
  const setDomain = useSearchFilterStore((state) => state.setDomain);
  const showToast = useToastStore((state) => state.showToast);

  const handleRemove = (key: string) => {
    const removedValue = selectedValues[key];
    setSelected(key, "");
    switch (key) {
      case "포지션":
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
    if (removedValue) {
      showToast(`'${removedValue}' 필터가 제거되었습니다.`, "success");
    }
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
