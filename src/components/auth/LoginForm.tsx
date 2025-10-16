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

  // Supabase Auth의 user_metadata에서 username으로 사용자 찾기
  const handleLogin = async (username: string, password: string) => {
    try {
      // users 테이블에서 username으로 email 찾기
      const { data: userData } = await supabase
        .from("users")
        .select("email, username")
        .eq("username", username)
        .maybeSingle();

      // users 테이블에 데이터가 없으면, Supabase Auth에서 직접 로그인 시도
      if (!userData?.email) {
        // 사용자에게 이메일 입력 요청
        const email = prompt(
          `${username} 계정의 이메일 주소를 입력해주세요.\n(회원가입 시 사용한 이메일)`
        );

        if (!email) {
          throw new Error("이메일 주소가 필요합니다.");
        }

        // 이메일로 로그인 시도
        const { data: authData, error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (authError) {
          throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        // 로그인 성공 후 users 테이블 확인 및 생성
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("id", authData.user.id)
          .maybeSingle();

        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert({
            id: authData.user.id,
            email,
            username,
            nickname: username, // 기본값으로 username 사용
            bio: null,
            position_id: 1, // 기본값: 첫 번째 포지션
            career_id: 1, // 기본값: 첫 번째 경력
            profile_image: null,
          });

          if (insertError) {
            console.error("users 테이블 생성 실패:", insertError);
          }
        }

        router.push("/");
        return;
      }

      // users 테이블에 데이터가 있으면 정상 로그인
      const email = userData.email;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
      }

      // 로그인 성공 후 user_metadata의 username 확인
      const loggedInUsername = data.user?.user_metadata?.username;
      if (loggedInUsername && loggedInUsername !== username) {
        // username이 일치하지 않으면 로그아웃
        await supabase.auth.signOut();
        throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
      }

      router.push("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "로그인 중 오류가 발생했습니다.";
      console.error("로그인 오류: ", errorMessage);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await handleLogin(id, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
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
