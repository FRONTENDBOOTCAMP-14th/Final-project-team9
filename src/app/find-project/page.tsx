import Footer from "@/components/common/footer/Footer";
import GoTopButton from "@/components/common/GoTopButton";
import Header from "@/components/common/header/Header";
import FindProjectContent from "@/components/find-project/FindProjectContent";

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
