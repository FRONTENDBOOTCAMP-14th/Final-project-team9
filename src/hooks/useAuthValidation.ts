// src/hooks/useAuthValidation.ts

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { sanitizeHTML, normalizeWhitespace } from "@/utils/sanitize";
import { useDebounce } from "./useDebounce";

const ID_REGEX = /^[a-z0-9]{4,30}$/;
const PW_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export const useIdValidation = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (!debouncedValue) {
      setError(null);
      setIsLoading(false);
      return;
    }
    // 1. 클라이언트 규칙
    if (!ID_REGEX.test(debouncedValue)) {
      setError("아이디는 영문 소문자, 숫자로 4~30자여야 합니다.");
      setIsLoading(false);
      return;
    }
    // 2. 서버 중복 검사
    const checkDuplicate = async () => {
      setIsLoading(true);
      setError(null);
      const { data, error: dbError } = await supabase
        .from("users")
        .select("username")
        .eq("username", debouncedValue)
        .single();
      setIsLoading(false);
      if (data) {
        setError("이미 사용 중인 아이디입니다.");
      } else if (dbError && dbError.code !== "PGRST116") {
        setError("아이디 확인 중 오류가 발생했습니다.");
      } else {
        setError(null);
      }
    };
    void checkDuplicate();
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // 살균처리: HTML 태그 제거, 공백 정규화
    const sanitized = normalizeWhitespace(sanitizeHTML(rawValue));
    setValue(sanitized);
  };

  return {
    value,
    setValue,
    error: isLoading ? "중복 확인 중..." : error,
    isLoading,
    onChange: handleChange,
    isValid: !error && !isLoading && value.length > 0,
  };
};

export const usePasswordValidation = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (!PW_REGEX.test(newValue)) {
      setError(
        "비밀번호는 8자 이상, 대/소문자, 숫자, 특수문자를 포함해야 합니다."
      );
    } else {
      setError(null);
    }
  };

  return {
    value,
    setValue,
    error,
    onChange: handleChange,
    isValid: !error && value.length > 0,
  };
};

export const useRecoveryFlow = (flowType: "find-id" | "find-password") => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) {
      alert("이메일 인증을 먼저 완료해주세요!");
      return;
    }
    setIsLoading(true);
    setFormError(null);

    if (flowType === "find-password") {
      router.push("/reset-password");
      return;
    }

    if (flowType === "find-id") {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error("사용자 정보를 가져올 수 없습니다.");
        }

        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("username")
          .eq("id", user.id)
          .single();

        if (profileError || !profile?.username) {
          throw new Error("프로필 정보(아이디)를 찾는 데 실패했습니다.");
        }

        sessionStorage.setItem("foundId", profile.username);
        await supabase.auth.signOut();
        router.push(`/find-id/result`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setFormError(error.message);
        } else {
          setFormError("알 수 없는 오류가 발생했습니다.");
        }
        await supabase.auth.signOut();
        setIsLoading(false);
      }
    }
  };

  return {
    email,
    setEmail,
    isVerified,
    setIsVerified,
    isLoading,
    formError,
    handleSubmit,
  };
};
