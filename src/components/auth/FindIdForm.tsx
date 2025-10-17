"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";

const FindIdForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const maskId = (id: string) => {
    if (id.length <= 4) return "****";
    return id.slice(0, 4) + "*".repeat(id.length - 4);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fetchedIdFromServer = "joyin-frontend";
    const maskedId = maskId(fetchedIdFromServer);
    router.push(`/find-id/result?id=${maskedId}`);
  };

  return (
    <div className="w-full max-w-[6-15px]">
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
