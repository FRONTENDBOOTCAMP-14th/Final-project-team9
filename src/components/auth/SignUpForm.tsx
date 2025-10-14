// src/components/auth/SignUpForm.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import LabeledInput from "@/components/common/LabeledInput";
import Button from "@/components/common/Button";

const SignUpForm = () => {
  // 1. 회원가입에 필요한 모든 입력 값을 state로 관리합니다.
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 2. 이메일 인증 과정을 관리하는 state (지금은 임시 로직)
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // 3. 폼 제출 시 실행될 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기에 모든 입력 값이 유효한지, 비밀번호가 일치하는지,
    // 이메일 인증이 완료되었는지 등을 확인하는 로직이 들어갑니다.
    console.log("회원가입 시도:", { id, email, password });
  };

  return (
    <div className="w-full max-w-[615px]">
      <div className="flex justify-center mb-[40px]">
        <Image
          src="/assets/joyin-logo.webp" // 바로잡은 로고 파일 이름입니다.
          alt="Joyin 로고"
          width={80}
          height={80}
        />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-[32px] text-[#2E4FF2] font-[jalnan]">회원가입</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* 아이디 입력 */}
        <LabeledInput
          id="signup-id"
          label="아이디를 입력하세요"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          containerClassName="w-full h-[80px]"
        />

        {/* 이메일 입력 + 인증 버튼 */}
        <div className="flex items-end gap-2 mt-[20px]">
          <LabeledInput
            id="signup-email"
            label="이메일을 입력하세요"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            containerClassName="flex-grow h-[80px]"
          />
          <Button
            type="button"
            variant="secondary"
            className="h-[80px] w-[104px] rounded-[10px] border-[1px] border-white text-[#DBDBDB] text-[24px]"
            onClick={() => setIsAuthCodeSent(true)}
          >
            인증
          </Button>
        </div>

        {/* 인증번호 입력 (인증 버튼을 눌렀을 때만 보임) */}
        {isAuthCodeSent && (
          <div className="relative flex items-end gap-2 mt-[20px]">
            <LabeledInput
              id="signup-authcode"
              label="인증번호"
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              containerClassName="flex-grow h-[80px]"
            />
            <Button
              type="button"
              variant="secondary"
              className="h-[80px] w-[104px] rounded-[10px] border-[1px] border-[white] text-[#DBDBDB] text-[18px]"
              onClick={() => setIsVerified(true)}
            >
              인증 확인
            </Button>
            {/* 인증 완료 시 텍스트 표시 */}
            {isVerified && (
              <p className="absolute right-[140px] top-1/2 -translate-y-1/2 text-green-500 font-semibold pointer-events-none">
                인증완료
              </p>
            )}
          </div>
        )}

        {/* 비밀번호 입력 */}
        <div className="mt-[20px]">
          <LabeledInput
            id="signup-password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            containerClassName="w-full h-[80px]"
          />
        </div>

        {/* 비밀번호 확인 입력 */}
        <div className="mt-[20px]">
          <LabeledInput
            id="signup-password-confirm"
            label="비밀번호 확인"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            containerClassName="w-full h-[80px]"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
