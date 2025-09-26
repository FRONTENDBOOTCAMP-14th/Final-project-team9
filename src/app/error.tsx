"use client";

import { tw } from "@/utils";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <div
      role="alert"
      className={tw`
        min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-red-900 to-gray-900 p-4
      `}
    >
      <div
        className={tw`
          overflow-hidden w-full max-w-md 
          bg-white/10 backdrop-blur-md rounded-xl shadow-2xl 
          border border-red-500/20
        `}
      >
        <div className="p-6">
          <div
            className={tw`
              flex items-center justify-center w-16 h-16 
              mx-auto mb-4 rounded-full bg-red-600/20  
            `}
          >
            <svg
              fill="none"
              className="w-10 h-10 text-red-500"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1
            className={tw`
              mb-2
              text-2xl text-center text-white 
              font-light tracking-wide
            `}
          >
            {error.name}
          </h1>
          <div
            className="h-0.5 w-16 bg-red-500/50 mx-auto mb-4"
            aria-hidden="true"
          />

          <div className="text-red-100/80 text-center mb-6 font-light">
            <p>{error.message}</p>
            {error.digest && (
              <p className="mt-2 text-xs text-red-300/60 font-mono">
                <span className="sr-only">오류 ID: </span>
                {error.digest}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={reset}
              aria-label="페이지 복구 시도하기"
              className={tw`
                cursor-pointer
                px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 
                text-white font-medium rounded-lg shadow-lg 
                transition-all duration-200 transform 
                hover:from-red-700 hover:to-red-800 hover:-translate-y-0.5
                active:translate-y-0 
                focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 focus:outline-none
              `}
            >
              복구하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
