"use client";

import { useDropdownStore } from "@/store/dropdown-store";
import Tag from "./Tag";

export default function TagList() {
  const { selectedValues, setSelected } = useDropdownStore();

  const handleRemove = (key: string) => {
    setSelected(key, "");
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {Object.entries(selectedValues)
        .filter(([_, value]) => value) // 값이 있는 항목만
        .map(([key, value]) => (
          <Tag key={key} label={value} onRemove={() => handleRemove(key)} />
        ))}
    </div>
  );
}
