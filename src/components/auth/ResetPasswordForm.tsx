"use client";

import { useState, useEffect } from "react";
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

  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  // (보안) 이 페이지는 반드시 로그인된 사용자만 접근해야 합니다.
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      // 'find-password'에서 OTP로 로그인하지 않았다면 user가 null입니다.
      if (!data.user) {
        alert("잘못된 접근입니다. 비밀번호 찾기를 다시 시도해주세요.");
        // 'push' 대신 'replace'를 사용해 뒤로가기 기록을 남기지 않습니다.
        router.replace("/find-password");
      }
    };
    void checkUser();
  }, [router]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPassword(value);
    if (value.length > 0 && value.length < 8) {
      // (Joyin 정책: 8자리)
      setPasswordError("비밀번호는 8자리 이상 입력 가능합니다");
    } else {
      setPasswordError("");
    }
    // 확인 비밀번호 필드도 즉시 업데이트
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
    setFormMessage(null); // 메시지 초기화

    if (newPassword !== confirmPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다");
      return;
    }
    if (passwordError || confirmError || !newPassword) {
      alert("입력값을 확인해주세요.");
      return;
    }

    setIsLoading(true); // 로딩 시작

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setFormMessage("오류: " + error.message);
      setIsLoading(false); // 로딩 끝
    } else {
      setFormMessage(
        "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.",
      );

      await supabase.auth.signOut();
      alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
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

        {formMessage && (
          <p
            className={
              formMessage.includes("오류")
                ? "text-red-500 mt-2"
                : "text-green-500 mt-2"
            }
          >
            {formMessage}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={isLoading}
        >
          {isLoading ? "변경 중..." : "확인"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
