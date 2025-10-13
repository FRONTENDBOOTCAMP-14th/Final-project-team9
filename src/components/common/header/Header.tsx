import LoginButton from "./atoms/LoginButton";
import Logo from "./atoms/Logo";
import Navigation from "./atoms/Navigation";

export default function Header() {
  return (
    <header
      role="banner"
      className="w-full h-20 bg-white/30 backdrop-blur-sm border-b border-white/20"
    >
      <div className="w-full max-w-[1920px] mx-auto h-full flex items-center justify-between px-8">
        <Logo />
        <Navigation />
        <LoginButton />
      </div>
    </header>
  );
}

//메인페이지에서 사용시 import Header from '@/components/common/header/Header' + <Header /> 추가;
