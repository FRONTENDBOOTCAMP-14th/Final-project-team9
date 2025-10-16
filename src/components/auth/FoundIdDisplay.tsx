// src/components/auth/FoundIdDisplay.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/common/Button";

interface FoundIdDisplayProps {
  foundId: string; // "joyin***" 같은 마스킹된 아이디를 전달받습니다.
}

const FoundIdDisplay = ({ foundId }: FoundIdDisplayProps) => {
  return (
    <div className="w-full max-w-[615px] flex flex-col items-center">
      <div className="flex justify-center mb-[40px]">
        <Image
          src="/assets/joyin-logo.webp"
          alt="Joyin 로고"
          width={80}
          height={80}
        />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-[32px] text-[#2E4FF1] font-bold">아이디 찾기</h1>
      </div>

      {/* 찾은 아이디를 표시하는 박스 */}
      <div className="w-full h-[80px] bg-white rounded-[10px] flex items-center justify-center text-[24px] mb-[40px]">
        아이디는 {foundId} 입니다
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        className="w-full h-[80px] text-[24px]"
        // 확인 버튼 클릭 시 로그인 페이지로 이동하는 로직 (예시)
        onClick={() => (window.location.href = "/login")}
      >
        확인
      </Button>

      <Link
        href="/find-password"
        className="text-[#90A5EA] text-[20px] mt-5 hover:underline"
      >
        비밀번호 찾기
      </Link>
    </div>
  );
};

export default FoundIdDisplay;
