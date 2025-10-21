// src/components/auth/SignUpForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import PasswordInput from "@/components/common/PasswordInput";
import EmailVerification from "./EmailVerification";

const SignUpForm = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) return alert("이메일 인증을 완료해주세요!");
    if (password !== passwordConfirm)
      return alert("비밀번호가 일치하지 않습니다!");

    router.push("/onboarding/profile");
  };

  return (
    <div className="w-full max-w-[615px]">
      <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col">
        <LabeledInput
          id="signup-id"
          label="아이디를 입력하세요"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          containerClassName="w-full h-[80px]"
        />
        <div className="mt-[20px]">
          <PasswordInput
            id="signup-password"
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            containerClassName="w-full h-[80px]"
          />
        </div>
        <div className="mt-[20px]">
          <PasswordInput
            id="signup-password-confirm"
            label="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            containerClassName="w-full h-[80px]"
          />
        </div>
        <div className="mt-[20px]">
          <EmailVerification
            email={email}
            setEmail={setEmail}
            isVerified={isVerified}
            setIsVerified={setIsVerified}
            otpType="signup"
            password={password}
            username={id}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={!isVerified}
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
