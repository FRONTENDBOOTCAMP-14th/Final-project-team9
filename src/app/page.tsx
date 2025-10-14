import Image from "next/image";
import Header from "@/components/common/header/Header";
import MainPageProjectCard from "@/components/common/project-card/MainPageProjectCard";
import MainPageButton from "@/components/mainpage/MainPageButton";
import { jalnan } from "@/fonts";

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
    category: "백엔드",
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
    category: "프론트엔드",
  },
];

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* 상단 히어로 섹션 */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/joyin-bg.png"
            alt="JoyIn Background"
            fill
            priority
            className="object-cover"
            quality={100}
          />
        </div>

        {/* 헤더 */}
        <Header variant="transparent" />

        {/* 메인 컨텐츠 */}
        <main className="flex flex-col items-center justify-center min-h-screen px-8">
          {/* 메인 타이틀 - 화면 중앙 */}
          <div className="flex flex-col items-center">
            <h1 className={`text-center mb-8 ${jalnan.className}`}>
              <span className="block text-[120px] font-bold leading-tight tracking-tight">
                <span className="text-white">JO</span>
                <span className="text-primary">IN</span>
                <span className="text-white"> US, EN</span>
                <span className="text-primary">JOY</span>
                <span className="text-white"> US</span>
              </span>
            </h1>

            {/* 부제 */}
            <p
              className={`text-[48px] font-bold text-deep mb-[140px] ${jalnan.className}`}
            >
              함께 성장하고, 함께 만들어가는 커뮤니티
            </p>

            {/* 버튼 그룹 */}
            <MainPageButton />
          </div>
        </main>
      </section>

      {/* 통계 섹션 */}
      <section className="bg-[#E8F4F8] py-[100px]">
        <div className="max-w-[1920px] mx-auto px-8">
          <h2
            className={`text-center text-[48px] font-bold text-primary mb-[30px] ${jalnan.className}`}
          >
            진행중인 프로젝트
          </h2>
          <p className="text-center text-[24px] text-deep mb-[80px]">
            현재 진행중인 프로젝트를 만나보세요.
          </p>

          {/* 통계 카드 */}
          <div className="flex justify-center gap-[50px] mb-[100px]">
            {/* 사용자 수 */}
            <div className="bg-white rounded-[20px] shadow-lg w-[300px] h-[200px] flex flex-col items-center pt-[27px]">
              <Image
                src="/assets/user.svg"
                alt="사용자"
                width={43}
                height={43}
                className="mb-[16px]"
              />
              <p className="text-[48px] font-bold text-primary">1200+</p>
              <p className="text-[24px] text-deep">사용자</p>
            </div>

            {/* 진행중인 프로젝트 */}
            <div className="bg-white rounded-[20px] shadow-lg w-[300px] h-[200px] flex flex-col items-center pt-[27px]">
              <Image
                src="/assets/pencil.svg"
                alt="프로젝트"
                width={43}
                height={43}
                className="mb-[16px]"
              />
              <p className="text-[48px] font-bold text-primary">240+</p>
              <p className="text-[24px] text-deep">진행 중인 프로젝트</p>
            </div>

            {/* 완성된 프로젝트 */}
            <div className="bg-white rounded-[20px] shadow-lg w-[300px] h-[200px] flex flex-col items-center pt-[27px]">
              <div className="flex items-center justify-center w-[43px] h-[43px] mb-[16px]">
                <Image
                  src="/assets/medal.svg"
                  alt="완성 프로젝트"
                  width={43}
                  height={43}
                  className="object-contain"
                />
              </div>
              <p className="text-[48px] font-bold text-primary">700+</p>
              <p className="text-[24px] text-deep">완성된 프로젝트</p>
            </div>
          </div>

          {/* 프로젝트 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[30px] justify-items-center max-w-[2100px] mx-auto">
            {projectsData.map((project) => (
              <MainPageProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
