import AuthLayout from "@/components/auth/AuthLayout";
import FindIdForm from "@/components/auth/FindIdForm";

export default function FindIdPage() {
  return (
    <AuthLayout title="아이디 찾기" navType="findPassword">
      <FindIdForm />
    </AuthLayout>
  );
}
