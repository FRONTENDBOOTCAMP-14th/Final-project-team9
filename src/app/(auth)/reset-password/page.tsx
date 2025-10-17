import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout title="비밀번호 찾기" navType="findPassword">
      <ResetPasswordForm />
    </AuthLayout>
  );
}
