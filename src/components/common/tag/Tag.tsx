interface TagProps {
  label: string
  onRemove: () => void
}

export default function Tag({ label, onRemove }: TagProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-1 bg-gray-100 rounded-full">
      <span className="text-6 text-black">{label}</span>
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label={`${label} 삭제`}
      >
        ✕
      </button>
    </div>
  )
}
