import Image from "next/image";
import MainPageProjectCard from "@/components/common/project-card/MainPageProjectCard";
import { jalnan } from "@/fonts";
import type { StatCardData } from "./types";

// 통계 카드 데이터
const statsData: StatCardData[] = [
  {
    icon: "/assets/user.svg",
    alt: "사용자 아이콘",
    value: "1200+",
    label: "사용자",
  },
  {
    icon: "/assets/pencil.svg",
    alt: "프로젝트 아이콘",
    value: "240+",
    label: "진행 중인 프로젝트",
  },
  {
    icon: "/assets/medal.svg",
    alt: "완성 프로젝트 아이콘",
    value: "700+",
    label: "완성된 프로젝트",
  },
];

// 임시 프로젝트 데이터
const projectsData = [
  {
    id: 1,
    title: "AI 기반 주변 맛집 추천 서비스 개발",
    description: "위치 기반 맛집 추천 AI 서비스",
    owner: "지훈",
    level: "주니어(3년 미만)",
    members: 4,
    period: "1.1-3.1",
    duration: "2개월",
    skills: ["React", "TypeScript", "Next.js"],
    remain: 2,
    category: "웹 개발",
  },
  {
    id: 2,
    title: "사이드 프로젝트 함께 할 앱 개발자 모집",
    description: "모바일 앱 개발 프로젝트",
    owner: "김미리",
    level: "시니어(3년 이상)",
    members: 6,
    period: "5.27-6.5",
    duration: "4개월",
    skills: ["React Native", "Flutter"],
    remain: 3,
    category: "앱 개발",
  },
  {
    id: 3,
    title: "환경 관련 플랫폼 제작 백엔드 구함",
    description: "환경 보호 플랫폼 개발",
    owner: "박주현",
    level: "주니어(3년 미만)",
    members: 4,
    period: "7.18-8.4",
    duration: "2개월",
    skills: ["Node.js", "Python", "Django"],
    remain: 1,
    category: "웹 개발",
    status: "모집완료",
  },
  {
    id: 4,
    title: "영어 학습 서비스 팀원 모집(프론트, 디자인)",
    description: "영어 학습 서비스 개발",
    owner: "조수현",
    level: "주니어(3년 미만)",
    members: 5,
    period: "9.24-10.29",
    duration: "3개월",
    skills: ["Vue.js", "Figma", "UI/UX"],
    remain: 2,
    category: "웹 개발",
    status: "모집완료",
  },
];

export default function ProjectSection() {
  return (
    <section
      className="bg-[#E9fbff] py-[100px]"
      aria-labelledby="project-section-heading"
    >
      <div className="max-w-[1920px] mx-auto px-8">
        <h2
          id="project-section-heading"
          className={`text-center text-[length:var(--text-12)] font-bold text-[color:var(--color-primary)] mt-[150px] mb-[30px] ${jalnan.className}`}
        >
          진행중인 프로젝트
        </h2>
        <p className="text-center text-[length:var(--text-6)] text-[color:var(--color-deep)] mb-[80px]">
          현재 진행중인 프로젝트를 만나보세요.
        </p>

        {/* 통계 카드 */}
        <div
          className="flex justify-center gap-[180px] mb-[57px]"
          role="list"
          aria-label="프로젝트 통계"
        >
          {statsData.map((stat, index) => (
            <article
              key={index}
              className="bg-white rounded-[20px] w-[300px] h-[200px] flex flex-col items-center pt-[27px]"
              role="listitem"
            >
              <div className="flex items-center justify-center w-[43px] h-[43px] mb-[16px]">
                <Image
                  src={stat.icon}
                  alt={stat.alt}
                  width={43}
                  height={43}
                  className="object-contain"
                />
              </div>
              <p
                className="text-[length:var(--text-12)] font-bold text-[color:var(--color-primary)]"
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </p>
              <p className="text-[length:var(--text-6)] text-[color:var(--color-deep)]">
                {stat.label}
              </p>
            </article>
          ))}
        </div>

        {/* 프로젝트 카드 그리드 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-[30px] gap-y-[30px] max-w-[2100px] mx-auto"
          role="list"
          aria-label="프로젝트 목록"
        >
          {projectsData.map((project) => (
            <MainPageProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
