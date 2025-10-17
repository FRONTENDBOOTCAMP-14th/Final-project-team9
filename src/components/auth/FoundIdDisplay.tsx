"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

interface FoundIdDisplayProps {
  foundId: string; // "joyin***" 같은 마스킹된 아이디를 전달받습니다.
}

const FoundIdDisplay = ({ foundId }: FoundIdDisplayProps) => {
  const router = useRouter();
  return (
    // 최상위 div에서 flex-col과 items-center는 유지합니다.
    <div className="w-full max-w-[615px] flex flex-col items-center">
      {/* 찾은 아이디를 표시하는 박스 */}
      <div className="w-full h-[80px] bg-white rounded-[10px] flex items-center justify-center text-[24px] mb-[40px]">
        아이디는 {foundId} 입니다
      </div>
      <Button
        type="button"
        variant="primary"
        size="lg"
        className="w-full h-[80px] text-[24px]"
        onClick={() => router.push("/login")}
      >
        확인
      </Button>
    </div>
  );
};

export default FoundIdDisplay;
