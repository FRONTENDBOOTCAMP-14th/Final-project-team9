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
    <div className="flex flex-col bg-[#E9FBFF]">
      <section className="grid place-items-center h-[min(100dvh,1080px)]">
        <div className="w-full max-w-[615px] mx-auto px-4 py-10 flex flex-col gap-10">
          <header className="w-full">
            <HeaderLogo />
            {title && (
              <div className="text-center mt-10">
                <h1 className="text-3xl text-[#2E4FF2] font-jalnan">{title}</h1>
              </div>
            )}
          </header>

          <main className="w-full">{children}</main>

          <div className="w-full">
            <AuthNavigationLinks type={navType} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuthLayout;
