"use client";

import Button from "@/components/common/Button";

interface RecruitmentButtonProps {
  isClosed: boolean;
  isOwner: boolean;
  hasApplied?: boolean;
  onCloseRecruitment: () => void | Promise<void>;
  onApply: () => void;
  size?: "small" | "large";
}

export default function RecruitmentButton({
  isClosed,
  isOwner,
  hasApplied = false,
  onCloseRecruitment,
  onApply,
  size = "small",
}: RecruitmentButtonProps) {
  const isSmall = size === "small";
  const width = isSmall ? "w-[270px]" : "w-full";
  const height = isSmall ? "h-[96px]" : "h-[90px]";
  const fontSize = isSmall ? "text-[28px]" : "text-[36px]";
  const buttonSize = isSmall ? "lg" : "xl";

  if (isClosed) {
    return (
      <button
        disabled
        className={`${width} ${height} ${fontSize} rounded-[20px] bg-gray-400 text-white cursor-not-allowed font-semibold`}
        aria-label="모집이 마감되었습니다"
      >
        모집마감
      </button>
    );
  }

  if (isOwner) {
    return (
      <Button
        variant="primary"
        size={buttonSize}
        onClick={() => void onCloseRecruitment()}
        className={`${width} ${height} ${fontSize} rounded-[20px]`}
        aria-label="모집 마감하기"
      >
        마감하기
      </Button>
    );
  }

  if (hasApplied) {
    return (
      <button
        disabled
        className={`${width} ${height} ${fontSize} rounded-[20px] bg-green-400 text-white cursor-not-allowed font-semibold`}
        aria-label="이미 지원한 프로젝트입니다"
      >
        지원완료
      </button>
    );
  }

  return (
    <Button
      variant="primary"
      size={buttonSize}
      onClick={onApply}
      className={`${width} ${height} ${fontSize} rounded-[20px]`}
      aria-label="프로젝트에 지원하기"
    >
      지원하기
    </Button>
  );
}
