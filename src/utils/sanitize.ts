/**
 * 입력값 살균처리(Sanitization) 유틸리티
 * XSS 공격, SQL Injection 등을 방지하고 안전한 입력값을 보장합니다.
 */

/**
 * HTML 태그와 스크립트를 제거하여 XSS 공격을 방지합니다.
 * @param input - 살균처리할 문자열
 * @returns HTML 태그가 제거된 안전한 문자열
 */
export function sanitizeHTML(input: string): string {
  if (!input) return "";

  // HTML 태그 제거
  let sanitized = input.replace(/<[^>]*>/g, "");

  // 스크립트 관련 위험한 문자열 제거
  sanitized = sanitized.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "",
  );

  // 이벤트 핸들러 속성 제거 (onclick, onerror 등)
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");

  // javascript: 프로토콜 제거
  sanitized = sanitized.replace(/javascript:/gi, "");

  return sanitized;
}

/**
 * 앞뒤 공백을 제거하고 연속된 공백을 하나로 정규화합니다.
 * @param input - 정규화할 문자열
 * @returns 정규화된 문자열
 */
export function normalizeWhitespace(input: string): string {
  if (!input) return "";

  return input
    .trim() // 앞뒤 공백 제거
    .replace(/\s+/g, " "); // 연속된 공백을 하나로
}

/**
 * 프로젝트 이름을 안전하게 살균처리합니다.
 * - HTML 태그 제거
 * - 공백 정규화
 * - 길이 제한 적용
 */
export function sanitizeProjectName(input: string, maxLength = 30): string {
  let sanitized = sanitizeHTML(input);
  sanitized = normalizeWhitespace(sanitized);
  return sanitized.slice(0, maxLength);
}

/**
 * 프로젝트 설명/계획을 안전하게 살균처리합니다.
 * - HTML 태그 제거
 * - 공백 정규화 (여러 줄 허용)
 * - 길이 제한 적용
 */
export function sanitizeDescription(input: string, maxLength = 1000): string {
  let sanitized = sanitizeHTML(input);
  // 설명의 경우 줄바꿈은 유지하되, 과도한 연속 줄바꿈은 제한
  sanitized = sanitized.replace(/\n{3,}/g, "\n\n");
  return sanitized.slice(0, maxLength);
}

/**
 * URL을 검증하고 안전한 형식인지 확인합니다.
 * @param url - 검증할 URL
 * @returns 유효한 URL이면 true, 아니면 false
 */
export function isValidURL(url: string): boolean {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    // http, https 프로토콜만 허용
    return ["http:", "https:"].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * 이메일 형식을 검증합니다.
 * @param email - 검증할 이메일
 * @returns 유효한 이메일이면 true, 아니면 false
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 날짜가 오늘 이후인지 검증합니다.
 * @param dateString - 검증할 날짜 문자열
 * @returns 오늘 이후의 날짜면 true, 아니면 false
 */
export function isValidFutureDate(dateString: string): boolean {
  if (!dateString) return false;

  const inputDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return inputDate >= today && !isNaN(inputDate.getTime());
}

/**
 * 텍스트가 최소 길이 요구사항을 충족하는지 검증합니다.
 * @param text - 검증할 텍스트
 * @param minLength - 최소 길이
 * @returns 요구사항을 충족하면 true, 아니면 false
 */
export function meetsMinLength(text: string, minLength: number): boolean {
  if (!text) return false;
  return text.trim().length >= minLength;
}

/**
 * 배열에서 중복을 제거하고 빈 값을 필터링합니다.
 * @param items - 정리할 배열
 * @returns 중복과 빈 값이 제거된 배열
 */
export function sanitizeArray<T>(items: T[]): T[] {
  return Array.from(new Set(items)).filter((item) => {
    if (typeof item === "string") {
      return item.trim() !== "";
    }
    return item !== null && item !== undefined;
  });
}

/**
 * 숫자가 유효한 범위 내에 있는지 검증합니다.
 * @param value - 검증할 숫자
 * @param min - 최소값
 * @param max - 최대값
 * @returns 범위 내에 있으면 true, 아니면 false
 */
export function isValidNumber(
  value: number,
  min: number,
  max: number,
): boolean {
  return !isNaN(value) && value >= min && value <= max;
}
