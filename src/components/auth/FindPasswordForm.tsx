"use client";

import { useState, useEffect } from "react";
import EmailVerification from "@/components/auth/EmailVerification";
import Button from "@/components/common/Button";
import { useRecoveryFlow } from "@/hooks/useAuthValidation";

const FindPasswordForm = () => {
  const {
    email,
    setEmail,
    isVerified,
    setIsVerified,
    isLoading,
    handleSubmit,
  } = useRecoveryFlow("find-password");

  const [disabledReason, setDisabledReason] = useState("");

  useEffect(() => {
    if (!isVerified) setDisabledReason("이메일 인증을 먼저 완료해주세요.");
    else if (isLoading) setDisabledReason("페이지 이동 중입니다.");
    else setDisabledReason("확인 버튼을 눌러주세요.");
  }, [isVerified, isLoading]);

  return (
    <div className="w-full max-w-[615px]">
      <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col">
        <EmailVerification
          email={email}
          setEmail={setEmail}
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          otpType="recovery"
          disabled={isLoading}
        />

        <span id="find-pw-disabled-reason" className="sr-only">
          {disabledReason}
        </span>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={!isVerified || isLoading}
          aria-describedby={
            !isVerified || isLoading ? "find-pw-disabled-reason" : undefined
          }
        >
          {isLoading ? "이동 중..." : "확인"}
        </Button>
      </form>
    </div>
  );
};

export default FindPasswordForm;
