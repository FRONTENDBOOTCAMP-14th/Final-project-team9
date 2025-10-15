import Header from "@/components/common/header/Header";
import { ProjectDetailHeader } from "@/components/project-detail";
import type { ProjectHeaderInfo } from "@/types/project";
import ApplyButton from "./ApplyButton";

// TODO: 실제로는 Supabase에서 프로젝트 ID로 데이터를 가져와야 함
const mockProjectData: ProjectHeaderInfo = {
  id: 1,
  title: "AI 기반 주변 맛집 추천 서비스 개발",
  description: "AI를 기반으로 주변의 맛집을 찾는 서비스",
  category: "앱 개발",
  teamSize: 5,
  estimatedPeriod: "1.1~3.1",
  duration: "2개월",
  positions: {
    PM: 1,
    frontend: 2,
    backend: 1,
    designer: 1,
  },
  status: "recruiting",
};

export default function ProjectDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="white" />
      <ProjectDetailHeader project={mockProjectData} />

      {/* 프로젝트 상세 내용 */}
      <div className="w-full max-w-[1920px] mx-auto px-8 py-12">
        <div className="max-w-[1620px] mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">프로젝트 상세 내용</h2>
            <p className="text-gray-600 mb-8">
              여기에 프로젝트 상세 내용이 들어갑니다.
            </p>

            {/* 임시 지원하기 버튼 */}
            <ApplyButton />
          </div>
        </div>
      </div>
    </div>
  );
}
