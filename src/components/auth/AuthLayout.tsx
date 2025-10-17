import type { LinkType } from "@/components/auth/AuthNavigationLinks";
import AuthNavigationLinks from "@/components/auth/AuthNavigationLinks";
import HeaderLogo from "@/components/auth/HeaderLogo";
import Footer from "@/components/common/footer/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  navType?: LinkType;
}

const AuthLayout = ({ children, title, navType }: AuthLayoutProps) => {
  return (
    // 바깥 래퍼: 전체 높이/세로 플렉스 (items-center 제거!)
    <div className="min-h-screen flex flex-col bg-[#E9FBFF]">
      {/* 상단/본문/하단 링크: 가운데 615px 컨테이너 */}
      <div className="w-full max-w-[615px] mx-auto px-4 py-10">
        <header className="w-full mt-[200px]">
          <HeaderLogo />
          {title && (
            <div className="text-center mt-10">
              <h1 className="text-3xl text-[#2E4FF2] font-jalnan">{title}</h1>
            </div>
          )}
        </header>

        <main className="mt-10 w-full">{children}</main>

        <div className="mt-5 w-full">
          <AuthNavigationLinks type={navType} />
        </div>
      </div>

      {/* 푸터는 풀폭, 화면 하단에 붙이려면 mt-auto */}
      <div className="mt-[261px] w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
