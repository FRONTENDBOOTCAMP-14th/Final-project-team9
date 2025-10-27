import type { Metadata } from "next";
import Footer from "@/components/common/footer/Footer";
import GoTopButton from "@/components/common/GoTopButton";
import Header from "@/components/common/header/Header";
import MyPageForm from "@/components/mypage/MyPageForm";

export const metadata: Metadata = {
  title: "마이페이지 | JOYIN",
  description: "내 프로필과 프로젝트를 관리하세요!",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default async function MyPage() {
  return (
    <div className="bg-[#e9fafe] pt-35">
      <Header variant="white" />
      <MyPageForm />
      <Footer />
      <GoTopButton />
    </div>
  );
}
