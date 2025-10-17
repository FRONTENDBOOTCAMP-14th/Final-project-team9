"use client";

import { useSearchParams } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import FoundIdDisplay from "@/components/auth/FoundIdDisplay";

export default function FindIdResultPage() {
  // URL의 쿼리 파라미터(?id=...)를 읽기 위해 useSearchParams 훅을 사용합니다.
  const searchParams = useSearchParams();
  // 'id'라는 이름의 파라미터 값을 가져옵니다. 값이 없으면 기본 메시지를 표시합니다.
  const foundId = searchParams.get("id") || "아이디 정보 없음";

  return (
    // "아이디 찾기"라는 제목과 "findId" 타입의 하단 링크를 사용합니다.
    <AuthLayout title="아이디 찾기" navType="findPassword">
      <FoundIdDisplay foundId={foundId} />
    </AuthLayout>
  );
}
