// src/app/test/page.tsx

"use client"; // LoginForm이 state를 사용하므로 client component여야 합니다.

import LoginForm from "@/components/auth/LoginForm";

export default function TestPage() {
  return (
    // 전체 화면을 차지하고, 폼을 가운데 정렬합니다.
    <main className="flex min-h-screen items-center justify-center bg-[#E9FBFF]">
      <LoginForm />
    </main>
  );
}
