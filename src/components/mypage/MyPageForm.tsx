"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import UserProfileCard from "@/components/mypage/Profile";
import Taps from "@/components/mypage/Taps";
import { supabase } from "@/lib/supabase";
import type { UserData } from "@/types/project";

type ExtendedUserData = UserData & { tech_stacks?: string[] };

export default function MyPageForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<ExtendedUserData | null>(null);

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
        .select("*, positions(name), careers(name)")
        .eq("id", user.id)
        .single();

      // Supabase Auth의 user.user_metadata에 저장된 값과 users 테이블의 값을 병합합니다.
      // 일부 환경에서는 users 테이블에 프로필 컬럼이 없을 수 있으므로 metadata에 저장된 값을 우선 사용합니다.
      const meta = (user.user_metadata as Record<string, unknown>) || {};

      const merged = {
        id: user.id,
        username: meta.username || userInfo?.username || "",
        email: user.email || userInfo?.email || "",
        bio: meta.bio || userInfo?.bio || "",
        profile_image: meta.profile_image || userInfo?.profile_image || "",
        // positions/careers은 relation으로 객체일 수 있으므로 userInfo 우선, 없으면 metadata에서 문자열로 복원
        positions:
          userInfo?.positions ||
          (meta.positions ? { name: String(meta.positions) } : null),
        careers:
          userInfo?.careers ||
          (meta.careers ? { name: String(meta.careers) } : null),
        // skills는 metadata나 users 테이블에 저장될 수 있으므로 둘 다 확인
        skills:
          (meta.skills as string[] | undefined) ||
          (userInfo?.skills as string[] | undefined) ||
          [],
      } as UserData;

      setUserData(merged);
      setLoading(false);
    };

    void fetchUser();
  }, [router]);

  if (loading) return <Loading />;
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-[#e9fafe]">
      {userData && (
        <>
          <UserProfileCard
            profile_image={userData.profile_image || "/assets/no-profile.svg"}
            username={userData.username}
            email={userData.email}
            bio={userData.bio}
            positions={userData.positions?.name || ""}
            careers={userData.careers?.name || ""}
            tech_stacks={userData.tech_stacks || []}
            projectCounts={{
              myProjects: 0,
              interestedProjects: 0,
              supportedProjects: 0,
              completedProjects: 0,
            }}
          />
          <Taps
            userId={userData.id}
            onProjectCountsChange={(counts) => {
              // 프로젝트 수 업데이트
              setUserData((prev) =>
                prev
                  ? {
                      ...prev,
                      projectCounts: {
                        myProjects: counts.myProjects,
                        interestedProjects: counts.interestedProjects,
                        supportedProjects: counts.supportedProjects,
                        completedProjects: counts.completedProjects,
                      },
                    }
                  : null,
              );
            }}
          />
        </>
      )}
    </div>
  );
}
