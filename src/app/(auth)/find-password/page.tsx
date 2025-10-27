import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import FindPasswordForm from "@/components/auth/FindPasswordForm";

export const metadata: Metadata = {
  title: "비밀번호 찾기 | JOYIN",
  description: "본인 인증을 통해 비밀번호를 찾을 수 있습니다.",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default function FindPasswordPage() {
  return (
    <AuthLayout title="비밀번호 찾기" navType="findId">
      <FindPasswordForm />
    </AuthLayout>
  );
}
