// 프로젝트 상태 관련 상수
// Supabase에서 "true"(모집중) / "false"(모집완료) 문자열로 저장됨

export const PROJECT_STATUS = {
  RECRUITING: "true",
  COMPLETED: "false",
} as const;

export type ProjectStatus =
  (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

export const PROJECT_STATUS_LABEL: Record<string, string> = {
  true: "모집중",
  false: "모집완료",
};

export const PROJECT_STATUS_COLOR: Record<string, string> = {
  true: "bg-primary",
  false: "bg-gray", // color-gray (#7989b9)
};
