import AuthLayout from "@/components/auth/AuthLayout";
import ProfileForm from "@/components/auth/ProfileForm";

export default function ProfilePage() {
  return (
    <AuthLayout title="프로필 설정">
      <ProfileForm />
    </AuthLayout>
  );
}
