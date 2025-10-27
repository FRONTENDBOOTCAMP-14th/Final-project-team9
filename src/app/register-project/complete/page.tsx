import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import CompletePageClient from "@/components/register-project/CompletePageClient";

export default function RegisterProjectCompletePage() {
  return (
    <div className="min-h-screen bg-[#e9fafe]">
      <Header variant="white" />
      <CompletePageClient />
      <Footer />
    </div>
  );
}
