import type { ProjectStatus } from "@/constants/project";

// 프로젝트 상세 페이지에서 사용할 전체 프로젝트 정보
export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  category: string; // "앱 개발", "웹 개발" 등

  // 팀 정보
  teamSize: number; // 팀원 수 (예: 5명)

  // 기간 정보
  estimatedPeriod: string; // 예상 기간 (예: "1.1~3.1")
  duration: string; // 총 기간 (예: "2개월")

  // 모집 포지션 정보
  positions: {
    PM: number;
    frontend: number;
    backend: number;
    designer: number;
  };

  // 프로젝트 상태 (모집중 | 모집완료)
  status: ProjectStatus;

  // 추가 정보
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  ownerName?: string;
}

// 헤더에서 사용할 간소화된 타입
export interface ProjectHeaderInfo {
  id: number;
  title: string;
  description: string;
  category: string;
  teamSize: number;
  estimatedPeriod: string;
  duration: string;
  positions: {
    PM: number;
    frontend: number;
    backend: number;
    designer: number;
  };
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
}
