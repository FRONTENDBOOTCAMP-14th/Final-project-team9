// src/components/auth/EmailVerification.tsx
"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import { supabase } from "@/lib/supabase";

interface EmailVerificationProps {
  email: string;
  setEmail: (email: string) => void;
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
  otpType: "signup" | "magiclink" | "recovery";
  password?: string; // 회원가입 시에만 사용
  username?: string; // 회원가입 시에만 사용 (id prop에서 이름 변경)
}

const EmailVerification = ({
  email,
  setEmail,
  isVerified,
  setIsVerified,
  otpType,
  password,
  username,
}: EmailVerificationProps) => {
  const [authCode, setAuthCode] = useState("");
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);

  const sendAuthCode = async () => {
    if (!email) {
      alert("이메일을 입력해주세요!");
      return;
    }

    let error;

    if (otpType === "signup") {
      if (!password || !username) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return;
      }
      // 회원가입 로직
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }, // data 필드에 username 추가
        },
      });
      error = signUpError;
    } else {
      // 아이디/비밀번호 찾기 로직
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
      });
      error = signInError;
    }

    if (error) {
      alert("인증코드 전송 실패: " + error.message);
      return;
    }

    alert("인증코드를 메일로 보냈습니다. 이메일을 확인해주세요!");
    setIsAuthCodeSent(true);
  };

  const verifyAuthCode = async () => {
    if (!authCode) {
      alert("인증코드를 입력해주세요!");
      return;
    }
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: authCode,
      type: otpType,
    });

    if (error) {
      alert("인증 실패: " + error.message);
      return;
    }

    alert("인증 완료!");
    setIsVerified(true);
  };

  return (
    <>
      <div className="flex items-end gap-2">
        <LabeledInput
          id="email"
          label="이메일을 입력하세요"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          containerClassName="flex-grow h-[80px]"
          disabled={isAuthCodeSent || isVerified}
        />
        <Button
          type="button"
          variant="secondary"
          className="h-[80px] w-[104px] rounded-[10px] border-[1px] border-white text-[#DBDBDB] text-[24px]"
          onClick={() => void sendAuthCode()}
          disabled={isAuthCodeSent || isVerified}
        >
          인증
        </Button>
      </div>
      {isAuthCodeSent && (
        <div className="relative flex items-end gap-2 mt-[20px]">
          <LabeledInput
            id="authcode"
            label="인증번호"
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            containerClassName="flex-grow h-[80px]"
            disabled={isVerified}
          />
          <Button
            type="button"
            variant="secondary"
            className="h-[80px] w-[104px] rounded-[10px] border-[1px] border-[white] text-[#DBDBDB] text-[18px]"
            onClick={() => void verifyAuthCode()}
            disabled={isVerified}
          >
            인증 확인
          </Button>
          {isVerified && (
            <p className="absolute right-[140px] top-1/2 -translate-y-1/2 text-green-500 font-semibold pointer-events-none">
              인증완료
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default EmailVerification;
