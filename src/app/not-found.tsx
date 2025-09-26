"use client";

import { LucideMessageSquareWarning } from "lucide-react";
import Link from "next/link";
import { tw } from "../utils";

export default function NotFound() {
  return (
    <div
      className={tw`
        flex-1
        flex flex-col items-center justify-center 
        bg-gradient-to-r from-slate-50 to-slate-100
      `}
    >
      <div
        className={tw`
          max-w-md mx-auto 
          rounded-xl shadow-lg 
          p-8 bg-white text-center 
          transform transition-all
        `}
      >
        <h1 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          <span role="presentation" className="flex justify-center mb-6">
            <LucideMessageSquareWarning
              size={64}
              strokeWidth={1.75}
              className="text-slate-600"
            />
          </span>
          페이지를 찾을 수 없습니다.
        </h1>

        <p className="text-slate-600 dark:text-slate-300 mb-8 text-md">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className={tw`
              cursor-pointer
              px-6 py-3 bg-blue-600 
              text-white
              font-medium rounded-lg 
              transition-all duration-600 transform 
              hover:scale-101 hover:bg-blue-700 
            `}
          >
            홈으로 돌아가기
          </Link>

          <button
            onClick={() => globalThis.history.back()}
            className={tw`
              cursor-pointer
              px-6 py-3 bg-slate-200 
              text-slate-800 
              font-medium rounded-lg 
              transition-all duration-600 transform 
              hover:scale-101 hover:bg-slate-300 
            `}
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
