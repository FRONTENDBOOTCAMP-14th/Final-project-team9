"use client";

import { useState, useEffect } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import FoundIdDisplay from "@/components/auth/FoundIdDisplay";

export default function FindIdResultClient() {
  const [displayId, setDisplayId] = useState<string | null>(null);

  useEffect(() => {
    const fullId = sessionStorage.getItem("foundId");

    if (fullId) {
      let maskedId: string;

      if (fullId.length <= 7) {
        maskedId = fullId.substring(0, 4) + "***";
      } else {
        maskedId =
          fullId.substring(0, 4) + "***" + fullId.substring(fullId.length - 3);
      }

      setDisplayId(maskedId);
    } else {
      setDisplayId("아이디 정보 없음");
    }
  }, []);

  if (displayId === null) {
    return (
      <AuthLayout title="아이디 찾기" navType="findPassword">
        <p className="text-center">아이디를 확인 중입니다...</p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="아이디 찾기" navType="findPassword">
      <FoundIdDisplay foundId={displayId} />
    </AuthLayout>
  );
}
