import type { ProjectStatus } from "@/constants/project";

// 프로젝트 상세 페이지에서 사용할 전체 프로젝트 정보
export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  category: "앱 개발" | "웹 개발" | "게임" | "시스템" | "기타"; // 프로젝트 분야
  domain: "이커머스" | "SNS" | "게임" | "유틸" | "커뮤니티" | "기타"; // 프로젝트 도메인
  // 기술 스택 (통합 사용)
  techStack?: string[];
  // 우대사항 (통합 사용)
  preferences?: string[];
  // 요구사항 (통합 사용)
  requirements?: string[];

  // 팀 정보
  teamSize: number; // 팀원 수 (예: 5명)

  // 기간 정보
  estimatedPeriod: string; // 예상 기간 (예: "1.1~3.1")
  duration: "1개월" | "3개월" | "6개월" | "1년"; // 총 기간

  // 모집 포지션 정보
  positions: {
    기획: number;
    디자인: number;
    프론트엔드: number;
    백엔드: number;
    기타: number;
  };

  // 프로젝트 상태 (모집중 | 모집완료)
  status: ProjectStatus;

  // 추가 정보
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerProfileImage?: string; // 주최자 프로필 이미지 URL
  ownerRole?: string; // 주최자 역할 (예: "프론트엔드")
  ownerExperience?: string; // 주최자 경력 (예: "1년 미만")
  ownerBio?: string; // 주최자 소개
  applicantCount?: number; // 지원자 수
  projectPlan?: string; // 프로젝트 상세 계획
}

// 헤더에서 사용할 간소화된 타입
export interface ProjectHeaderInfo {
  id: number;
  title: string;
  description: string;
  category: "앱 개발" | "웹 개발" | "게임" | "시스템" | "기타";
  domain: "이커머스" | "SNS" | "게임" | "유틸" | "커뮤니티" | "기타";
  // 프로젝트 카드/헤더에서도 동일 키 사용
  techStack?: string[];
  preferences?: string[];
  requirements?: string[];
  teamSize: number;
  estimatedPeriod: string;
  duration: "1개월" | "3개월" | "6개월" | "1년";
  positions: {
    기획: number;
    디자인: number;
    프론트엔드: number;
    백엔드: number;
    기타: number;
  };
  status: ProjectStatus;
}

// 프로젝트 카드에서 사용할 타입 (검색/목록 페이지)
export interface ProjectCard {
  id: number;
  title: string;
  description: string;
  owner: string;
  level: string;
  members: number;
  period: string;
  duration: "1개월" | "3개월" | "6개월" | "1년";
  skills: string[];
  remain: number;
  category: "앱 개발" | "웹 개발" | "게임" | "시스템" | "기타";
  domain: "이커머스" | "SNS" | "게임" | "유틸" | "커뮤니티" | "기타";
  position: string;
  status: ProjectStatus;
}

// UI 컴포넌트 관련 타입

// 지원 모달
export interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApplyFormData) => void;
}

export interface ApplyFormData {
  position: string;
  reason: string;
}

export interface FormErrors {
  position: string;
  reason: string;
}

// 성공 토스트
export interface SuccessToastProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
}

// 유저 타입
export interface Position {
  name: string;
}

export interface Career {
  name: string;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  bio?: string;
  profile_image?: string;
  positions: Position;
  careers: Career;
}
