"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserProfileCard from "@/components/mypage/Profile";
import { supabase } from "@/lib/supabase";

interface UserData {
  profileImageUrl: string;
  name: string;
  email: string;
  introduction: string;
  field: string;
  experience: string;
  skills: string[];
  projectCounts: {
    myProjects: number;
    interestedProjects: number;
    supportedProjects: number;
    completedProjects: number;
  };
}

export default function MyPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. 현재 로그인한 사용자 확인
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          alert("로그인이 필요합니다.");
          router.push("/login");
          return;
        }

        // 2. users 테이블에서 사용자 정보 가져오기
        const { data: userInfo, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (userError) {
          console.error("사용자 정보 조회 실패:", userError);
          throw userError;
        }

        // 3. 포지션 정보 가져오기
        const { data: positionData } = await supabase
          .from("positions")
          .select("name")
          .eq("id", userInfo.position_id)
          .single();

        // 4. 경력 정보 가져오기
        const { data: careerData } = await supabase
          .from("careers")
          .select("name")
          .eq("id", userInfo.career_id)
          .single();

        // 5. 프로필 이미지 URL (user_metadata 또는 users 테이블)
        const profileImageUrl =
          user.user_metadata?.profile_image ||
          userInfo.profile_image ||
          "/assets/no-profile.svg";

        // 6. 프로젝트 카운트 (TODO: 실제 데이터로 교체)
        const projectCounts = {
          myProjects: 0,
          interestedProjects: 0,
          supportedProjects: 0,
          completedProjects: 0,
        };

        setUserData({
          profileImageUrl,
          name: userInfo.username || user.email?.split("@")[0] || "사용자",
          email: user.email || "",
          introduction: userInfo.bio || "",
          field: positionData?.name || "미설정",
          experience: careerData?.name || "미설정",
          skills: [], // TODO: skills 테이블에서 가져오기
          projectCounts,
        });
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        alert("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    void fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e9fafe] flex items-center justify-center">
        <div className="text-2xl">로딩 중...</div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#e9fafe]">
      <UserProfileCard
        profileImageUrl={userData.profileImageUrl}
        name={userData.name}
        email={userData.email}
        introduction={userData.introduction}
        field={userData.field}
        experience={userData.experience}
        skills={userData.skills}
        projectCounts={userData.projectCounts}
      />
      <Taps />
    </div>
  );
}
