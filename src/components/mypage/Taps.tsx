"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/common/project-card/ProjectCard";
import { supabase } from "@/lib/supabase";
import { useFavoriteStore } from "@/store/favorite-store";
import type { ProjectCard as ProjectType } from "@/types/project";

// 각 탭의 이름과 데이터 키를 정의
const TABS = [
  { name: "나의 프로젝트", key: "myProjects" },
  { name: "관심 프로젝트", key: "interestedProjects" },
  { name: "지원한 프로젝트", key: "supportedProjects" },
  { name: "종료된 프로젝트", key: "completedProjects" },
];

interface Props {
  userId?: string;
  onProjectCountsChange?: (counts: {
    myProjects: number;
    interestedProjects: number;
    supportedProjects: number;
    completedProjects: number;
  }) => void;
}

export default function ProjectTabs({ userId, onProjectCountsChange }: Props) {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  useFavoriteStore();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userId) return;

      try {
        setLoading(true);

        if (activeTab === "myProjects") {
          const res = await supabase
            .from("project_view")
            .select("*")
            .eq("owner_id", userId);

          console.log("Raw project data:", res.data);
          const data = res.data?.map((project) => ({
            id: project.id,
            title: project.name,
            description: project.short_description,
            owner: project.user_name,
            level: project.career_name || "경력 없음",
            members: project.position_count || 0,
            period: project.deadline,
            duration: project.expected_schedule,
            skills: project.tech_stacks || [],
            remain: project.remain_days || 0,
            category: project.field_name,
            status: project.status,
            profile_image: project.profile_image || "/assets/no-profile.svg",
          })) as ProjectType[] | null;
          if (res.error) {
            console.error("프로젝트 로딩 오류:", res.error);
            setProjects([]);
            return;
          }
          setProjects(data ?? []);
          return;
        }

        if (activeTab === "interestedProjects") {
          interface FavRow {
            projects: ProjectType;
          }
          const res = await supabase
            .from("favorite")
            .select("project_id, projects(*)")
            .eq("user_id", userId);
          const data = res.data as unknown as FavRow[] | null;
          if (res.error) {
            console.error("관심 프로젝트 로딩 오류:", res.error);
            setProjects([]);
            return;
          }
          setProjects((data ?? []).map((r) => r.projects));
          return;
        }

        if (activeTab === "supportedProjects") {
          interface AppRow {
            projects: ProjectType;
          }
          const res = await supabase
            .from("applications")
            .select("projects(*)")
            .eq("user_id", userId)
            .eq("projects.status", "모집중");
          const data = res.data as unknown as AppRow[] | null;
          if (res.error) {
            console.error("지원한 프로젝트 로딩 오류:", res.error);
            setProjects([]);
            return;
          }
          setProjects((data ?? []).map((r) => r.projects));
          return;
        }

        if (activeTab === "completedProjects") {
          interface AppRow {
            projects: ProjectType;
          }
          const today = new Date().toISOString();
          const res = await supabase
            .from("applications")
            .select("projects(*)")
            .eq("user_id", userId)
            .lt("projects.expected_end_date", today);
          const data = res.data as unknown as AppRow[] | null;
          if (res.error) {
            console.error("종료된 프로젝트 로딩 오류:", res.error);
            setProjects([]);
            return;
          }
          setProjects((data ?? []).map((r) => r.projects));
          return;
        }
      } catch (err) {
        console.error("프로젝트 로딩 중 오류 발생:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchProjects();
  }, [activeTab, userId]);

  useEffect(() => {
    const fetchCounts = async () => {
      if (!userId) return;
      try {
        const projRes = await supabase
          .from("project_view")
          .select("id")
          .eq("owner_id", userId);

        const favRes = await supabase
          .from("favorite")
          .select("id")
          .eq("user_id", userId);

        const appRes = await supabase
          .from("applications")
          .select("projects(expected_end_date,status)")
          .eq("user_id", userId);

        if (projRes.error || favRes.error || appRes.error) {
          console.error(
            "counts fetch err",
            projRes.error || favRes.error || appRes.error,
          );
          return;
        }

        const myProjects = (projRes.data ?? []).length;
        const interestedProjects = (favRes.data ?? []).length;
        const appData = appRes.data as
          | { projects?: { expected_end_date?: string; status?: string } }[]
          | null;
        const supportedProjects = (appData ?? []).filter(
          (a) => a.projects?.status === "모집중",
        ).length;
        const completedProjects = (appData ?? []).filter((a) => {
          const end = a.projects?.expected_end_date;
          return end ? new Date(end) < new Date() : false;
        }).length;

        onProjectCountsChange?.({
          myProjects,
          interestedProjects,
          supportedProjects,
          completedProjects,
        });
      } catch (err) {
        console.error("counts fetch err", err);
      }
    };

    void fetchCounts();
  }, [userId, onProjectCountsChange]);

  const activeProjects = projects;

  return (
    <div className="w-[1620px] mx-auto my-12">
      {/* 탭 네비게이션 */}
      <div className="flex pt-[60px] pl-[50px] gap-[50px]">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-3 text-7 transition-colors duration-300 ${
              activeTab === tab.key
                ? "font-black text-primary border-b-2 border-primary"
                : "font-medium text-gray hover:text-primary"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="mt-15">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-deep text-5">로딩 중...</p>
          </div>
        ) : activeProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
            {activeProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-lg">
            <p className="text-deep text-5 font-bold">
              {TABS.find((tab) => tab.key === activeTab)?.name}가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
