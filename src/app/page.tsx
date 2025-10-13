import Footer from "@/components/common/footer/Footer";
import Dropdown from "@/components/common/input/Dropdown";
import ProjectCard from "@/components/common/project-card/ProjectCard";
import SearchBar from "@/components/common/search-bar/SearchBar";

export default function Home() {
  return (
    <main>
      <div>9in구직 화이팅</div>
      <Dropdown
        options={["앱 개발", "웹 개발", "백엔드", "디자인", "기획"]}
        placeholder="분야"
      />
      <ProjectCard
        id={1}
        title="AI 기반 주변 맛집 추천 서비스 개발"
        description="AI를 기반으로 주변의 맛집을 찾는 서비스"
        owner="지훈"
        level="주니어(3년 미만)"
        members={4}
        period="1.1~3.1"
        duration="2개월"
        skills={["react", "Next", "JS", "tw", "spring"]}
        remain={2}
        category="웹 개발"
      />
      <SearchBar />

      {/* 푸터 컴포넌트 */}
      <Footer />
    </main>
  );
}
