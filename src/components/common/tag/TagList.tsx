"use client";

import { useDropdownStore } from "@/store/dropdown-store";
import Tag from "./Tag";

interface TagListItem {
  label: string;
  value?: string;
}

interface TagListProps {
  items?: Array<string | TagListItem>;
  removable?: boolean;
  onRemove?: (value: string) => void;
  className?: string;
  tagClassName?: string;
  labelClassName?: string;
}

// Reusable TagList
export default function TagList({
  items,
  removable = false,
  onRemove,
  className,
  tagClassName,
  labelClassName,
}: TagListProps) {
  const { selectedValues, setSelected } = useDropdownStore();

  // Fallback to dropdown store when items are not provided
  const derivedItems: TagListItem[] = items
    ? items.map((it) =>
        typeof it === "string" ? { label: it, value: it } : it,
      )
    : Object.entries(selectedValues)
        .filter(([, value]) => value)
        .map(([key, value]) => ({ label: value ?? "", value: key }));

  const handleRemove = (value: string) => {
    if (onRemove) {
      onRemove(value);
      return;
    }
    // Backward compatible: remove from dropdown store by key when available
    setSelected(value, "");
  };

  return (
    <div
      className={["flex flex-wrap gap-3", className].filter(Boolean).join(" ")}
    >
      {derivedItems.map((item) => (
        <Tag
          key={item.value ?? item.label}
          label={item.label}
          className={tagClassName}
          labelClassName={labelClassName}
          {...(removable
            ? { onRemove: () => handleRemove(item.value ?? item.label) }
            : {})}
        />
      ))}
    </div>
  );
}
