// src/components/auth/FindPasswordForm.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import LabeledInput from "@/components/common/LabeledInput";
import Button from "@/components/common/Button";
import ResetPasswordForm from "./ResetPasswordForm"; // [추가]

const FindPasswordForm = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerificationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 실제 API 호출 로직
    setIsVerified(true); // 인증 성공 시 화면 전환
  };

  // 인증이 완료되면 ResetPasswordForm을 보여줍니다.
  if (isVerified) {
    return <ResetPasswordForm />;
  }

  // 인증 전에는 본인 인증 폼을 보여줍니다.
  return (
    <div className="w-full max-w-[615px]">
      <div className="flex justify-center mb-[40px]">
        <Image
          src="/assets/joyin-logo.webp"
          alt="Joyin 로고"
          width={80}
          height={80}
        />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-[32px] text-[#2E4FF1] font-bold">비밀번호 찾기</h1>
      </div>
      <form onSubmit={handleVerificationSubmit} className="flex flex-col">
        <LabeledInput
          id="find-pw-id"
          label="아이디를 입력하세요"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          containerClassName="w-full h-[80px]"
        />
        <div className="flex items-end gap-2 mt-[20px]">
          <LabeledInput
            id="find-pw-email"
            label="이메일을 입력하세요"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            containerClassName="flex-grow h-[80px]"
          />
          <Button
            type="button"
            variant="secondary"
            className="h-[80px] w-[104px] text-lg"
            onClick={() => setIsAuthCodeSent(true)}
          >
            인증
          </Button>
        </div>
        {isAuthCodeSent && (
          <div className="relative flex items-end gap-2 mt-[20px]">
            <LabeledInput
              id="find-pw-authcode"
              label="인증번호"
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              containerClassName="flex-grow h-[80px]"
            />
            <Button
              type="button"
              variant="secondary"
              className="h-[80px] w-[104px] text-lg"
            >
              인증 확인
            </Button>
          </div>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
        >
          확인
        </Button>
      </form>
    </div>
  );
};

export default FindPasswordForm;
