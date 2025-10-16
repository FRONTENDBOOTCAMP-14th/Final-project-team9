// src/components/auth/LoginForm.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import { supabase } from "@/lib/supabase";

const LoginForm = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // supabese users table에는 비밀번호를 저장하지 않기 때문에 username(아이디)로 supabase.auth에서 email을 파싱 후 검증
  const handleLogin = async (username: string, password: string) => {
    try {
      const { data: users, error: fetchError } = await supabase
        .from("users")
        .select("email")
        .eq("username", username)
        .single();

      if (fetchError || !users) throw new Error("사용자를 찾을 수 없습니다.");

      const email = users.email;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      console.log("로그인 성공", data);
      router.push("/");
    } catch (error: any) {
      console.error("로그인 오류: ", error.message);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await handleLogin(id, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-[615px]">
      {/* 로고와 아이디 입력창 사이 간격: 40px */}
      <div className="flex justify-center mb-[40px]">
        <Image
          src="/assets/joyin-logo.webp"
          alt="Joyin 로고"
          width={80}
          height={80}
        />
      </div>

      {/* form 태그의 gap을 없애고 각 요소에 직접 마진을 줍니다. */}
      <form onSubmit={(e) => handleSubmit} className="flex flex-col">
        <LabeledInput
          id="login-id"
          label="아이디를 입력하세요"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          containerClassName="w-full h-[80px]"
        />

        {/* 아이디와 비밀번호 입력창 사이 간격: 20px */}
        <div className="mt-[20px]">
          <LabeledInput
            id="login-password"
            label="비밀번호를 입력하세요"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            containerClassName="w-full h-[80px]"
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
        </div>

        {/* 로그인 에러 메시지 표시 (커스텀좀 부탁드려요 ㅎㅎ..) */}
        {error && (
          <p className="text-red-500 text-center mt-[10px] text-[16px]">
            {error}
          </p>
        )}

        {/* 비밀번호와 로그인 버튼 사이 간격: 40px */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
        >
          로그인
        </Button>
      </form>

      {/* 로그인 버튼과 하단 링크 사이 간격: 20px */}
      {/* 하단 링크 스타일: 색상, 글자 크기, 높이 등 모두 반영 */}
      <div className="mt-[20px] flex justify-between items-center text-[20px] text-[#90A5EA] h-[24px]">
        <Link href="/sign-up" className="hover:underline">
          회원가입
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/find-id" className="hover:underline">
            아이디 찾기
          </Link>
          {/* 구분선 스타일: 글자 크기, 색상 반영 */}
          <span className="text-[12px] text-black">|</span>
          <Link href="/find-password" className="hover:underline">
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
