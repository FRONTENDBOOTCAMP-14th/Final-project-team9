import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "회원가입 | JOYIN",
  description:
    "JOYIN에 회원가입하고 나와 딱 맞는 프로젝트 팀원을 만나보세요! 간편하게 가입하고 지금 바로 활동을 시작할 수 있습니다.",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default function SignUpPage() {
  return (
    <AuthLayout title="회원가입">
      <SignUpForm />
    </AuthLayout>
  );
}
