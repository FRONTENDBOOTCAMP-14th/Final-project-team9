"use client";

import React, { useImperativeHandle } from "react";
import { useDetailFormStore, type DetailData } from "@/store/detail-form-store";
import FormCard from "./FormCard";

interface DetailFormProps {
  onSubmit?: (data: DetailData) => void;
  ref?: React.Ref<DetailFormRef>;
}

export interface DetailFormRef {
  validate: () => boolean;
  getData: () => DetailData;
}

export default function DetailForm({ onSubmit, ref }: DetailFormProps) {
  const {
    detailData,
    errors,
    updateDetailData,
    validateForm: validateFormStore,
  } = useDetailFormStore();

  // 글자수 계산 로직
  const maxLength = 1000;
  const minLength = 50;
  const currentLength = detailData.plan.length;
  const remainingLength = maxLength - currentLength;

  // 글자수에 따른 색상 결정
  const getCounterColor = () => {
    if (currentLength === 0) return "#dbdbdb"; // 기본 색상
    if (currentLength < minLength) return "#ff6b6b"; // 최소 글자수 미달 - 빨간색
    if (remainingLength <= 100) return "#ffa500"; // 100자 이하 남음 - 주황색
    if (remainingLength <= 50) return "#ff6b6b"; // 50자 이하 남음 - 빨간색
    return "#4caf50"; // 적정 범위 - 초록색
  };

  // 글자수 상태 메시지
  const getCounterMessage = () => {
    if (currentLength === 0) return "최대 1000자 까지 가능합니다";
    if (currentLength < minLength)
      return `최소 ${minLength}자 이상 입력해주세요 (${minLength - currentLength}자 부족)`;
    if (remainingLength <= 50) return "곧 최대 글자수에 도달합니다";
    if (remainingLength <= 100) return "글자수 제한에 주의해주세요";
    return "좋습니다! 계속 작성해주세요";
  };

  const validateForm = (): boolean => {
    return validateFormStore();
  };

  // ref를 통해 외부에서 접근할 수 있는 함수들 노출
  useImperativeHandle(ref, () => ({
    validate: validateForm,
    getData: () => detailData,
  }));

  const handleInputChange = (value: string) => {
    updateDetailData("plan", value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(detailData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex justify-center">
      {/* 프로젝트 상세 계획 카드 */}
      <FormCard
        title="프로젝트 상세 계획"
        description="자세할 수록 좋은 팀원을 만날 확률이 높아요!"
        errorMessage={errors.plan}
        helpMessage=""
        width="1473px"
        height="649px"
      >
        <div className="w-full flex flex-col items-center mt-[30px] px-[69px]">
          <textarea
            value={detailData.plan}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="ex) 이 프로젝트는 향후 3개월간 주 3회, 매 회 2시간씩 온라인 미팅을 진행하며, 주요 마일스톤은 다음과 같습니다. 첫 달에는 기획 및 디자인 작업을 완료하고, 두 번째 달에는 개발을 시작하여 기본 기능을 구현할 예정입니다. 마지막 달에는 테스트 및 버그 수정을 통해 완성도를 높일 계획입니다. 팀원들은 각자의 역할에 따라 책임감을 가지고 프로젝트에 임해주셨으면 합니다. 또한, 프로젝트 진행 중 발생하는 아이디어나 개선 사항은 언제든지 공유해 주세요. 함께 멋진 결과물을 만들어 나가길 기대합니다."
            className="w-full h-[404px] border border-gray-200 rounded-lg px-[30px] py-[30px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            style={{
              fontSize: "var(--text-7)",
              color: "var(--color-gray)",
            }}
            maxLength={1000}
          />
          <div className="w-full flex justify-between items-center mt-4">
            <div
              style={{
                fontSize: "var(--text-5)",
                color: getCounterColor(),
              }}
            >
              {getCounterMessage()}
            </div>
            <div
              style={{
                fontSize: "var(--text-5)",
                color: getCounterColor(),
                fontWeight: remainingLength <= 100 ? "bold" : "normal",
              }}
            >
              {currentLength}/{maxLength}
            </div>
          </div>
        </div>
      </FormCard>
    </form>
  );
}
