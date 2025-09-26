export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <figure role="presentation" className="relative size-16 m-0">
        <span className="absolute w-full h-full border-2 border-t-sky-500 rounded-full animate-spin" />
      </figure>
      <h2 className="mt-4 text-lg font-medium text-slate-700">로딩 중...</h2>
      <p className="text-sm text-slate-500">잠시만 기다려주세요</p>
    </div>
  )
}
