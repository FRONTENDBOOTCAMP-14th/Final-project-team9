import AuthLayout from "@/components/auth/AuthLayout";
import FindPasswordForm from "@/components/auth/FindPasswordForm";

export default function FindPasswordPage() {
  return (
    <AuthLayout title="비밀번호 찾기" navType="findId">
      <FindPasswordForm />
    </AuthLayout>
  );
}
