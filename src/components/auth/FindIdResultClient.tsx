"use client";

import { useSearchParams } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import FoundIdDisplay from "@/components/auth/FoundIdDisplay";

export default function FindIdResultClient() {
  const searchParams = useSearchParams();
  const foundId = searchParams.get("id") || "아이디 정보 없음";

  return (
    <AuthLayout title="아이디 찾기" navType="findPassword">
      <FoundIdDisplay foundId={foundId} />
    </AuthLayout>
  );
}
