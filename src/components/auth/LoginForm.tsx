// src/components/auth/LoginForm.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LabeledInput from "@/components/common/LabeledInput";
import Button from "@/components/common/Button";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인 시도:", { id, password });
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
      <form onSubmit={handleSubmit} className="flex flex-col">
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
        <Link href="/signup" className="hover:underline">
          회원가입
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/find-id" className="hover:underline">
            아이디 찾기
          </Link>
          {/* 구분선 스타일: 글자 크기, 색상 반영 */}
          <span className="text-[12px] text-black">|</span>
          <Link href="/find-pw" className="hover:underline">
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
