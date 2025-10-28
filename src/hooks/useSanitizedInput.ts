import { useState, useCallback } from "react";
import {
  sanitizeHTML,
  normalizeWhitespace,
  sanitizeProjectName,
  sanitizeDescription,
} from "@/utils/sanitize";

export type SanitizeMode =
  | "html" // HTML 태그만 제거
  | "text" // HTML + 공백 정규화
  | "projectName" // 프로젝트 이름용 (HTML + 공백 + 길이제한)
  | "description" // 설명용 (HTML + 줄바꿈 정리 + 길이제한)
  | "none"; // 살균처리 없음

interface UseSanitizedInputOptions {
  mode?: SanitizeMode;
  maxLength?: number;
  minLength?: number;
  onValidationError?: (error: string) => void;
}

/**
 * 살균처리가 적용된 input/textarea를 위한 커스텀 훅
 *
 * @example
 * const { value, handleChange, error } = useSanitizedInput({
 *   mode: 'text',
 *   maxLength: 100
 * });
 *
 * <input value={value} onChange={handleChange} />
 */
export function useSanitizedInput(
  initialValue = "",
  options: UseSanitizedInputOptions = {}
) {
  const { mode = "text", maxLength, minLength, onValidationError } = options;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const sanitize = useCallback(
    (input: string): string => {
      switch (mode) {
        case "html":
          return sanitizeHTML(input);

        case "text":
          return normalizeWhitespace(sanitizeHTML(input));

        case "projectName":
          return sanitizeProjectName(input, maxLength || 30);

        case "description":
          return sanitizeDescription(input, maxLength || 1000);

        case "none":
          return input;

        default:
          return normalizeWhitespace(sanitizeHTML(input));
      }
    },
    [mode, maxLength]
  );

  const validate = useCallback(
    (input: string): string => {
      const trimmed = input.trim();

      if (minLength && trimmed.length < minLength && trimmed.length > 0) {
        return `최소 ${minLength}자 이상 입력해주세요`;
      }

      if (maxLength && trimmed.length > maxLength) {
        return `최대 ${maxLength}자까지 입력 가능합니다`;
      }

      return "";
    },
    [minLength, maxLength]
  );

  const handleChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const rawValue = e.target.value;
      const sanitized = sanitize(rawValue);

      setValue(sanitized);

      const validationError = validate(sanitized);
      setError(validationError);

      if (validationError && onValidationError) {
        onValidationError(validationError);
      }
    },
    [sanitize, validate, onValidationError]
  );

  const reset = useCallback(() => {
    setValue(initialValue);
    setError("");
  }, [initialValue]);

  return {
    value,
    setValue,
    handleChange,
    error,
    reset,
  };
}

/**
 * onChange 콜백과 함께 사용하는 살균처리 함수
 * Store의 setter 함수와 함께 사용
 *
 * @example
 * <input
 *   value={formData.name}
 *   onChange={(e) => updateField('name', sanitizeOnChange(e, 'text'))}
 * />
 */
export function sanitizeOnChange(
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  mode: SanitizeMode = "text",
  maxLength?: number
): string {
  const value = e.target.value;

  switch (mode) {
    case "html":
      return sanitizeHTML(value);

    case "text":
      return normalizeWhitespace(sanitizeHTML(value));

    case "projectName":
      return sanitizeProjectName(value, maxLength || 30);

    case "description":
      return sanitizeDescription(value, maxLength || 1000);

    case "none":
      return value;

    default:
      return normalizeWhitespace(sanitizeHTML(value));
  }
}
