"use client";

import { useEffect, useState } from "react";
import LoginButton from "./atoms/LoginButton";
import Logo from "./atoms/Logo";
import Navigation from "./atoms/Navigation";
import ProfileImage from "./atoms/ProfileImage";

interface HeaderProps {
  variant?: "transparent" | "white";
}

export default function Header({ variant = "transparent" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerHeight = isScrolled ? "h-16" : "h-20";

  const headerStyles =
    variant === "white"
      ? `fixed top-0 left-0 w-full ${headerHeight} bg-white z-50 transition-all duration-300`
      : `fixed top-0 left-0 w-full ${headerHeight} bg-white/30 backdrop-blur-sm z-50 transition-all duration-300`;

  return (
    <header role="banner" className={headerStyles}>
      <div className="w-full max-w-[1920px] mx-auto h-full flex items-center px-8 relative">
        <Logo />
        <div className="absolute left-1/2 -translate-x-1/2">
          <Navigation />
        </div>
        <div className="flex items-center gap-[24px] ml-auto">
          <ProfileImage />
          <LoginButton />
        </div>
      </div>
    </header>
  );
}

//메인페이지에서 사용시 import Header from '@/components/common/header/Header' + <Header /> 추가
//헤더의 배경색을 변경하고 싶다면 variant prop을 사용하여 <Header variant="white" />와 같이 설정
// 페이지 컴포넌트에서 사용시
// <Header />
// <main className="pt-20"> {/* Header 높이(h-20)만큼 padding-top */}
//   {/* 페이지 컨텐츠 */}
// </main>
