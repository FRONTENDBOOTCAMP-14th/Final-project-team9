import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import ProfileForm from "@/components/auth/ProfileForm";

export const metadata: Metadata = {
  title: "회원가입 | JOYIN",
  description:
    "나만의 프로필을 설정하고 JOYIN 활동을 시작해 보세요. 잘 작성된 프로필은 프로젝트 매칭의 첫걸음입니다.",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default function ProfilePage() {
  return (
    <AuthLayout showLogo={false}>
      <ProfileForm />
    </AuthLayout>
  );
}
