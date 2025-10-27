import Footer from "@/components/common/footer/Footer";
import GoTopButton from "@/components/common/GoTopButton";
import Header from "@/components/common/header/Header";
import MyPageForm from "@/components/mypage/MyPageForm";

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
