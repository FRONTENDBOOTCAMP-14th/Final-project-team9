import type { LinkType } from "@/components/auth/AuthNavigationLinks";
import AuthNavigationLinks from "@/components/auth/AuthNavigationLinks";
import HeaderLogo from "@/components/auth/HeaderLogo";

interface AuthLayoutProps {
  /** 이 레이아웃이 감쌀 자식 요소 (예: LoginForm, SignUpForm) */
  children: React.ReactNode;
  /** 페이지 상단에 표시될 제목 (선택 사항) */
  title?: string;
  /** 하단에 표시될 네비게이션 링크의 종류 */
  navType?: LinkType;
}

/**
 * 인증 관련 페이지를 위한 공통 레이아웃 컴포넌트입니다.
 * [로고, 제목(선택), 자식 컨텐츠(폼), 하단 링크] 구조를 가집니다.
 * 이 컴포넌트가 모든 요소의 배치와 간격을 책임집니다.
 */
const AuthLayout = ({ children, title, navType }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
      {/* --- 상단 영역 (로고와 제목) --- */}
      <header className="w-full max-w-[615px]">
        <HeaderLogo />
        {/* title prop이 있을 때만 제목을 렌더링합니다. */}
        {title && (
          <div className="text-center mt-10">
            <h1 className="text-3xl text-[#2E4FF2] font-jalnan">{title}</h1>
          </div>
        )}
      </header>

      {/* --- 메인 콘텐츠 영역 (폼 컴포넌트가 들어올 자리) --- */}
      <main className="mt-10 w-full max-w-[615px]">{children}</main>

      {/* --- 하단 링크 영역 --- */}
      {/* 자식 컴포넌트가 스스로 정렬하도록 공간만 마련해줍니다. */}
      <footer className="mt-5 w-full max-w-[615px]">
        <AuthNavigationLinks type={navType} />
      </footer>
    </div>
  );
};

export default AuthLayout;
