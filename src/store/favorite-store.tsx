import { create } from "zustand";
import { supabase } from "@/lib/supabase";

interface FavoriteStore {
  favorites: string[]; // project_id는 UUID (string)
  isLoading: boolean;
  loadFavorites: () => Promise<void>;
  toggleFavorite: (projectId: string) => Promise<void>;
  isFavorite: (projectId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  isLoading: false,

  // 사용자의 관심 프로젝트 목록 불러오기
  loadFavorites: async () => {
    try {
      set({ isLoading: true });
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        set({ favorites: [], isLoading: false });
        return;
      }

      const { data, error } = await supabase
        .from("favorite")
        .select("project_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("관심 프로젝트 로드 실패:", error);
        set({ isLoading: false });
        return;
      }

      const favoriteIds = data?.map((item) => item.project_id) || [];
      set({ favorites: favoriteIds, isLoading: false });
    } catch (error) {
      console.error("관심 프로젝트 로드 중 오류:", error);
      set({ isLoading: false });
    }
  },

  // 관심 프로젝트 추가/제거
  toggleFavorite: async (projectId: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }

      const { favorites } = get();
      const isFavorited = favorites.includes(projectId);

      if (isFavorited) {
        // 관심 프로젝트 제거
        const { error } = await supabase
          .from("favorite")
          .delete()
          .eq("user_id", user.id)
          .eq("project_id", projectId);

        if (error) {
          console.error("관심 프로젝트 제거 실패:", error);
          alert("관심 프로젝트 제거에 실패했습니다.");
          return;
        }

        set({ favorites: favorites.filter((id) => id !== projectId) });
      } else {
        // 관심 프로젝트 추가
        const { error } = await supabase.from("favorite").insert({
          user_id: user.id,
          project_id: projectId,
        });

        if (error) {
          console.error("관심 프로젝트 추가 실패:", error);
          alert("관심 프로젝트 추가에 실패했습니다.");
          return;
        }

        set({ favorites: [...favorites, projectId] });
      }
    } catch (error) {
      console.error("관심 프로젝트 토글 중 오류:", error);
      alert("오류가 발생했습니다.");
    }
  },

  // 특정 프로젝트가 관심 프로젝트인지 확인
  isFavorite: (projectId: string) => {
    return get().favorites.includes(projectId);
  },
}));
