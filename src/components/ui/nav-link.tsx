"use client";

import type { ComponentProps, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { tw } from "@/utils";
import Link from "./link";

/**
 * 네비게이션 링크 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <NavLink href="/about">소개</NavLink>
 *
 * // 활성화 상태 클래스 커스터마이징
 * <NavLink href="/products" activeClassName="text-blue-600 font-bold">
 *   상품 목록
 * </NavLink>
 *
 * // 비활성화 상태 클래스 지정
 * <NavLink
 *   href="/contact"
 *   activeClassName="text-primary"
 *   inactiveClassName="text-gray-500"
 * >
 *   문의하기
 * </NavLink>
 *
 * // 정확한 경로 매칭 (하위 경로 포함 안함)
 * <NavLink href="/blog" exact>
 *   블로그
 * </NavLink>
 *
 * // 비활성화된 링크
 * <NavLink href="/admin" disabled>
 *   관리자
 * </NavLink>
 * ```
 */
export default function NavLink({
  href,
  children,
  className,
  activeClassName = "text-amber-300",
  inactiveClassName,
  exact = false,
  disabled = false,
  ...props
}: Props) {
  const pathname = usePathname();

  // 현재 경로와 매칭되는지 확인
  const isActive = exact
    ? pathname === href
    : pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  // 클래스명 조합
  const combinedClassName = tw(
    className,
    isActive && !disabled && activeClassName,
    !isActive && !disabled && inactiveClassName,
    disabled && "cursor-not-allowed opacity-50",
  );

  // disabled 상태일 때는 링크 기능 비활성화
  if (disabled) {
    return (
      <span className={combinedClassName} aria-disabled="true" role="link">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={combinedClassName}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}

type Props = ComponentProps<typeof Link> & {
  href: string;
  children: ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
  exact?: boolean;
  disabled?: boolean;
};
