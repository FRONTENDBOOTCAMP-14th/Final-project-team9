import Dropdown from "@/components/common/input/Dropdown";
import FormCard from "../FormCard";

interface DomainSectionProps {
  domains: string[];
  error?: string;
}

export default function DomainSection({ domains, error }: DomainSectionProps) {
  return (
    <FormCard
      title="도메인"
      description="무엇을 만들 예정인가요?"
      errorMessage={error}
      helpMessage="가장 가까운 분야를 선택해주세요"
    >
      <div className="w-[571px] h-[90px] ml-[50px] mt-[30px]">
        <Dropdown
          options={domains.length ? domains : ["불러오는 중..."]}
          placeholder="도메인을 선택해주세요"
          width="571px"
          height="90px"
        />
      </div>
    </FormCard>
  );
}
