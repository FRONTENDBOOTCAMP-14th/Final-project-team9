import Footer from "@/components/common/footer/Footer";
import GoTopButton from "@/components/common/GoTopButton";
import GuideSection from "@/components/mainpage/GuideSection";
import MainBannerSection from "@/components/mainpage/MainBannerSection";
import ProjectSection from "@/components/mainpage/ProjectSection";
import StartPromptSection from "@/components/mainpage/StartPromptSection";

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
