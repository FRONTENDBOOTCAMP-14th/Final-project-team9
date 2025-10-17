"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPassword(value);
    if (value.length > 0 && value.length < 8) {
      setPasswordError("비밀번호는 8자리 이상 입력 가능합니다");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (value.length > 0 && value !== newPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다");
    } else {
      setConfirmError("");
    }
  };

  const handleResetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("새 비밀번호로 변경 시도:", newPassword);
  };

  return (
    <div className="w-full max-w-[615px]">
      {/* 로고와 제목은 AuthLayout에서 처리하므로 여기서 제거합니다. */}
      <form onSubmit={handleResetSubmit} className="flex flex-col">
        {/* 새 비밀번호 입력 */}
        <LabeledInput
          id="new-password"
          label="새 비밀번호"
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={handlePasswordChange}
          error={passwordError}
          containerClassName="w-full"
          icon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center justify-center"
              aria-label="비밀번호 보이기/숨기기"
            >
              {showPassword ? (
                <Image
                  src="/assets/eye-off.svg"
                  alt="비밀번호 숨기기"
                  width={30}
                  height={16}
                />
              ) : (
                <Image
                  src="/assets/eye-on.svg"
                  alt="비밀번호 보기"
                  width={24}
                  height={24}
                />
              )}
            </button>
          }
        />

        {/* 새 비밀번호 확인 입력 */}
        <div className="mt-[20px]">
          <LabeledInput
            id="confirm-password"
            label="새 비밀번호 확인"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmChange}
            error={confirmError}
            containerClassName="w-full"
          />
        </div>

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

export default ResetPasswordForm;
