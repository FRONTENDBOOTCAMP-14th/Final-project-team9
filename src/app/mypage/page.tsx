import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserProfileCard from "@/components/mypage/Profile";

export default async function MyPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are not set");
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component에서는 cookie 설정 불가
        }
      },
    },
  });

  // 1. 현재 로그인한 사용자 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. users 테이블에서 사용자 정보 가져오기
  const { data: userInfo, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (userError || !userInfo) {
    console.error("사용자 정보 조회 실패:", userError);
    redirect("/login");
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

  // 5. 프로필 이미지 URL
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

  const userData = {
    profileImageUrl,
    name: userInfo.username || user.email?.split("@")[0] || "사용자",
    email: user.email || "",
    introduction: userInfo.bio || "",
    field: positionData?.name || "미설정",
    experience: careerData?.name || "미설정",
    skills: [], // TODO: skills 테이블에서 가져오기
    projectCounts,
  };

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
