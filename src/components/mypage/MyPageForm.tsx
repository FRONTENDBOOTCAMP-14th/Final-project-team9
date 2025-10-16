"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import UserProfileCard from "@/components/mypage/Profile";
import Taps from "@/components/mypage/Taps";
import { supabase } from "@/lib/supabase";
import type { UserData } from "@/types/project";

export default function MyPageForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>(null);

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

      setUserData(userInfo);
      setLoading(false);
    };

    void fetchUser();
  }, [router]);

  if (loading) return <Loading />;
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-[#e9fafe]">
      <UserProfileCard
        profileImageUrl={userData.profile_image || "/assets/no-profile.svg"}
        name={userData.username}
        email={userData.email}
        introduction={userData.bio}
        field={userData.positions.name}
        experience={userData.careers.name}
        skills={[]}
        projectCounts={{
          myProjects: 0,
          interestedProjects: 0,
          supportedProjects: 0,
          completedProjects: 0,
        }}
      />
      <Taps />
    </div>
  );
}
