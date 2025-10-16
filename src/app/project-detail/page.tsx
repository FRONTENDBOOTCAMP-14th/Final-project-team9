import Header from "@/components/common/header/Header";
import {
  ProjectDetailHeader,
  ProjectDetailContent,
  ApplyButton,
} from "@/components/project-detail";
import type { ProjectHeaderInfo, ProjectDetail } from "@/types/project";

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

// ProjectDetailContent용 임시 데이터
const mockProjectDetailData: ProjectDetail = {
  ...mockProjectData,
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
  ownerId: "user123",
  ownerName: "지훈",
};

export default function ProjectDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="white" />
      <ProjectDetailHeader project={mockProjectData} />

      {/* 프로젝트 상세 내용 (지원 버튼 포함) */}
      <ProjectDetailContent
        project={mockProjectDetailData}
        applyButton={<ApplyButton />}
      />
    </div>
  );
}
