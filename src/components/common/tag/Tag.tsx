interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  labelClassName?: string;
}

export default function Tag({
  label,
  onRemove,
  className,
  labelClassName,
}: TagProps) {
  return (
    <div
      className={[
        "flex items-center gap-2 px-4 py-1 rounded-full bg-gray-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={["text-6 text-black cursor-default", labelClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-black cursor-pointer focus:outline-none"
          aria-label={`${label} 삭제`}
        >
          ✕
        </button>
      )}
    </div>
  );
}
