"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import PasswordInput from "@/components/common/PasswordInput";
import { supabase } from "@/lib/supabase";
import { useToastStore } from "@/store/toast-store";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const [disabledReason, setDisabledReason] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        showToast(
          "잘못된 접근입니다. 비밀번호 찾기를 다시 시도해주세요.",
          "error",
        );
        router.replace("/find-password");
      }
    };
    void checkUser();
  }, [router, showToast]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPassword(value);
    if (value.length > 0 && value.length < 8) {
      setPasswordError("비밀번호는 8자리 이상 입력 가능합니다");
    } else {
      setPasswordError("");
    }
    if (confirmPassword && value !== confirmPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다");
    } else {
      setConfirmError("");
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

  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다");
      return;
    }
    if (passwordError || confirmError || !newPassword) {
      showToast("입력값을 확인해주세요.", "error");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      showToast("오류: " + error.message, "error");
      setIsLoading(false);
    } else {
      await supabase.auth.signOut();
      showToast(
        "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.",
        "success",
      );
      router.push("/login");
    }
  };

  const isSubmitDisabled =
    isLoading ||
    !!passwordError ||
    !!confirmError ||
    !newPassword ||
    !confirmPassword;

  useEffect(() => {
    let reason = "";
    if (!newPassword) reason = "새 비밀번호를 입력해주세요.";
    else if (passwordError) reason = passwordError;
    else if (!confirmPassword) reason = "비밀번호 확인을 입력해주세요.";
    else if (confirmError) reason = confirmError;
    else if (isLoading) reason = "비밀번호를 변경 중입니다.";
    else reason = "비밀번호 변경";

    setDisabledReason(reason);
  }, [newPassword, passwordError, confirmPassword, confirmError, isLoading]);

  return (
    <div className="w-full max-w-[615px]">
      <form
        onSubmit={(e) => void handleResetSubmit(e)}
        className="flex flex-col"
      >
        <PasswordInput
          id="new-password"
          label="새 비밀번호"
          value={newPassword}
          onChange={handlePasswordChange}
          error={passwordError}
          containerClassName="w-full"
          disabled={isLoading}
        />
        <div className="mt-[20px]">
          <PasswordInput
            id="confirm-password"
            label="새 비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmChange}
            error={confirmError}
            containerClassName="w-full"
            disabled={isLoading}
          />
        </div>

        <span id="reset-pw-disabled-reason" className="sr-only">
          {disabledReason}
        </span>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={isSubmitDisabled}
          aria-describedby={
            isSubmitDisabled ? "reset-pw-disabled-reason" : undefined
          }
        >
          {isLoading ? "변경 중..." : "확인"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
