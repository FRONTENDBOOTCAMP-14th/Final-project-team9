import { useEffect } from "react";

export default function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    // isLocked 상태가 true일 때만 스크롤을 잠금
    if (isLocked) {
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      const originalPaddingRight = window.getComputedStyle(
        document.body,
      ).paddingRight;

      // 1. 스크롤바의 너비를 계산
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // 2. body에 스타일을 적용
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.backgroundColor = `#e9fafe`;

      // 3. 컴포넌트가 언마운트되거나 isLocked가 false가 되면 원래 스타일로 복원
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
    // isLocked가 false이면 아무것도 하지 않음
  }, [isLocked]);
}
