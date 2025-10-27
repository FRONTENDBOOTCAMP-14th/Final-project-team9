import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import FindIdForm from "@/components/auth/FindIdForm";

export const metadata: Metadata = {
  title: "아이디 찾기 | JOYIN",
  description: "본인 인증을 통해 아이디를 찾을 수 있습니다.",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default function FindIdPage() {
  return (
    <AuthLayout title="아이디 찾기" navType="findPassword">
      <FindIdForm />
    </AuthLayout>
  );
}
