// src/components/auth/FindIdForm.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LabeledInput from "@/components/common/LabeledInput";
import Button from "@/components/common/Button";

// 아이디 확인 화면 컴포넌트
interface FoundIdDisplayProps {
  foundId: string;
}

const FoundIdDisplay = ({ foundId }: FoundIdDisplayProps) => {
  return (
    <div className="w-full max-w-[615px] flex flex-col items-center">
      <div className="flex justify-center mb-[40px]">
        <Image
          src="/assets/joyin-logo.webp"
          alt="Joyin 로고"
          width={80}
          height={80}
        />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-[32px] text-[#2E4FF1] font-bold">아이디 찾기</h1>
      </div>

      <div className="w-full h-[80px] bg-white rounded-[10px] flex items-center justify-center text-[24px] mb-[40px]">
        아이디는 {foundId} 입니다
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        className="w-full h-[80px] text-[24px]"
        onClick={() => (window.location.href = "/login")}
      >
        확인
      </Button>

      <Link
        href="/find-pw"
        className="text-[#90AEA] text-[20px] mt-5 hover:underline"
      >
        비밀번호 찾기
      </Link>
    </div>
  );
};

// 아이디 찾기 폼 컴포넌트
const FindIdForm = () => {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [foundId, setFoundId] = useState<string | null>(null);

  const maskId = (id: string) => {
    if (id.length <= 4) return "****";
    return id.slice(0, 4) + "*".repeat(id.length - 4);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 나중에 실제 API 호출로 아이디를 받아옵니다.
    const fetchedIdFromServer = "joyin-frontend"; // 가상 데이터

    setFoundId(maskId(fetchedIdFromServer));
  };

  // 찾은 아이디가 있으면 결과 화면을, 없으면 폼을 보여줍니다.
  if (foundId) {
    return <FoundIdDisplay foundId={foundId} />;
  }

  return (
    <div className="w-full max-w-[615px]">
      <div className="flex justify-center mb-[40px]">
        <Image
          src="/assets/joyin-logo.webp"
          alt="Joyin 로고"
          width={80}
          height={80}
        />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-[32px] text-[#2E4FF1] font-bold">아이디 찾기</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex items-end gap-2">
          <LabeledInput
            id="find-id-email"
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
            onClick={() => setIsAuthCodeSent(true)}
          >
            인증
          </Button>
        </div>

        {isAuthCodeSent && (
          <div className="relative flex items-end gap-2 mt-[20px]">
            <LabeledInput
              id="find-id-authcode"
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
              onClick={() => setIsVerified(true)}
            >
              인증 확인
            </Button>
            {isVerified && (
              <p className="absolute right-[140px] top-1/2 -translate-y-1/2 text-green-500 font-semibold pointer-events-none">
                인증완료
              </p>
            )}
          </div>
        )}

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

export default FindIdForm;
