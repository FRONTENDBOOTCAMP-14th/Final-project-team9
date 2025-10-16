"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ProfileImage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // 현재 로그인 상태 및 프로필 이미지 확인
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsLoggedIn(true);

        // 1. user_metadata에서 프로필 이미지 확인
        let profileImage = user.user_metadata?.profile_image || null;

        // 2. user_metadata에 없으면 users 테이블에서 가져오기
        if (!profileImage) {
          const { data: userData } = await supabase
            .from("users")
            .select("profile_image")
            .eq("id", user.id)
            .single();

          profileImage = userData?.profile_image || null;
        }

        setProfileImageUrl(profileImage);
      } else {
        setIsLoggedIn(false);
        setProfileImageUrl(null);
      }
    };

    void checkUser();

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);

        // 1. user_metadata에서 프로필 이미지 확인
        let profileImage = session.user.user_metadata?.profile_image || null;

        // 2. user_metadata에 없으면 users 테이블에서 가져오기
        if (!profileImage) {
          const { data: userData } = await supabase
            .from("users")
            .select("profile_image")
            .eq("id", session.user.id)
            .single();

          profileImage = userData?.profile_image || null;
        }

        setProfileImageUrl(profileImage);
      } else {
        setIsLoggedIn(false);
        setProfileImageUrl(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 로그인하지 않았으면 아무것도 표시하지 않음
  if (!isLoggedIn) {
    return null;
  }

  return (
    <Link
      href="/mypage"
      className="flex items-center justify-center w-[45px] h-[45px] rounded-full overflow-hidden bg-gray-200 hover:opacity-80 transition-opacity"
      aria-label="마이페이지로 이동"
    >
      <Image
        src={profileImageUrl || "/assets/no-profile.svg"}
        alt="프로필 이미지"
        width={50}
        height={50}
        className="object-cover"
      />
    </Link>
  );
}
