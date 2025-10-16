// src/app/onboarding/tech-stack/page.tsx

import TechStackSelect from "@/components/auth/TechStackForm";

export default function TechStackPage() {
  // 실제로는 이전 페이지나 DB에서 닉네임 정보를 받아와야 하지만,
  // 우선 오류 없이 화면을 확인하기 위해 임시 닉네임을 전달합니다.
  const tempNickname = "조인";

  return (
    <div>
      <TechStackSelect nickname={tempNickname} />
    </div>
  );
}
