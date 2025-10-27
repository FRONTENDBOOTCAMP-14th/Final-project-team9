// src/hooks/useDebounce.ts

import { useState, useEffect } from "react";

/**
 * 값이 변경된 후 일정 시간(delay) 동안 변경이 없으면
 * 그 값을 반환하는 디바운스 훅
 * @param value 디바운스할 값
 * @param delay 지연 시간 (ms)
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 딜레이 이후에 값을 업데이트하는 타이머 설정
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // value나 delay가 변경되면 이전 타이머를 클리어하고 새 타이머 설정
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
