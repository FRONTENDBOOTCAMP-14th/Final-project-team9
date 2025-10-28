"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { jalnan } from "../../../../fonts";
import type { User } from "@supabase/supabase-js";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isAuth?: boolean;
}

function NavLink({
  href,
  children,
  className = "cursor-pointer",
  isActive = false,
  isAuth = false,
}: NavLinkProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchUser();
  }, []);

  const baseStyles = `${jalnan.className} text-[length:var(--text-5)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md transition-colors leading-none inline-flex items-center justify-center`;
  const activeStyles = isActive
    ? "bg-gradient-to-br from-primary to-sub text-white w-40 h-10 rounded-lg"
    : "text-gray-700 hover:text-blue-600 focus:text-blue-600";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isAuth && !user) {
      router.push("/login");
      return;
    }

    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${activeStyles} ${className}`}
    >
      {children}
    </button>
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
        isAuth
      >
        프로젝트 등록
      </NavLink>
    </nav>
  );
}

export { NavLink };
