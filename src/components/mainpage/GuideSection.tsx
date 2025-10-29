import Image from "next/image";
import { jalnan } from "@/fonts";
import type { GuideStepData } from "./types";

// 가이드 스텝 데이터
const guideSteps: GuideStepData[] = [
  {
    step: 1,
    icon: "/assets/step1.svg",
    title: "프로젝트 등록",
    description:
      "아이디어와 함께 제작할 팀원을\n찾는 프로젝트를 등록하거나\n조건에 맞는 프로젝트를 찾아보세요",
  },
  {
    step: 2,
    icon: "/assets/step2.svg",
    title: "팀원 모집",
    description: "해당 아이디어에 관심있는\n사용자들이 프로젝트에 지원합니다",
  },
  {
    step: 3,
    icon: "/assets/step3.svg",
    title: "프로젝트 진행",
    description: "팀 구성을 완료하고\n함께 프로젝트를 진행하세요",
  },
];

export default function GuideSection() {
  return (
    <section
      className="bg-[#E9fbff] pt-[300px] pb-[100px]"
      aria-labelledby="guide-section-heading"
    >
      <div className="max-w-[1920px] mx-auto px-16">
        <h2
          id="guide-section-heading"
          className={`text-center text-[length:var(--text-12)] font-bold text-[color:var(--color-primary)] mb-[24px] ${jalnan.className}`}
        >
          어떻게 시작 하나요?
        </h2>
        <p className="text-center text-[length:var(--text-6)] text-[color:var(--color-deep)] mb-[90px]">
          간단한 준비 단계를 거쳐 프로젝트를 진행해보세요!
        </p>

        {/* STEP 카드 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px] xl:gap-[183px] justify-items-center max-w-[1920px] mx-auto mb-[150px]"
          role="list"
          aria-label="프로젝트 시작 가이드"
        >
          {guideSteps.map((step) => (
            <article
              key={step.step}
              className="bg-white rounded-[20px] w-full max-w-[418px] h-[584px] flex flex-col items-center pt-[40px] px-[30px] shadow-[4px_4px_7px_#aaaaaa]"
              role="listitem"
            >
              <span
                className="bg-primary text-white text-[length:var(--text-6)] px-6 py-2 rounded-[10px] mb-[60px] whitespace-nowrap"
                aria-label={`${step.step}단계`}
              >
                STEP {step.step}
              </span>
              <Image
                src={step.icon}
                alt=""
                width={120}
                height={120}
                className="mb-[40px] flex-shrink-0 w-30 h-30"
                aria-hidden="true"
              />
              <h3
                className={`text-[length:var(--text-7)] font-bold text-[color:var(--color-primary)] mb-[51px] whitespace-nowrap ${jalnan.className}`}
              >
                {step.title}
              </h3>
              <p className="text-center text-[length:var(--text-6)] text-[color:var(--color-deep)] leading-relaxed break-keep">
                {(() => {
                  const lines = step.description.split("\n");
                  return lines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < lines.length - 1 && <br />}
                    </span>
                  ));
                })()}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
