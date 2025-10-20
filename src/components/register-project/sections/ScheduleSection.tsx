import Dropdown from "@/components/common/input/Dropdown";
import FormCard from "../FormCard";

interface ScheduleSectionProps {
  error?: string;
}

export default function ScheduleSection({ error }: ScheduleSectionProps) {
  return (
    <FormCard
      title="예상 일정"
      description="프로젝트는 얼마나 진행될 예정인가요?"
      errorMessage={error}
      helpMessage="충분한 시간을 두고 정해주세요"
    >
      <div className="w-[571px] h-[90px] ml-[50px] mt-[30px]">
        <Dropdown
          options={["1개월", "3개월", "6개월", "1년", "1년 이상"]}
          placeholder="예상 일정을 선택해주세요"
          width="571px"
          height="90px"
        />
      </div>
    </FormCard>
  );
}
