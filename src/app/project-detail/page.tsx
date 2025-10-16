import Footer from "@/components/common/footer/Footer";
import GoTopButton from "@/components/common/GoTopButton";
import Header from "@/components/common/header/Header";
import {
  ProjectDetailHeader,
  ProjectDetailContent,
} from "@/components/project-detail";
import type { ProjectHeaderInfo, ProjectDetail } from "@/types/project";

// TODO: 실제로는 Supabase에서 프로젝트 ID로 데이터를 가져와야 함
const mockProjectData: ProjectHeaderInfo = {
  id: 1,
  title: "AI 기반 주변 맛집 추천 서비스 개발",
  description: "AI를 기반으로 주변의 맛집을 찾는 서비스",
  category: "앱 개발",
  domain: "유틸",
  techStack: ["React", "TypeScript", "OpenAI API", "Supabase"],
  preferences: [
    "피그마 사용 가능",
    "앱 개발 경험",
    "AI API 연동 경험",
    "부트캠프 또는 관련 교육 수료",
    "코드 리뷰 경험",
  ],
  requirements: [
    "주 1회 오프라인 미팅 가능한 분",
    "Git/GitHub 협업 경험 필수",
    "프로젝트 완료 의지가 있으신 분",
  ],
  teamSize: 5,
  estimatedPeriod: "1.1~3.1",
  duration: "3개월",
  positions: {
    기획: 1,
    디자인: 1,
    프론트엔드: 2,
    백엔드: 1,
    기타: 0,
  },
  status: "recruiting",
};

// ProjectDetailContent용 임시 데이터
const mockProjectDetailData: ProjectDetail = {
  ...mockProjectData,
  createdAt: "2025-01-01",
  updatedAt: "2025-01-15",
  ownerId: "user123",
  ownerName: "지훈",
  ownerEmail: "yamoo9@naver.com",
  ownerProfileImage: "/assets/no-profile.svg", // 실제로는 Supabase storage URL이 들어갑니다
  ownerRole: "프론트엔드",
  ownerExperience: "1년 미만",
  ownerBio: "깔끔한 코드를 지향하는 개발자입니다.",
  applicantCount: 3,
  projectPlan: `프로젝트 개발 계획:

1단계(1-2주): 기획 및 디자인
- 사용자 요구사항 분석
- UI/UX 디자인
- DB 스키마 설계

2단계(3-5주): 핵심 기능 개발
- 지도 API 연동
- AI 추천 알고리즘 구현
- 사용자 리뷰 시스템

3단계(6주): 테스트 및 배포
- 통합 테스트
- 버그 수정
- 앱스토어 배포

기술 스택:
React Native와 OpenAI API를 활용하여 크로스플랫폼 앱으로 제작합니다.`,
};

export default function ProjectDetailPage() {
  // TODO: 실제로는 현재 로그인한 사용자 ID와 프로젝트 ownerId를 비교
  const isOwner = false; // 임시: true로 변경하면 주최자 화면 확인 가능

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="white" />
      <ProjectDetailHeader project={mockProjectData} />

      {/* 프로젝트 상세 내용 */}
      <ProjectDetailContent project={mockProjectDetailData} isOwner={isOwner} />

      <Footer />
      <GoTopButton />
    </div>
  );
}
