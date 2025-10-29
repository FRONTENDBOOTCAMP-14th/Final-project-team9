"use client";

import { useToastStore } from "@/store/toast-store";
import SuccessToast from "@/components/project-detail/SuccessToast";
// (옵션) 나중에 에러 토스트도 만들면 여기서 분기 처리
// import ErrorToast from "@/components/common/ErrorToast";

export default function GlobalToast() {
  const { isVisible, message, type, hideToast } = useToastStore();

  // type에 따라 다른 토스트를 보여줄 수 있습니다.
  if (type === "error") {
    // return <ErrorToast isVisible={isVisible} onClose={hideToast} message={message} />
  }

  // 기본은 SuccessToast 사용
  return (
    <SuccessToast isVisible={isVisible} onClose={hideToast} message={message} />
  );
}
