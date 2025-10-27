import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "로그인 | JOYIN",
  description:
    "JOYIN에 로그인하여 나와 딱 맞는 프로젝트 팀원을 찾고, 다양한 프로젝트에 참여해 보세요.",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default function LoginPage() {
  return (
    <AuthLayout navType="login">
      <LoginForm />
    </AuthLayout>
  );
}
