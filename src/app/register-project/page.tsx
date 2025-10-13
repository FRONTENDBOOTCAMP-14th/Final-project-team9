import RegisterProjectClient from "@/components/register-project/RegisterProjectClient";
import { jalnan } from "@/fonts";

export default function RegisterProjectPage() {
  return (
    <div className="min-h-screen bg-[#e9fafe]">
      {/* 상단 헤더 영역 */}
      <div className="pt-20 pb-16 text-center">
        {/* 메인 제목 */}
        <h1
          className={`${jalnan.className} mb-6 text-[length:var(--text-12)] text-[color:var(--color-primary)]`}
        >
          프로젝트 등록하기
        </h1>

        {/* 설명 텍스트 */}
        <p className="text-[length:var(--text-6)] text-[color:var(--color-gray)] mb-[88px]">
          프로젝트 정보를 입력하고 딱 맞는 팀원을 찾아보세요!
        </p>
      </div>

      <RegisterProjectClient />
    </div>
  );
}
