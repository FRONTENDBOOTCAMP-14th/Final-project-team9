// ❌ "use client" 제거 (서버 컴포넌트)
import FindIdResultClient from "@/components/auth/FindIdResultClient";

export default function FindIdResultPage() {
  // 서버 페이지는 클라 훅을 쓰지 않고, 클라 컴포넌트를 렌더링만 합니다.
  return <FindIdResultClient />;
}
