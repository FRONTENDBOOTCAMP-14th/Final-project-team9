"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { jalnan } from "@/fonts";

export default function CompletePageClient() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  return (
    <div className="flex-1 flex flex-col items-center justify-center pt-20 pb-20">
      <div className="text-center">
        {/* 완료 메시지 */}
        <h1
          className={`${jalnan.className} mt-[168px] mb-[91px] text-[length:var(--text-12)] text-[color:var(--color-primary)]`}
        >
          등록이 완료되었습니다!
        </h1>

        {/* Joyin 로고 */}
        <div className="mb-[121px]">
          <Image
            src="/assets/joyin-logo.webp"
            alt="Joyin 로고"
            width={406}
            height={406}
            className="mx-auto"
          />
        </div>

        {/* 프로젝트로 이동 버튼 */}
        <Link
          href={projectId ? `/project-detail/${projectId}` : "/find-project"}
          className={`
            ${jalnan.className}
            inline-flex items-center justify-center
            w-[270px] h-[90px]
            bg-gradient-to-br from-primary to-sub 
            text-white
            rounded-xl
            text-[length:var(--text-7)] font-bold
            hover:opacity-90 hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
            transition-all duration-300 ease-in-out
          `}
          aria-label="등록한 프로젝트 확인하기"
        >
          프로젝트로 이동
        </Link>
      </div>
    </div>
  );
}
