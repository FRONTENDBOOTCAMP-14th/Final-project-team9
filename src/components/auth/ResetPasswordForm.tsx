"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import PasswordInput from "@/components/common/PasswordInput";
import { supabase } from "@/lib/supabase";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

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
      alert("입력값을 확인해주세요.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert("오류: " + error.message);
    } else {
      alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
      await supabase.auth.signOut();
      router.push("/login");
    }
  };

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
        />
        <div className="mt-[20px]">
          <PasswordInput
            id="confirm-password"
            label="새 비밀번호 확인"
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
