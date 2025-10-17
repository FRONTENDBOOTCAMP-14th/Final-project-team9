"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import { supabase } from "@/lib/supabase";

const SignUpForm = () => {
  const router = useRouter();
  // 1. 회원가입에 필요한 모든 입력 값을 state로 관리합니다.
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 2. 이메일 인증 과정을 관리하는 state (지금은 임시 로직)
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // 인증 코드 전송
  const sendAuthCode = async () => {
    if (!email) return alert("이메일을 입력해주세요!");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: id },
      },
    });

    if (error) {
      alert("회원가입 실패: " + error.message);
      return;
    }

    alert("인증코드를 메일로 보냈습니다. 이메일을 확인해주세요!");
    setIsAuthCodeSent(true);
  };

  // 인증 코드 검사
  const verifyAuthCode = async () => {
    if (!authCode) return alert("인증코드를 입력해주세요!");
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: authCode,
      type: "signup",
    });

    if (error) {
      alert("인증 실패: " + error.message);
      return;
    }

    alert("인증 완료!");
    setIsVerified(true);
  };

  // 3. 폼 제출 시 실행될 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) return alert("이메일 인증을 완료해주세요!");
    if (password !== passwordConfirm)
      return alert("비밀번호가 일치하지 않습니다!");

    router.push("/onboarding/profile");
  };

  return (
    <div className="w-full max-w-[615px]">
      {/* 로고와 제목은 AuthLayout에서 처리하므로 여기서 제거합니다. */}
      <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col">
        {/* 아이디 입력 */}
        <LabeledInput
          id="signup-id"
          label="아이디를 입력하세요"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          containerClassName="w-full h-[80px]"
        />

        {/* 비밀번호 입력 */}
        <div className="mt-[20px]">
          <LabeledInput
            id="signup-password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            containerClassName="w-full h-[80px]"
          />
        </div>

        {/* 비밀번호 확인 입력 */}
        <div className="mt-[20px]">
          <LabeledInput
            id="signup-password-confirm"
            label="비밀번호 확인"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            containerClassName="w-full h-[80px]"
          />
        </div>

        {/* 이메일 입력 + 인증 버튼 */}
        <div className="flex items-end gap-2 mt-[20px]">
          <LabeledInput
            id="signup-email"
            label="이메일을 입력하세요"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            containerClassName="flex-grow h-[80px]"
          />
          <Button
            type="button"
            variant="secondary"
            className="h-[80px] w-[104px] rounded-[10px] border-[1px] border-white text-[#DBDBDB] text-[24px]"
            onClick={() => void sendAuthCode()}
          >
            인증
          </Button>
        </div>

        {/* 인증번호 입력 (인증 버튼을 눌렀을 때만 보임) */}
        {isAuthCodeSent && (
          <div className="relative flex items-end gap-2 mt-[20px]">
            <LabeledInput
              id="signup-authcode"
              label="인증번호"
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              containerClassName="flex-grow h-[80px]"
            />
            <Button
              type="button"
              variant="secondary"
              className="h-[80px] w-[104px] rounded-[10px] border-[1px] border-[white] text-[#DBDBDB] text-[18px]"
              onClick={() => void verifyAuthCode()}
            >
              인증 확인
            </Button>
            {/* 인증 완료 시 텍스트 표시 */}
            {isVerified && (
              <p className="absolute right-[140px] top-1/2 -translate-y-1/2 text-green-500 font-semibold pointer-events-none">
                인증완료
              </p>
            )}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-[40px]"
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
