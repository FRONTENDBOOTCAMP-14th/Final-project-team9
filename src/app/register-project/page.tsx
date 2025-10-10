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
import { jalnan } from "@/fonts";

export default function RegisterProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const baseFormRef = useRef<BaseFormRef>(null);
  const teamFormRef = useRef<TeamFormRef>(null);
  const detailFormRef = useRef<DetailFormRef>(null);

  const handleNext = () => {
    // 각 단계별 검증 실행
    if (currentStep === 1) {
      if (!baseFormRef.current?.validate()) {
        return; // 검증 실패시 다음 단계로 진행하지 않음
      }
    } else if (currentStep === 2) {
      if (!teamFormRef.current?.validate()) {
        return; // 검증 실패시 다음 단계로 진행하지 않음
      }
    }

    if (currentStep < 3) {
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
    <div className="min-h-screen" style={{ backgroundColor: "#e9fafe" }}>
      {/* 상단 헤더 영역 */}
      <div className="pt-20 pb-16 text-center">
        {/* 메인 제목 */}
        <h1
          className={`${jalnan.className} mb-6`}
          style={{
            fontSize: "48px",
            color: "var(--color-primary)",
          }}
        >
          프로젝트 등록하기
        </h1>

        {/* 설명 텍스트 */}
        <p
          style={{
            fontSize: "24px",
            color: "var(--color-gray)",
            marginBottom: "88px",
          }}
        >
          프로젝트 정보를 입력하고 딱 맞는 팀원을 찾아보세요!
        </p>

        {/* 스텝바 영역 - 555px 여백 */}
        <div style={{ paddingLeft: "555px", paddingRight: "555px" }}>
          <Stepbar currentStep={currentStep} />
        </div>
      </div>

      {/* 폼 영역 - 224px 여백 */}
      <div
        className="pb-20"
        style={{
          paddingLeft: "224px",
          paddingRight: "224px",
          marginTop: "160px",
        }}
      >
        {renderStepContent()}

        {/* 다음 버튼 */}
        <div className="flex justify-center" style={{ marginTop: "130px" }}>
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
    </div>
  );
}
