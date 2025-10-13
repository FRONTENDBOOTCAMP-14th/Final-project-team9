import Link from "next/link";
import { jalnan } from "../../../../fonts";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function NavLink({ href, children, className = "" }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`${jalnan.className} text-[length:var(--text-5)] text-gray-700 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md transition-colors leading-none ${className}`}
    >
      {children}
    </Link>
  );
}

export default function Navigation() {
  return (
    <nav
      role="navigation"
      aria-label="주요 네비게이션"
      className="flex items-center gap-[120px]"
    >
      <NavLink href="/find-project">프로젝트 찾기</NavLink>
      <NavLink href="/register-project">프로젝트 등록</NavLink>
    </nav>
  );
}

export { NavLink };
