import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import OnboardingCompleteClient from "@/components/auth/OnboardingCompleteClient";

export const metadata: Metadata = {
  title: "회원가입 | JOYIN",
  description: "가입을 축하합니다! 이제 JOYIN 활동을 시작해보세요.",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default function OnboardingCompletePage() {
  return (
    <AuthLayout showLogo={false}>
      <OnboardingCompleteClient />
    </AuthLayout>
  );
}
