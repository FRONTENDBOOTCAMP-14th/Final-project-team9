// src/components/auth/AuthLayout.tsx
import type { LinkType } from "@/components/auth/AuthNavigationLinks";
import AuthNavigationLinks from "@/components/auth/AuthNavigationLinks";
import HeaderLogo from "@/components/auth/HeaderLogo";
import Footer from "@/components/common/footer/Footer";
import { jalnan } from "@/fonts"; // jalnan 폰트 import

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
    // 1. 최상위 div: 배경색만 담당
    <div className="bg-[#E9FBFF]">
      {/* 2. section: 
            - 원래대로 grid, place-items-center, h-[min(100dvh,1080px)] 유지
            - overflow-hidden 추가
      */}
      <section className="grid place-items-center h-[min(100dvh,1080px)] overflow-hidden">
        {/* 3. 내부 div (스크롤 컨테이너):
            - 기존 스타일(max-w, mx-auto, px, flex, gap) 유지
            - overflow-y-auto, h-full, py-... 유지
            - (핵심!) justify-center 추가: 내부 요소(header, main, nav)를 수직 중앙 정렬
        */}
        <div className="w-full max-w-[615px] h-full mx-auto px-4 py-10 sm:py-16 flex flex-col justify-center gap-10 overflow-y-auto">
          <header className="w-full flex-shrink-0">
            {showLogo !== false && <HeaderLogo />}
            {title && (
              <div className="text-center mt-10">
                <h1 className={`text-3xl text-[#2E4FF2] ${jalnan.className}`}>
                  {title}
                </h1>
              </div>
            )}
          </header>

          {/* main은 자동으로 내용만큼 늘어남 */}
          <main className="w-full">{children}</main>

          {navType && (
            <div className="w-full flex-shrink-0">
              <AuthNavigationLinks type={navType} />
            </div>
          )}
        </div>
      </section>

      {/* 4. Footer는 section 밖에 위치 */}
      <Footer />
    </div>
  );
};

export default AuthLayout;
