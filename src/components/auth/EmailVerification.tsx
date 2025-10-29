"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import { supabase } from "@/lib/supabase";
import { useToastStore } from "@/store/toast-store";
import { sanitizeHTML, normalizeWhitespace } from "@/utils/sanitize";
import type { User, Session } from "@supabase/supabase-js";
// 'VerifyOtpResponse' 대신 User와 Session을 직접 import 합니다.

/**
 * onVerifySuccess의 data 타입을 직접 정의합니다.
 * (verifyOtp의 성공 반환 값)
 */
interface VerifySuccessData {
  user: User | null;
  session: Session | null;
}

interface EmailVerificationProps {
  email: string;
  setEmail: (email: string) => void;
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
  /** 'signup': 회원가입, 'recovery': 아이디/비밀번호 찾기 */
  otpType: "signup" | "recovery";
  password?: string; // 회원가입 시에만 사용
  username?: string; // 회원가입 시에만 사용
  disabled?: boolean;
  /**
   * (핵심) 인증 성공 시 호출될 콜백 함수.
   * 인증 데이터를 부모 컴포넌트로 전달합니다.
   */
  onVerifySuccess?: (data: VerifySuccessData) => void | Promise<void>;
}

const EmailVerification = ({
  email,
  setEmail,
  isVerified,
  setIsVerified,
  otpType,
  password,
  username,
  disabled = false,
  onVerifySuccess,
}: EmailVerificationProps) => {
  const [authCode, setAuthCode] = useState("");
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  // --- 1. 인증 코드 전송 ---
  const sendAuthCode = async () => {
    if (!email) {
      showToast("이메일을 입력해주세요!", "error");
      return;
    }

    setIsSending(true);
    let error;

    if (otpType === "signup") {
      // --- 회원가입 인증 코드 요청 ---
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password: password ?? "",
        options: {
          data: { username },
        },
      });
      error = signUpError;
    } else {
      // --- 아이디/비밀번호 찾기 인증 코드 요청 (recovery) ---
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // 가입된 유저에게만 보내기 (올바른 설정)
          shouldCreateUser: false,
        },
      });
      error = signInError;
    }

    setIsSending(false);
    if (error) {
      showToast("인증코드 전송 실패: " + error.message, "error");
      return;
    }

    showToast(
      "인증코드를 메일로 보냈습니다. 이메일을 확인해주세요!",
      "success",
    );
    setIsAuthCodeSent(true);
  };

  // --- 2. 인증 코드 검증 ---
  const verifyAuthCode = async () => {
    if (!authCode) {
      showToast("인증코드를 입력해주세요!", "error");
      return;
    }

    setIsVerifying(true);

    // (필수 수정!)
    // 'recovery' 모드(signInWithOtp)로 보낸 코드는 'email' 타입으로 검증
    const verificationType = otpType === "signup" ? "signup" : "email";

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: authCode,
      type: verificationType,
    });

    setIsVerifying(false);

    if (error) {
      showToast("인증 실패: " + error.message, "error");
      return;
    }

    showToast("인증 완료!", "success");
    setIsVerified(true);

    // (핵심) 인증 성공 시, 부모가 넘겨준 onVerifySuccess 함수를 실행
    if (onVerifySuccess && data) {
      // 부모의 로직(아이디 찾기, 페이지 이동 등)이 실행될 때까지 기다림
      await onVerifySuccess(data);
    }
  };

  const totalDisabled = disabled || isSending || isVerifying;

  // --- 3. UI 렌더링 ---
  return (
    <>
      <div className="flex items-end gap-2">
        <LabeledInput
          id="email"
          label="이메일을 입력하세요"
          type="email"
          value={email}
          onChange={(e) => {
            const sanitized = normalizeWhitespace(sanitizeHTML(e.target.value));
            setEmail(sanitized);
          }}
          containerClassName="flex-grow h-[80px]"
          disabled={totalDisabled || isAuthCodeSent || isVerified}
        />
        <Button
          type="button"
          variant="secondary"
          className="h-[80px] w-[104px] rounded-[10px] border-[1px] border-white text-gray text-[24px] cursor-pointer"
          onClick={() => void sendAuthCode()}
          disabled={totalDisabled || isAuthCodeSent || isVerified}
        >
          {isSending ? "전송중" : "인증"}
        </Button>
      </div>
      {isAuthCodeSent && (
        <div className="relative flex items-end gap-2 mt-[20px]">
          <LabeledInput
            id="authcode"
            label="인증번호"
            type="text"
            value={authCode}
            onChange={(e) => {
              const sanitized = normalizeWhitespace(
                sanitizeHTML(e.target.value),
              );
              setAuthCode(sanitized);
            }}
            containerClassName="flex-grow h-[80px]"
            disabled={totalDisabled || isVerified}
          />
          <Button
            type="button"
            variant="secondary"
            className="h-[80px] w-[104px] rounded-[10px] border-[1px] border-[white] text-gray text-[18px] cursor-pointer"
            onClick={() => void verifyAuthCode()}
            disabled={totalDisabled || isVerified}
          >
            {isVerifying ? "확인중" : "인증 확인"}
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
