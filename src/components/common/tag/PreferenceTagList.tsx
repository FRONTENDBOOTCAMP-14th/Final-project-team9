"use client";

interface PreferenceTagListProps {
  items: string[];
  editable?: boolean;
  onRemove?: (preference: string) => void;
  className?: string;
}

/**
 * 우대사항 전용 태그 리스트
 * - 프로젝트 등록/카드/상세 페이지에서 preferences 데이터 표시
 * - 읽기 전용 디자인 (border, gray text)
 * - editable=true일 때 삭제 버튼 표시 (프로젝트 등록 페이지)
 */
export default function PreferenceTagList({
  items,
  editable = false,
  onRemove,
  className,
}: PreferenceTagListProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      className={["flex flex-wrap gap-3", className].filter(Boolean).join(" ")}
    >
      {items.map((preference, index) => (
        <div
          key={`${preference}-${index}`}
          className="flex items-center gap-2 px-4 py-2 bg-[#d9d9d9] text-black rounded-full text-[20px]"
        >
          <span>{preference}</span>
          {editable && onRemove && (
            <button
              onClick={() => onRemove(preference)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={`${preference} 삭제`}
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
