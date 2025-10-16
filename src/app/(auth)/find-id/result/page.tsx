import FoundIdDisplay from "@/components/auth/FoundIdDisplay";

export default function FindIdResultPage() {
  // 결과 표시 컴포넌트에 필요한 임시 데이터를 전달합니다.
  // 실제 prop 이름은 컴포넌트 정의에 따라 다를 수 있습니다.
  const tempFoundId = "joyin@example.com";

  return (
    <div>
      <FoundIdDisplay foundId={tempFoundId} />
    </div>
  );
}
