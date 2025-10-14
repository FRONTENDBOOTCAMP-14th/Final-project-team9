"use client";

import { useState, useRef } from "react";
import Button from "@/components/common/Button";
import BaseForm, {
  type BaseFormRef,
} from "@/components/register-project/BaseForm";
import DetailForm, {
  type DetailFormRef,
} from "@/components/register-project/DetailForm";
import Stepbar from "@/components/register-project/StepBar";
import TeamForm, {
  type TeamFormRef,
} from "@/components/register-project/TeamForm";

export default function RegisterProjectClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const baseFormRef = useRef<BaseFormRef>(null);
  const teamFormRef = useRef<TeamFormRef>(null);
  const detailFormRef = useRef<DetailFormRef>(null);

  const handleNext = () => {
    let canProceed = false;

    switch (currentStep) {
      case 1:
        canProceed = baseFormRef.current?.validate() ?? false;
        break;
      case 2:
        canProceed = teamFormRef.current?.validate() ?? false;
        break;
      case 3:
        canProceed = detailFormRef.current?.validate() ?? false;
        break;
    }

    if (canProceed && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BaseForm ref={baseFormRef} onSubmit={() => {}} />;
      case 2:
        return <TeamForm ref={teamFormRef} onSubmit={() => {}} />;
      case 3:
        return <DetailForm ref={detailFormRef} onSubmit={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* 스텝바 영역 - 555px 여백 */}
      <div className="px-[555px]">
        <Stepbar currentStep={currentStep} />
      </div>

      {/* 폼 영역 - 224px 여백 */}
      <div className="pb-20 px-[224px] mt-[160px]">
        {renderStepContent()}

        {/* 다음 버튼 */}
        <div className="flex justify-center mt-[130px]">
          <Button
            onClick={handleNext}
            disabled={currentStep === 3}
            variant="primary"
            size="lg"
            className="w-[270px] h-[90px] text-[length:var(--text-7)] gap-3"
          >
            <span>{currentStep === 3 ? "완료" : "다음 단계"}</span>
            {currentStep !== 3 && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
