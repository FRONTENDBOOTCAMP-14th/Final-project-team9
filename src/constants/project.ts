// 프로젝트 상태 관련 상수

export const PROJECT_STATUS = {
  RECRUITING: "recruiting",
  COMPLETED: "completed",
} as const;

export type ProjectStatus =
  (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  recruiting: "모집중",
  completed: "모집완료",
};

export const PROJECT_STATUS_COLOR: Record<ProjectStatus, string> = {
  recruiting: "bg-primary",
  completed: "bg-gray", // color-gray (#7989b9)
};
