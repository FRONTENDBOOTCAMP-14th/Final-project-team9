import FormCard from "../FormCard";

interface RequirementsSectionProps {
  requirements: string[];
  onAddRequirement: () => void;
  onUpdateRequirement: (index: number, value: string) => void;
}

export default function RequirementsSection({
  requirements,
  onAddRequirement,
  onUpdateRequirement,
}: RequirementsSectionProps) {
  return (
    <FormCard
      title="요구 사항"
      description="팀원에게 꼭 필요한 조건이 있나요?"
      errorMessage=""
      helpMessage=""
      width="1473px"
      height={`${Math.max(405, 180 + requirements.length * 120 + 80)}px`}
    >
      <div className="w-[1373px] ml-[50px] mt-[30px] space-y-3">
        {requirements.map((req, index) => (
          <input
            key={index}
            type="text"
            value={req}
            onChange={(e) => onUpdateRequirement(index, e.target.value)}
            placeholder="요구사항을 입력해주세요"
            className="w-full h-[90px] border border-gray-200 rounded-lg px-[30px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              fontSize: "var(--text-7)",
              color: "var(--color-gray)",
            }}
          />
        ))}
        <div
          className="mb-2"
          style={{
            marginTop: "19px",
            fontSize: "var(--text-5)",
            color: "#dbdbdb",
          }}
        >
          선택사항이예요. 비워두셔도 괜찮아요. (최대 25자까지 가능합니다)
        </div>
        <button
          type="button"
          onClick={onAddRequirement}
          className="w-full h-[50px] border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center"
        >
          + 요구사항 추가
        </button>
      </div>
    </FormCard>
  );
}
