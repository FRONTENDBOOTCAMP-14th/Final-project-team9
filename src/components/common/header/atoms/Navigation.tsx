"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { jalnan } from "../../../../fonts";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

function NavLink({
  href,
  children,
  className = "",
  isActive = false,
}: NavLinkProps) {
  const baseStyles = `${jalnan.className} text-[length:var(--text-5)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md transition-colors leading-none inline-flex items-center justify-center`;
  const activeStyles = isActive
    ? "bg-gradient-to-br from-primary to-sub text-white w-40 h-10 rounded-lg"
    : "text-gray-700 hover:text-blue-600 focus:text-blue-600";

  return (
    <Link href={href} className={`${baseStyles} ${activeStyles} ${className}`}>
      {children}
    </Link>
  );
}

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      aria-label="주요 네비게이션"
      className="flex items-center gap-[120px]"
    >
      <NavLink href="/find-project" isActive={pathname === "/find-project"}>
        프로젝트 찾기
      </NavLink>
      <NavLink
        href="/register-project"
        isActive={pathname === "/register-project"}
      >
        프로젝트 등록
      </NavLink>
    </nav>
  );
}

export { NavLink };
