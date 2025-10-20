import TechStackSearchBar from "@/components/common/search-bar/TechStackSearchBar";
import FormCard from "../FormCard";

interface TechStackSectionProps {
  techStack: string[];
  techStackInput: string;
  error?: string;
  onInputChange: (value: string) => void;
  onAddTechStack: (tech: string) => void;
  onRemoveTechStack: (tech: string) => void;
}

export default function TechStackSection({
  techStack,
  techStackInput,
  error,
  onInputChange,
  onAddTechStack,
  onRemoveTechStack,
}: TechStackSectionProps) {
  return (
    <FormCard
      title="기술 스택"
      description="프로젝트에 필요한 기술 스택을 선택해주세요!"
      errorMessage={error}
      helpMessage=""
      width="1473px"
      height="351px"
    >
      <div className="w-[1373px] ml-[50px] mt-[30px]">
        <TechStackSearchBar
          value={techStackInput}
          onChange={onInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddTechStack(techStackInput);
            }
          }}
          placeholder={
            techStack.length === 0 ? "최대 10개까지 선택 가능합니다" : undefined
          }
        />
        <div className="flex flex-wrap mt-3" style={{ marginLeft: "10px" }}>
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full"
              style={{
                width: "60px",
                height: "24px",
                marginTop: "30px",
                marginRight: "20px",
                marginBottom: "42px",
                marginLeft: index === 0 ? "0px" : "20px",
                fontSize: "var(--text-5)",
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
            >
              <span className="truncate flex-1">{tech}</span>
              <button
                type="button"
                onClick={() => onRemoveTechStack(tech)}
                className="text-blue-600 hover:text-blue-800 ml-1"
                style={{ fontSize: "12px" }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </FormCard>
  );
}
