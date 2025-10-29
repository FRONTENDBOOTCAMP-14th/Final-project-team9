"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import UserProfileCard from "@/components/mypage/Profile";
import Taps from "@/components/mypage/Taps";
import { supabase } from "@/lib/supabase";
import { useFavoriteStore } from "@/store/favorite-store";
import type { UserData } from "@/types/project";
import { useToastStore } from "@/store/toast-store";

type ExtendedUserData = UserData & {
  tech_stacks?: string[];
  nickname?: string;
};

export default function MyPageForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<ExtendedUserData | null>(null);
  const [projectCounts, setProjectCounts] = useState({
    myProjects: 0,
    interestedProjects: 0,
    supportedProjects: 0,
    completedProjects: 0,
  });
  const { loadFavorites } = useFavoriteStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: userInfo } = await supabase
        .from("users")
        .select("*, nickname, positions(name), careers(name)")
        .eq("id", user.id)
        .single();

      // user_tech_stacks를 별도로 조회
      const { data: userTechStacksData, error: techStackError } = await supabase
        .from("user_tech_stacks")
        .select("tech_stacks(name)")
        .eq("user_id", user.id);

      if (techStackError) {
        console.error("기술 스택 로딩 실패:", techStackError);
        showToast("기술 스택을 불러오는 데 실패했습니다.", "error");
      }

      // tech_stacks 추출
      const techStacks =
        userTechStacksData && userTechStacksData.length > 0
          ? (
              userTechStacksData as unknown as Array<{
                tech_stacks: { name: string } | null;
              }>
            )
              .map((item) => item.tech_stacks?.name)
              .filter((name): name is string => !!name)
          : [];

      // Supabase Auth의 user.user_metadata에 저장된 값과 users 테이블의 값을 병합합니다.
      // 프로필 이미지와 bio는 users 테이블 값을 우선 사용 (Storage URL이므로)
      const meta = (user.user_metadata as Record<string, unknown>) || {};

      const merged = {
        id: user.id,
        username: userInfo?.username || meta.username || user.email || "",
        nickname:
          userInfo?.nickname ||
          meta.nickname ||
          userInfo?.username ||
          meta.username ||
          "",
        email: user.email || userInfo?.email || "",
        bio: userInfo?.bio || meta.bio || "",
        profile_image: userInfo?.profile_image || meta.profile_image || "",
        // positions/careers는 user_metadata의 텍스트 값을 우선 사용
        positions: meta.positions
          ? { name: String(meta.positions) }
          : userInfo?.positions || null,
        careers: meta.careers
          ? { name: String(meta.careers) }
          : userInfo?.careers || null,
        // tech_stacks는 추출한 배열 사용
        tech_stacks: techStacks,
      } as ExtendedUserData;

      setUserData(merged);
      setLoading(false);

      // 관심 프로젝트 목록 로드
      await loadFavorites();
    };

    void fetchUser();
  }, [router, loadFavorites, showToast]);

  if (loading) return <Loading />;
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-[#e9fafe]">
      {userData && (
        <>
          <UserProfileCard
            profile_image={userData.profile_image || "/assets/no-profile.svg"}
            username={userData.username}
            nickname={userData.nickname || ""}
            email={userData.email}
            bio={userData.bio ?? ""}
            positions={userData.positions?.name || ""}
            careers={userData.careers?.name || ""}
            tech_stacks={userData.tech_stacks || []}
            projectCounts={projectCounts}
          />
          <Taps
            userId={userData.id}
            onProjectCountsChange={(counts) => {
              setProjectCounts(counts);
            }}
          />
        </>
      )}
    </div>
  );
}
