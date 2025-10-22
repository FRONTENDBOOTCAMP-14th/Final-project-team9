import TechStackSearchBar from "@/components/common/search-bar/TechStackSearchBar";
import TagList from "@/components/common/tag/TagList";
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
        <div className="mt-[20px] ml-[10px]">
          <TagList
            items={techStack}
            removable={true}
            onRemove={onRemoveTechStack}
            tagClassName="bg-primary text-white"
            labelClassName="text-6 font-medium text-white"
          />
        </div>
      </div>
    </FormCard>
  );
}
