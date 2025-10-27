import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "비밀번호 재설정 | JOYIN",
  description:
    "JOYIN 계정의 비밀번호를 새로 설정합니다. 다른 사이트에서 사용하지 않는 안전한 비밀번호로 변경해 주세요.",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout title="비밀번호 찾기" navType="findPassword">
      <ResetPasswordForm />
    </AuthLayout>
  );
}
