"use client";

import { useState } from "react";
import Stepbar from "@/components/register-project/StepBar";

export default function RegisterProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">1단계: 기본 정보</h2>
            <p className="text-gray-600">
              여기에 기본 정보 입력 폼이 들어갑니다.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">2단계: 팀</h2>
            <p className="text-gray-600">
              여기에 팀 정보 입력 폼이 들어갑니다.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">3단계: 상세 계획</h2>
            <p className="text-gray-600">
              여기에 상세 계획 입력 폼이 들어갑니다.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ paddingLeft: "555px", paddingRight: "555px" }}
    >
      <div className="py-8">
        <Stepbar currentStep={currentStep} />

        <div className="mt-8">
          <h1 className="text-2xl font-bold text-center mb-8">프로젝트 등록</h1>
          {renderStepContent()}

          {/* 이전/다음 버튼 */}
          <div className="max-w-md mx-auto mt-6 flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg ${
                currentStep === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              이전
            </button>
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
    </div>
  );
}
