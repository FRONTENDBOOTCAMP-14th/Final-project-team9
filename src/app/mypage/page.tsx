import UserProfileCard from "@/components/mypage/Profile";
import Taps from "@/components/mypage/Taps";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-[#e9fafe]">
      <UserProfileCard
        profileImageUrl="/assets/no-profile.svg"
        name="지훈"
        email="ooooseob@naver.com"
        introduction="깔끔한 코드를 지향하는 개발자입니다."
        field="프론트엔드"
        experience="5년 미만"
        skills={["react", "Tailwind", "Next"]}
        projectCounts={{
          myProjects: 3,
          interestedProjects: 1,
          supportedProjects: 4,
          completedProjects: 2,
        }}
      />
      <Taps />
    </div>
  );
}
