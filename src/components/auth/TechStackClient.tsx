"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import TechStackSelect from "@/components/auth/TechStackForm";
import { useUserNickname } from "@/hooks/useUserNickname";

export default function TechStackClient() {
  const { nickname, isLoading } = useUserNickname();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        사용자 정보를 불러오는 중...
      </div>
    );
  }

  return (
    <AuthLayout title="회원가입">
      {nickname ? (
        <TechStackSelect nickname={nickname} />
      ) : (
        <div>닉네임 정보를 불러올 수 없습니다.</div>
      )}
    </AuthLayout>
  );
}
