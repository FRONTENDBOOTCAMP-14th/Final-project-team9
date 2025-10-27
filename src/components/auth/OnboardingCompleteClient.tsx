"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { jalnan } from "@/fonts";
import { useUserNickname } from "@/hooks/useUserNickname";

export default function OnboardingCompleteClient() {
  const router = useRouter();
  const { nickname, isLoading } = useUserNickname();

  if (isLoading) {
    return <div className="text-center p-8">사용자 정보를 불러오는 중...</div>;
  }

  if (!nickname) {
    return (
      <div className="text-center p-8 text-red-500">
        사용자 정보를 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h1
        className={`text-[48px] leading-tight text-[#2E4FF1] font-bold whitespace-nowrap ${jalnan.className}`}
      >
        회원가입이 완료되었습니다!
      </h1>

      <Image
        src="/assets/joyin-logo.svg"
        alt="JOYIN 로고"
        width={406}
        height={406}
        priority
        className="mt-[80px]"
      />

      <Button
        onClick={() => router.push("/")}
        type="submit"
        variant="primary"
        size="md"
        className="text-[28px] font-semibold mt-[100px]"
      >
        메인 페이지 이동
      </Button>
    </div>
  );
}
