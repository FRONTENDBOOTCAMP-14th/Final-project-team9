// src/components/auth/AuthLayout.tsx
import type { LinkType } from "@/components/auth/AuthNavigationLinks";
import AuthNavigationLinks from "@/components/auth/AuthNavigationLinks";
import HeaderLogo from "@/components/auth/HeaderLogo";
import Footer from "@/components/common/footer/Footer";
import { jalnan } from "@/fonts";

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
    <div className="flex flex-col min-h-dvh bg-[#E9FBFF]">
      <section className="flex flex-col items-center justify-center flex-grow py-10 sm:py-20">
        <div className="w-full max-w-[615px] mx-auto px-4 flex flex-col gap-10">
          <header className="w-full">
            {showLogo !== false && <HeaderLogo />}
            {title && (
              <div className="text-center mt-10">
                <h1 className={`text-3xl text-[#2E4FF2] ${jalnan.className}`}>
                  {title}
                </h1>
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
