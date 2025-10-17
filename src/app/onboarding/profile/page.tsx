import AuthLayout from "@/components/auth/AuthLayout";
import ProfileForm from "@/components/auth/ProfileForm";

export default function ProfilePage() {
  return (
    <AuthLayout showLogo={false}>
      <ProfileForm />
    </AuthLayout>
  );
}
