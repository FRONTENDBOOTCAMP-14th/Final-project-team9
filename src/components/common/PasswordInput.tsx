"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { LabeledInputProps } from "@/components/common/LabeledInput";
import LabeledInput from "@/components/common/LabeledInput";

// 이 컴포넌트는 LabeledInput의 모든 속성을 받을 수 있습니다.
const PasswordInput = (props: LabeledInputProps) => {
  // 보기/숨기기 상태를 컴포넌트 내부에서 독립적으로 관리합니다.
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <LabeledInput
      // 전달받은 모든 속성을 그대로 LabeledInput에 넘겨줍니다.
      {...props}
      // type은 내부 상태(showPassword)에 따라 동적으로 결정됩니다.
      type={showPassword ? "text" : "password"}
      // icon 속성을 사용하여 보기/숨기기 버튼 UI를 렌더링합니다.
      icon={
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="flex items-center justify-center"
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {showPassword ? (
            <Image
              src="/assets/eye-off.svg"
              alt="비밀번호 숨기기"
              width={30}
              height={16}
            />
          ) : (
            <Image
              src="/assets/eye-on.svg"
              alt="비밀번호 보기"
              width={24}
              height={24}
            />
          )}
        </button>
      }
    />
  );
};

export default PasswordInput;
