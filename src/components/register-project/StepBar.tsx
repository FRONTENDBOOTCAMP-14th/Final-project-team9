interface StepbarProps {
  currentStep: number;
}

const Stepbar = ({ currentStep }: StepbarProps) => {
  const steps = [
    { number: 1, label: "기본 정보" },
    { number: 2, label: "팀" },
    { number: 3, label: "상세 계획" },
  ];

  return (
    <div className="w-full flex justify-center">
      <div
        className="flex flex-col items-center justify-center"
        style={{ width: "810px", height: "154px" }}
      >
        {/* 원형 버튼들과 연결선 */}
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              {/* 단계 원형 버튼 */}
              <div
                className="w-[100px] h-[100px] rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor:
                    step.number <= currentStep
                      ? "var(--color-primary)"
                      : "var(--color-gray)",
                  fontSize: "var(--text-10)",
                }}
              >
                {step.number}
              </div>

              {/* 연결선 (마지막 단계가 아닌 경우에만) */}
              {index < steps.length - 1 && (
                <div
                  className="w-[300px] h-[3px]"
                  style={{
                    backgroundColor:
                      step.number < currentStep
                        ? "var(--color-primary)"
                        : "var(--color-gray)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* 단계 라벨들 */}
        <div
          className="flex items-center justify-center"
          style={{ marginTop: "22px" }}
        >
          {steps.map((step, index) => (
            <div key={`label-${step.number}`} className="flex items-center">
              {/* 라벨 */}
              <div className="w-[100px] text-center">
                <span
                  className="font-bold"
                  style={{
                    color:
                      step.number <= currentStep
                        ? "var(--color-primary)"
                        : "var(--color-gray)",
                    fontSize: "var(--text-6)",
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* 연결선 공간과 동일한 너비 */}
              {index < steps.length - 1 && <div className="w-[300px]" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepbar;
