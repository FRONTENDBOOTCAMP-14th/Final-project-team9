"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmailVerification from "@/components/auth/EmailVerification";
import Button from "@/components/common/Button";

const FindPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) {
      alert("이메일 인증을 먼저 완료해주세요!");
      return;
    }

    setIsLoading(true);

    router.push("/reset-password");
  };

  return (
    <div className="w-full max-w-[615px]">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <EmailVerification
          email={email}
          setEmail={setEmail}
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          otpType="recovery"
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={!isVerified || isLoading}
        >
          {isLoading ? "이동 중..." : "확인"}
        </Button>
      </form>
    </div>
  );
};

export default FindPasswordForm;
