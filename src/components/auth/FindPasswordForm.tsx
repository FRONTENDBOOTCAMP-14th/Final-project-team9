"use client";

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
