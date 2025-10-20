// src/components/auth/FindPasswordForm.tsx
"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import EmailVerification from "./EmailVerification";
import ResetPasswordForm from "./ResetPasswordForm";

const FindPasswordForm = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailVerified) {
      // TODO: 데이터베이스에서 아이디와 이메일이 일치하는지 확인하는 로직 추가
      setShowResetForm(true);
    } else {
      alert("이메일 인증을 먼저 완료해주세요.");
    }
  };

  if (showResetForm) {
    return <ResetPasswordForm />;
  }

  return (
    <div className="w-full max-w-[615px]">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <LabeledInput
          id="find-pw-id"
          label="아이디를 입력하세요"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          containerClassName="w-full h-[80px]"
        />
        <div className="mt-[20px]">
          <EmailVerification
            email={email}
            setEmail={setEmail}
            isVerified={isEmailVerified}
            setIsVerified={setIsEmailVerified}
            otpType="recovery"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={!isEmailVerified}
        >
          확인
        </Button>
      </form>
    </div>
  );
};

export default FindPasswordForm;
