// src/app/test/page.tsx

"use client";

import ProfileForm from "@/components/auth/ProfileForm";

export default function TestPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#E9FBFF] py-12">
      <ProfileForm />
    </main>
  );
}
