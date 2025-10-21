// src/components/auth/FindIdForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import EmailVerification from "./EmailVerification";

const FindIdForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const maskId = (id: string) => {
    if (id.length <= 4) return "****";
    return id.slice(0, 4) + "*".repeat(id.length - 4);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) {
      alert("이메일 인증을 먼저 완료해주세요!");
      return;
    }
    // TODO: Supabase 로직을 사용하여 이메일로 아이디를 찾습니다.
    const fetchedIdFromServer = "joyin-frontend"; // 임시 데이터
    const maskedId = maskId(fetchedIdFromServer);
    router.push(`/find-id/result?id=${maskedId}`);
  };

  return (
    <div className="w-full max-w-[615px]">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <EmailVerification
          email={email}
          setEmail={setEmail}
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          otpType="magiclink"
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={!isVerified}
        >
          확인
        </Button>
      </form>
    </div>
  );
};

export default FindIdForm;
