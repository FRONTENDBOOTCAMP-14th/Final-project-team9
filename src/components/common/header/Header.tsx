import LoginButton from "./atoms/LoginButton";
import Logo from "./atoms/Logo";
import Navigation from "./atoms/Navigation";

interface HeaderProps {
  variant?: "transparent" | "white";
}

export default function Header({ variant = "transparent" }: HeaderProps) {
  const headerStyles =
    variant === "white"
      ? "w-full h-20 bg-white"
      : "w-full h-20 bg-white/30 backdrop-blur-sm";

  return (
    <header role="banner" className={headerStyles}>
      <div className="w-full max-w-[1920px] mx-auto h-full flex items-center justify-between px-8">
        <Logo />
        <Navigation />
        <LoginButton />
      </div>
    </header>
  );
}

//메인페이지에서 사용시 import Header from '@/components/common/header/Header' + <Header /> 추가
//헤더의 배경색을 변경하고 싶다면 variant prop을 사용하여 <Header variant="white" />와 같이 설정
