"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmailVerification from "@/components/auth/EmailVerification";
import Button from "@/components/common/Button";
import { supabase } from "@/lib/supabase";

const FindIdForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) {
      alert("이메일 인증을 먼저 완료해주세요!");
      return;
    }

    setIsLoading(true);
    setFormError(null);

    try {
      // 1. (안정화) getUser()를 먼저 호출해 세션 정보를 확실히 가져옵니다.
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "사용자 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.",
        );
      }

      // 2. (수정) 'LoginForm'과 동일하게 'users' 테이블에서 'username'을 조회합니다.
      const { data: profile, error: profileError } = await supabase
        .from("users") // 'profiles' -> 'users' (LoginForm 기준)
        .select("username") // 'login_id' -> 'username' (LoginForm 기준)
        .eq("id", user.id) // (※이 'id' 컬럼명은 확인 필요!)
        .single();

      // 3. (수정) 'profile.username'을 검사합니다.
      if (profileError || !profile?.username) {
        throw new Error(
          "프로필 정보(아이디)를 찾는 데 실패했습니다. 가입된 사용자가 맞는지 확인해주세요.",
        );
      }

      // 4. (수정) 'profile.username'을 저장합니다.
      sessionStorage.setItem("foundId", profile.username);

      // 5. (필수) 임시 세션을 파기합니다. (로그아웃)
      await supabase.auth.signOut();

      // 6. 결과 페이지로 이동
      router.push(`/find-id/result`);
    } catch (error: unknown) {
      // 'any' 대신 'unknown'
      // 'error'가 진짜 Error 객체인지 확인
      if (error instanceof Error) {
        setFormError(error.message || "알 수 없는 오류가 발생했습니다.");
      } else {
        setFormError("알 수 없는 오류가 발생했습니다.");
      }
      await supabase.auth.signOut();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[615px]">
      <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col">
        <EmailVerification
          email={email}
          setEmail={setEmail}
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          otpType="recovery"
          disabled={isLoading}
        />

        {formError && (
          <p className="text-red-500 mt-2 text-center">{formError}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
          disabled={!isVerified || isLoading}
        >
          {isLoading ? "아이디 찾는 중..." : "확인"}
        </Button>
      </form>
    </div>
  );
};

export default FindIdForm;
