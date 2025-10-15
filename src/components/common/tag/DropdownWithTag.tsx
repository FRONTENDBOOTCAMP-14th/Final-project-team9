"use client";

import { useDropdownStore } from "@/store/dropdown-store";
import Tag from "./Tag";

export default function DropdownWithTag() {
  const { selectedValues, setSelected } = useDropdownStore();

  const handleRemove = (key: string) => {
    setSelected(key, "");
  };

  return (
    <div className="flex flex-wrap items-center gap-6.5">
      {Object.entries(selectedValues)
        .filter(([_, value]) => value)
        .map(([key, value]) => (
          <Tag key={key} label={value} onRemove={() => handleRemove(key)} />
        ))}
    </div>
  );
}
