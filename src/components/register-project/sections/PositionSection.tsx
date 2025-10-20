import Dropdown from "@/components/common/input/Dropdown";
import FormCard from "../FormCard";

interface Position {
  role: string;
  count: number;
}

interface PositionSectionProps {
  positions: Position[];
  availablePositions: string[];
  error?: string;
  onAddPosition: () => void;
  onRemovePosition: (index: number) => void;
  onUpdateRole: (index: number, role: string) => void;
  onUpdateCount: (index: number, delta: number) => void;
}

export default function PositionSection({
  positions,
  availablePositions,
  error,
  onAddPosition,
  onRemovePosition,
  onUpdateRole,
  onUpdateCount,
}: PositionSectionProps) {
  return (
    <FormCard
      title="포지션"
      description="어떤 팀원이 필요한가요?"
      errorMessage={error}
      helpMessage=""
      width="1473px"
      height={`${Math.max(405, 180 + positions.length * 120 + 80)}px`}
    >
      <div className="w-[1373px] ml-[50px] mt-[30px] space-y-3">
        {positions.map((position, index) => (
          <div key={index} className="flex items-center gap-[44px]">
            <div className="w-[848px]">
              <Dropdown
                options={
                  availablePositions.length
                    ? availablePositions
                    : ["불러오는 중..."]
                }
                placeholder={`포지션${index + 1}을 선택해주세요`}
                width="848px"
                height="90px"
                onChange={(value) => onUpdateRole(index, value)}
                value={position.role}
              />
            </div>
            <div className="w-[369px] h-[90px] flex items-center border border-gray-200 rounded-lg px-[40px]">
              <button
                type="button"
                onClick={() => onUpdateCount(index, -1)}
                className="w-[30px] h-[30px] flex items-center justify-center text-gray-500 hover:text-gray-700 rounded"
                style={{ fontSize: "18px" }}
              >
                −
              </button>
              <span
                className="flex-1 h-full flex items-center justify-center"
                style={{
                  fontSize: "var(--text-7)",
                  color: "var(--color-gray)",
                }}
              >
                {position.count}명
              </span>
              <button
                type="button"
                onClick={() => onUpdateCount(index, 1)}
                className="w-[30px] h-[30px] flex items-center justify-center text-gray-500 hover:text-gray-700 rounded"
                style={{ fontSize: "18px" }}
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => onRemovePosition(index)}
              className="w-[30px] h-[30px] flex items-center justify-center text-gray-500 hover:text-gray-700 rounded ml-[44px]"
              style={{ fontSize: "18px" }}
            >
              −
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddPosition}
          className="w-full h-[50px] border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center"
        >
          + 포지션 추가
        </button>
      </div>
    </FormCard>
  );
}
