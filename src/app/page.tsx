import type { Metadata } from "next";
import Footer from "@/components/common/footer/Footer";
import GoTopButton from "@/components/common/GoTopButton";
import GuideSection from "@/components/mainpage/GuideSection";
import MainBannerSection from "@/components/mainpage/MainBannerSection";
import ProjectSection from "@/components/mainpage/ProjectSection";
import StartPromptSection from "@/components/mainpage/StartPromptSection";

export const metadata: Metadata = {
  title: "JOYIN - 프로젝트 팀원 모집 플랫폼",
  description:
    "나와 딱 맞는 프로젝트 팀원을 찾아보세요! 다양한 도메인의 프로젝트를 탐색하고, 함께 성장할 팀원을 만나보세요.",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default function HomePage() {
  return (
    <div className="relative w-full">
      <MainBannerSection />
      <ProjectSection />
      <GuideSection />
      <StartPromptSection />
      <Footer />
      <GoTopButton />
    </div>
  );
}
