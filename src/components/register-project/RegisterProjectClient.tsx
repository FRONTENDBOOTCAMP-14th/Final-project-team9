"use client";

import { useState, useRef } from "react";
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
          <button
            onClick={handleNext}
            disabled={currentStep === 3}
            className={`px-6 py-2 rounded-lg ${
              currentStep === 3
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {currentStep === 3 ? "완료" : "다음"}
          </button>
        </div>
      </div>
    </>
  );
}
