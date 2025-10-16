"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { jalnan } from "../../../../fonts";

interface Props {
  className?: string;
}

export default function LoginButton({ className = "" }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const baseStyles =
    "w-[100px] h-[45px] rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center";
  const variantStyles =
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none";

  useEffect(() => {
    // 현재 로그인 상태 확인
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    void checkUser();

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/");
  };

  if (isLoggedIn) {
    return (
      <button
        onClick={() => void handleLogout()}
        role="button"
        aria-label="로그아웃"
        className={`${baseStyles} ${variantStyles} ${jalnan.className} text-[length:var(--text-5)] ${className}`}
      >
        로그아웃
      </button>
    );
  }

  return (
    <Link
      href="/login"
      role="button"
      aria-label="로그인 페이지로 이동"
      className={`${baseStyles} ${variantStyles} ${jalnan.className} text-[length:var(--text-5)] ${className}`}
    >
      로그인
    </Link>
  );
}
