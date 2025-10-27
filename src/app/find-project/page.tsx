import type { Metadata } from "next";
import Footer from "@/components/common/footer/Footer";
import GoTopButton from "@/components/common/GoTopButton";
import Header from "@/components/common/header/Header";
import FindProjectContent from "@/components/find-project/FindProjectContent";

export const metadata: Metadata = {
  title: "프로젝트 찾기 | JOYIN",
  description: "프로젝트를 검색하고 딱 맞는 프로젝트을 찾아보세요!",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default function FindProjectPage() {
  return (
    <div className="min-h-screen bg-[#e9fbff] flex flex-col items-center">
      <Header variant="white" />
      <FindProjectContent />
      <Footer />
      <GoTopButton />
    </div>
  );
}
