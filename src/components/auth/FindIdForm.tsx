// src/components/auth/FindIdForm.tsx
"use client";

import EmailVerification from "@/components/auth/EmailVerification";
import Button from "@/components/common/Button";
import { useRecoveryFlow } from "@/hooks/useAuthValidation";

const FindIdForm = () => {
  const {
    email,
    setEmail,
    isVerified,
    setIsVerified,
    isLoading,
    formError,
    handleSubmit,
  } = useRecoveryFlow("find-id");

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

        {formError && (
          <p className="text-red-500 mt-2 text-center">{formError}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={!isVerified || isLoading}
        >
          {isLoading ? "아이디 찾는 중..." : "확인"}
        </Button>
      </form>
    </div>
  );
};

export default FindIdForm;
