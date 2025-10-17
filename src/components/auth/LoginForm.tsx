"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(error);
        setError(String(error));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await handleLogin(id, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(error);
        setError(String(error));
      }
    }
  };

  return (
    <div className="w-full max-w-[615px]">
      {/* 로고와 하단 링크 부분이 모두 제거되었습니다. */}
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className="flex flex-col"
      >
        <LabeledInput
          id="login-id"
          label="아이디를 입력하세요"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          containerClassName="w-full h-[80px]"
        />

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

        {error && (
          <p className="text-red-500 text-center mt-[10px] text-[16px]">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
        >
          로그인
        </Button>
      </form>
    </div>
  );
};
export default LoginForm;
