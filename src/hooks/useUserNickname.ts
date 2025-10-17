// src/hooks/useUserNickname.ts

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

/**
 * 현재 로그인된 사용자의 닉네임과 로딩 상태를 반환하는 커스텀 훅
 */
export const useUserNickname = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserNickname = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profileData, error } = await supabase
            .from("users")
            .select("nickname")
            .eq("id", user.id)
            .single();

          if (error) throw error;
          if (profileData) {
            setNickname(profileData.nickname);
          }
        }
      } catch (error) {
        console.error("닉네임 정보 로딩 실패:", error);
        setNickname("사용자"); // 에러 발생 시 기본값
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserNickname();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // 이 훅을 사용하는 컴포넌트에게 닉네임과 로딩 상태를 반환합니다.
  return { nickname, isLoading };
};
