import Image from "next/image";
import Footer from "@/components/common/footer/Footer";
import GoTopButton from "@/components/common/GoTopButton";
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
      <section className="bg-[#E9fbff] py-[100px]">
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
          <div className="flex justify-center gap-[180px] mb-[57px]">
            {/* 사용자 수 */}
            <div className="bg-white rounded-[20px] w-[300px] h-[200px] flex flex-col items-center pt-[27px]">
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
            <div className="bg-white rounded-[20px] w-[300px] h-[200px] flex flex-col items-center pt-[27px]">
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
            <div className="bg-white rounded-[20px] w-[300px] h-[200px] flex flex-col items-center pt-[27px]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-[30px] gap-y-[30px] max-w-[2100px] mx-auto">
            {projectsData.map((project) => (
              <MainPageProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* 시작 가이드 섹션 */}
      <section className="bg-[#E9fbff] pt-[300px] pb-[100px]">
        <div className="max-w-[1920px] mx-auto px-8">
          <h2
            className={`text-center text-[48px] font-bold text-primary mb-[24px] ${jalnan.className}`}
          >
            어떻게 시작 하나요?
          </h2>
          <p className="text-center text-[24px] text-deep mb-[90px]">
            간단한 준비 단계를 거쳐 프로젝트를 진행해보세요!
          </p>

          {/* STEP 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px] xl:gap-[183px] justify-items-center max-w-[1920px] mx-auto">
            {/* STEP 1 */}
            <div
              className="bg-white rounded-[20px] w-full max-w-[418px] h-[584px] flex flex-col items-center pt-[40px] px-[30px]"
              style={{ boxShadow: "4px 4px 7px #aaaaaa" }}
            >
              <span className="bg-primary text-white text-[24px] px-[24px] py-[8px] rounded-[10px] mb-[60px] whitespace-nowrap">
                STEP 1
              </span>
              <Image
                src="/assets/step1.svg"
                alt="프로젝트 등록"
                width={120}
                height={120}
                className="mb-[40px] flex-shrink-0"
              />
              <h3
                className={`text-[28px] font-bold text-primary mb-[51px] whitespace-nowrap ${jalnan.className}`}
              >
                프로젝트 등록
              </h3>
              <p className="text-center text-[24px] text-deep leading-relaxed break-keep">
                아이디어와 함께 제작할 팀원을
                <br />
                찾는 프로젝트를 등록하거나
                <br />
                조건에 맞는 프로젝트를 찾아보세요
              </p>
            </div>

            {/* STEP 2 */}
            <div
              className="bg-white rounded-[20px] w-full max-w-[418px] h-[584px] flex flex-col items-center pt-[40px] px-[30px]"
              style={{ boxShadow: "4px 4px 7px #aaaaaa" }}
            >
              <span className="bg-primary text-white text-[24px] px-[24px] py-[8px] rounded-[10px] mb-[60px] whitespace-nowrap">
                STEP 2
              </span>
              <Image
                src="/assets/step2.svg"
                alt="팀원 모집"
                width={120}
                height={120}
                className="mb-[40px] flex-shrink-0"
              />
              <h3
                className={`text-[28px] font-bold text-primary mb-[51px] whitespace-nowrap ${jalnan.className}`}
              >
                팀원 모집
              </h3>
              <p className="text-center text-[24px] text-deep leading-relaxed break-keep">
                해당 아이디어에 관심있는
                <br />
                사용자들이 프로젝트에 지원합니다
              </p>
            </div>

            {/* STEP 3 */}
            <div
              className="bg-white rounded-[20px] w-full max-w-[418px] h-[584px] flex flex-col items-center pt-[40px] px-[30px]"
              style={{ boxShadow: "4px 4px 7px #aaaaaa" }}
            >
              <span className="bg-primary text-white text-[24px] px-[24px] py-[8px] rounded-[10px] mb-[60px] whitespace-nowrap">
                STEP 3
              </span>
              <Image
                src="/assets/step3.svg"
                alt="프로젝트 진행"
                width={120}
                height={120}
                className="mb-[40px] flex-shrink-0"
              />
              <h3
                className={`text-[28px] font-bold text-primary mb-[51px] whitespace-nowrap ${jalnan.className}`}
              >
                프로젝트 진행
              </h3>
              <p className="text-center text-[24px] text-deep leading-relaxed break-keep">
                팀 구성을 완료하고
                <br />
                함께 프로젝트를 진행하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="relative bg-deep py-[150px]">
        {/* 중앙 배경 이미지 */}
        <div
          className="flex items-center justify-center pointer-events-none"
          style={{ filter: "drop-shadow(6px 6px 30px #ffffff)" }}
        >
          <Image
            src="/assets/joyin-bg.png"
            alt="CTA Background"
            width={1620}
            height={780}
            className="rounded-[40px]"
            quality={100}
          />
        </div>

        {/* 컨텐츠 */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-[1920px] mx-auto px-8 text-center">
            <h2
              className={`text-white text-[80px] mb-[50px] ${jalnan.className}`}
            >
              지금 바로 시작해보세요!
            </h2>
            <p className="text-deep text-[28px] leading-relaxed">
              상상하고 있는 아이디어를 사람들과 함께 제작하거나,
              <br />
              흥미로운 주제의 프로젝트에 참여해보세요!
            </p>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <Footer />

      {/* GoTop 버튼 */}
      <GoTopButton />
    </div>
  );
}
