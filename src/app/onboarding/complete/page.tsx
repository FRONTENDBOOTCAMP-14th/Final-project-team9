import AuthLayout from "@/components/auth/AuthLayout";
import OnboardingCompleteClient from "@/components/auth/OnboardingCompleteClient";

export default function OnboardingCompletePage() {
  return (
    <AuthLayout showLogo={false}>
      <OnboardingCompleteClient />
    </AuthLayout>
  );
}
