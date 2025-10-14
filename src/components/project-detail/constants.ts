export const POSITION_OPTIONS = [
  "프론트엔드",
  "백엔드",
  "풀스택",
  "디자이너",
  "기획자",
] as const;

export const FORM_CONSTANTS = {
  MAX_REASON_LENGTH: 100,
  MODAL_CLOSE_DELAY: 100,
  TOAST_DURATION: 5000,
} as const;

export const ERROR_MESSAGES = {
  POSITION_REQUIRED: "포지션을 선택해주세요.",
  REASON_REQUIRED: "지원 사유를 입력해주세요.",
} as const;

export const PLACEHOLDER_TEXT = {
  REASON: "예)할줄아는게 많아요. 시켜만 주시면 열심히 하겠습니다.",
} as const;
