// src/components/auth/AuthLayout.tsx
import type { LinkType } from "@/components/auth/AuthNavigationLinks";
import AuthNavigationLinks from "@/components/auth/AuthNavigationLinks";
import HeaderLogo from "@/components/auth/HeaderLogo";
import Footer from "@/components/common/footer/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  navType?: LinkType;
  showLogo?: boolean;
}

const AuthLayout = ({
  children,
  title,
  navType,
  showLogo,
}: AuthLayoutProps) => {
  return (
    // 최상위 div가 최소 화면 높이 유지
    <div className="flex flex-col min-h-dvh bg-[#E9FBFF]">
      {/* --- [수정] ---
        - justify-center 추가하여 내부 컨텐츠를 수직 중앙 정렬
      */}
      <section className="flex flex-col items-center justify-center flex-grow py-10 sm:py-20">
        {/* 내부 컨텐츠 너비 및 최대 너비 유지 */}
        <div className="w-full max-w-[615px] mx-auto px-4 flex flex-col gap-10">
          <header className="w-full">
            {showLogo !== false && <HeaderLogo />}
            {title && (
              <div className="text-center mt-10">
                <h1 className="text-3xl text-[#2E4FF2] font-jalnan">{title}</h1>
              </div>
            )}
          </header>

          <main className="w-full">{children}</main>

          {navType && (
            <div className="w-full">
              <AuthNavigationLinks type={navType} />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuthLayout;
