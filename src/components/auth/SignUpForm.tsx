"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import PasswordInput from "@/components/common/PasswordInput";
import {
  useIdValidation,
  usePasswordValidation,
} from "@/hooks/useAuthValidation";
import EmailVerification from "./EmailVerification";

const SignUpForm = () => {
  const router = useRouter();

  const {
    value: id,
    error: idError,
    isLoading: isCheckingId,
    onChange: handleIdChange,
    isValid: isIdValid,
  } = useIdValidation();

  const {
    value: password,
    error: passwordError,
    onChange: handlePasswordChange,
    isValid: isPasswordValid,
  } = usePasswordValidation();

  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const [submitDisabledReason, setSubmitDisabledReason] = useState("");

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPasswordConfirm(value);
    if (value && value !== password) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isVerified) return alert("이메일 인증을 완료해주세요!");

    router.push("/onboarding/profile");
  };

  const isEmailSendDisabled =
    !isIdValid ||
    !isPasswordValid ||
    !!confirmError ||
    !passwordConfirm ||
    isCheckingId;

  const isSubmitDisabled = !isVerified || isEmailSendDisabled;

  useEffect(() => {
    let reason = "";

    if (!isIdValid) reason = idError || "아이디를 올바르게 입력해주세요.";
    else if (isCheckingId) reason = "아이디 중복 확인 중입니다.";
    else if (!isPasswordValid)
      reason = passwordError || "비밀번호를 올바르게 입력해주세요.";
    else if (!passwordConfirm) reason = "비밀번호 확인을 입력해주세요.";
    else if (confirmError) reason = confirmError;
    else if (!email)
      reason = "이메일을 입력해주세요."; // 이유는 그대로 둠 (Submit 버튼용)
    else if (!isVerified) reason = "이메일 인증을 완료해주세요.";
    else reason = "다음 단계로 진행하세요.";

    setSubmitDisabledReason(reason);
  }, [
    isIdValid,
    idError,
    isCheckingId,
    isPasswordValid,
    passwordError,
    passwordConfirm,
    confirmError,
    email,
    isVerified,
  ]);

  return (
    <div className="w-full max-w-[615px]">
      <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col">
        <LabeledInput
          id="signup-id"
          label="아이디를 입력하세요"
          type="text"
          value={id}
          onChange={handleIdChange}
          containerClassName="w-full"
          error={idError}
          disabled={isVerified}
        />
        <div className="mt-[20px]">
          <PasswordInput
            id="signup-password"
            label="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            containerClassName="w-full"
            error={passwordError}
            disabled={isVerified}
          />
        </div>
        <div className="mt-[20px]">
          <PasswordInput
            id="signup-password-confirm"
            label="비밀번호 확인"
            value={passwordConfirm}
            onChange={handleConfirmChange}
            containerClassName="w-full"
            error={confirmError}
            disabled={isVerified}
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
            disabled={isEmailSendDisabled}
          />
        </div>

        <span id="submit-disabled-reason" className="sr-only">
          {submitDisabledReason}
        </span>

        <Button
          type="submit"
          size="lg"
          className="w-full  text-[24px] mt-[40px]"
          disabled={isSubmitDisabled}
          aria-describedby={
            isSubmitDisabled ? "submit-disabled-reason" : undefined
          }
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
