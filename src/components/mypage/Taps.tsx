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
          // 1. 프로젝트 기본 정보 가져오기
          const { data: projectsData, error: projectsError } = await supabase
            .from("projects")
            .select("*")
            .eq("owner_id", userId);

          if (projectsError) {
            console.error("프로젝트 로딩 오류:", projectsError);
            setProjects([]);
            return;
          }

          if (!projectsData || projectsData.length === 0) {
            setProjects([]);
            return;
          }

          // 2. 사용자 정보 가져오기
          const { data: userData } = await supabase
            .from("users")
            .select("username, nickname, profile_image, career_id")
            .eq("id", userId)
            .single();

          // 3. 사용자 경력 정보
          let careerName = "경력 없음";
          if (userData?.career_id) {
            const { data: careerData } = await supabase
              .from("careers")
              .select("name")
              .eq("id", userData.career_id)
              .single();
            careerName = careerData?.name || "경력 없음";
          }

          // 4. 각 프로젝트별로 상세 정보 가져오기
          const formattedProjects = await Promise.all(
            projectsData.map(async (project) => {
              // 필드(카테고리) 정보
              let categoryName = "기타";
              if (project.field_id) {
                const { data: fieldData } = await supabase
                  .from("fields")
                  .select("name")
                  .eq("id", project.field_id)
                  .single();
                categoryName = fieldData?.name || "기타";
              }

              // 기술 스택 가져오기
              const { data: techStackData } = await supabase
                .from("project_tech_stacks")
                .select("tech_stacks(name)")
                .eq("project_id", project.id);

              const techStacks =
                techStackData
                  ?.map(
                    (pts: { tech_stacks: { name: string }[] }) =>
                      pts.tech_stacks?.[0]?.name || "",
                  )
                  .filter(Boolean) || [];

              // 모집 포지션 가져오기
              const { data: positionsData } = await supabase
                .from("project_positions")
                .select("recruit_count")
                .eq("project_id", project.id);

              const totalMembers =
                positionsData?.reduce(
                  (sum, pos) => sum + (pos.recruit_count || 0),
                  0,
                ) || 0;

              // 마감일 계산
              const today = new Date();
              const deadline = new Date(project.deadline);
              const remainDays = Math.ceil(
                (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
              );

              return {
                id: project.id,
                title: project.name,
                description: project.short_description,
                owner: userData?.nickname || userData?.username || "알 수 없음",
                level: careerName,
                members: totalMembers,
                period: project.deadline,
                duration: project.expected_schedule,
                skills: techStacks,
                remain: remainDays > 0 ? remainDays : 0,
                category: categoryName,
                status: project.status,
                profile_image:
                  userData?.profile_image || "/assets/no-profile.svg",
              } as ProjectType;
            }),
          );

          // 모집중(status="true")인 프로젝트를 먼저, 모집완료(status="false")를 나중에 정렬
          const sortedProjects = formattedProjects.sort((a, b) => {
            if (a.status === "true" && b.status === "false") return -1;
            if (a.status === "false" && b.status === "true") return 1;
            return 0;
          });

          setProjects(sortedProjects);
          return;
        }

        if (activeTab === "interestedProjects") {
          // 관심 프로젝트 조회
          const { data: favoriteData, error: favoriteError } = await supabase
            .from("favorite")
            .select("project_id")
            .eq("user_id", userId);

          if (favoriteError) {
            console.error("관심 프로젝트 조회 실패:", favoriteError);
            setProjects([]);
            return;
          }

          if (!favoriteData || favoriteData.length === 0) {
            setProjects([]);
            return;
          }

          // 프로젝트 ID 목록 추출
          const projectIds = favoriteData.map((f) => f.project_id);

          // 프로젝트 상세 정보 조회
          const { data: projectsData, error: projectsError } = await supabase
            .from("projects")
            .select("*")
            .in("id", projectIds);

          if (projectsError || !projectsData) {
            console.error("프로젝트 조회 실패:", projectsError);
            setProjects([]);
            return;
          }

          // 프로젝트 상세 정보 포맷팅
          const formattedProjects = await Promise.all(
            projectsData.map(async (project) => {
              // 프로젝트 소유자 정보
              const { data: ownerData } = await supabase
                .from("users")
                .select("username, nickname, profile_image, career_id")
                .eq("id", project.owner_id)
                .single();

              let careerName = "경력 없음";
              if (ownerData?.career_id) {
                const { data: careerData } = await supabase
                  .from("careers")
                  .select("name")
                  .eq("id", ownerData.career_id)
                  .single();
                careerName = careerData?.name || "경력 없음";
              }

              // 카테고리
              let categoryName = "기타";
              if (project.field_id) {
                const { data: fieldData } = await supabase
                  .from("fields")
                  .select("name")
                  .eq("id", project.field_id)
                  .single();
                categoryName = fieldData?.name || "기타";
              }

              // 기술스택
              const { data: techStackData } = await supabase
                .from("project_tech_stacks")
                .select("tech_stacks(name)")
                .eq("project_id", project.id);

              const techStacks =
                techStackData
                  ?.map(
                    (pts: { tech_stacks: { name: string }[] }) =>
                      pts.tech_stacks?.[0]?.name || "",
                  )
                  .filter(Boolean) || [];

              // 모집 인원
              const { data: positionsData } = await supabase
                .from("project_positions")
                .select("recruit_count")
                .eq("project_id", project.id);

              const totalMembers =
                positionsData?.reduce(
                  (sum, pos) => sum + (pos.recruit_count || 0),
                  0,
                ) || 0;

              // 마감일 계산
              const today = new Date();
              const deadline = new Date(project.deadline);
              const remainDays = Math.ceil(
                (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
              );

              return {
                id: project.id,
                title: project.name,
                description: project.short_description,
                owner:
                  ownerData?.nickname || ownerData?.username || "알 수 없음",
                level: careerName,
                members: totalMembers,
                period: project.deadline,
                duration: project.expected_schedule,
                skills: techStacks,
                remain: remainDays > 0 ? remainDays : 0,
                category: categoryName,
                status: project.status,
                profile_image:
                  ownerData?.profile_image || "/assets/no-profile.svg",
              } as ProjectType;
            }),
          );

          setProjects(formattedProjects);
          return;
        }

        if (activeTab === "supportedProjects") {
          // 지원한 프로젝트 조회
          const { data: applicationsData, error: applicationsError } =
            await supabase
              .from("applications")
              .select("project_id, position, message, status, created_at")
              .eq("user_id", userId);

          if (applicationsError) {
            console.error("지원 내역 조회 실패:", applicationsError);
            setProjects([]);
            return;
          }

          if (!applicationsData || applicationsData.length === 0) {
            setProjects([]);
            return;
          }

          // 프로젝트 ID 목록 추출
          const projectIds = applicationsData.map((a) => a.project_id);

          // 프로젝트 상세 정보 조회
          const { data: projectsData, error: projectsError } = await supabase
            .from("projects")
            .select("*")
            .in("id", projectIds);

          if (projectsError || !projectsData) {
            console.error("프로젝트 조회 실패:", projectsError);
            setProjects([]);
            return;
          }

          // 프로젝트 상세 정보 포맷팅
          const formattedProjects = await Promise.all(
            projectsData.map(async (project) => {
              // 프로젝트 소유자 정보
              const { data: ownerData } = await supabase
                .from("users")
                .select("username, nickname, profile_image, career_id")
                .eq("id", project.owner_id)
                .single();

              let careerName = "경력 없음";
              if (ownerData?.career_id) {
                const { data: careerData } = await supabase
                  .from("careers")
                  .select("name")
                  .eq("id", ownerData.career_id)
                  .single();
                careerName = careerData?.name || "경력 없음";
              }

              // 카테고리
              let categoryName = "기타";
              if (project.field_id) {
                const { data: fieldData } = await supabase
                  .from("fields")
                  .select("name")
                  .eq("id", project.field_id)
                  .single();
                categoryName = fieldData?.name || "기타";
              }

              // 기술스택
              const { data: techStackData } = await supabase
                .from("project_tech_stacks")
                .select("tech_stacks(name)")
                .eq("project_id", project.id);

              const techStacks =
                techStackData
                  ?.map(
                    (pts: { tech_stacks: { name: string }[] }) =>
                      pts.tech_stacks?.[0]?.name || "",
                  )
                  .filter(Boolean) || [];

              // 모집 인원
              const { data: positionsData } = await supabase
                .from("project_positions")
                .select("recruit_count")
                .eq("project_id", project.id);

              const totalMembers =
                positionsData?.reduce(
                  (sum, pos) => sum + (pos.recruit_count || 0),
                  0,
                ) || 0;

              // 마감일 계산
              const today = new Date();
              const deadline = new Date(project.deadline);
              const remainDays = Math.ceil(
                (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
              );

              return {
                id: project.id,
                title: project.name,
                description: project.short_description,
                owner:
                  ownerData?.nickname || ownerData?.username || "알 수 없음",
                level: careerName,
                members: totalMembers,
                period: project.deadline,
                duration: project.expected_schedule,
                skills: techStacks,
                remain: remainDays > 0 ? remainDays : 0,
                category: categoryName,
                status: project.status,
                profile_image:
                  ownerData?.profile_image || "/assets/no-profile.svg",
              } as ProjectType;
            }),
          );

          setProjects(formattedProjects);
          return;
        }

        if (activeTab === "completedProjects") {
          // 내가 등록한 프로젝트 중 status="false"인 것만 조회
          const { data: projectsData, error: projectsError } = await supabase
            .from("projects")
            .select("*")
            .eq("owner_id", userId)
            .eq("status", "false");

          if (projectsError) {
            // 에러 발생 시 빈 배열 반환
            setProjects([]);
            return;
          }

          if (!projectsData || projectsData.length === 0) {
            setProjects([]);
            return;
          }

          // 사용자 정보
          const { data: userData } = await supabase
            .from("users")
            .select("username, nickname, profile_image, career_id")
            .eq("id", userId)
            .single();

          let careerName = "경력 없음";
          if (userData?.career_id) {
            const { data: careerData } = await supabase
              .from("careers")
              .select("name")
              .eq("id", userData.career_id)
              .single();
            careerName = careerData?.name || "경력 없음";
          }

          // 각 프로젝트 상세 정보
          const formattedProjects = await Promise.all(
            projectsData.map(async (project) => {
              let categoryName = "기타";
              if (project.field_id) {
                const { data: fieldData } = await supabase
                  .from("fields")
                  .select("name")
                  .eq("id", project.field_id)
                  .single();
                categoryName = fieldData?.name || "기타";
              }

              const { data: techStackData } = await supabase
                .from("project_tech_stacks")
                .select("tech_stacks(name)")
                .eq("project_id", project.id);

              const techStacks =
                techStackData
                  ?.map(
                    (pts: { tech_stacks: { name: string }[] }) =>
                      pts.tech_stacks?.[0]?.name || "",
                  )
                  .filter(Boolean) || [];

              const { data: positionsData } = await supabase
                .from("project_positions")
                .select("recruit_count")
                .eq("project_id", project.id);

              const totalMembers =
                positionsData?.reduce(
                  (sum, pos) => sum + (pos.recruit_count || 0),
                  0,
                ) || 0;

              const today = new Date();
              const deadline = new Date(project.deadline);
              const remainDays = Math.ceil(
                (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
              );

              return {
                id: project.id,
                title: project.name,
                description: project.short_description,
                owner: userData?.nickname || userData?.username || "알 수 없음",
                level: careerName,
                members: totalMembers,
                period: project.deadline,
                duration: project.expected_schedule,
                skills: techStacks,
                remain: remainDays > 0 ? remainDays : 0,
                category: categoryName,
                status: project.status,
                profile_image:
                  userData?.profile_image || "/assets/no-profile.svg",
              } as ProjectType;
            }),
          );

          setProjects(formattedProjects);
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
        // 1. 나의 프로젝트 수 (모집중 + 모집완료 전체)
        const { data: myProjectsData } = await supabase
          .from("projects")
          .select("id")
          .eq("owner_id", userId);

        // 2. 종료된 프로젝트 수 (status="false"인 것만)
        const { data: completedData } = await supabase
          .from("projects")
          .select("id")
          .eq("owner_id", userId)
          .eq("status", "false");

        // 3. 관심 프로젝트 수
        const { data: favoriteData } = await supabase
          .from("favorite")
          .select("id")
          .eq("user_id", userId);

        // 4. 지원한 프로젝트 수
        const { data: applicationsData } = await supabase
          .from("applications")
          .select("id")
          .eq("user_id", userId);

        onProjectCountsChange?.({
          myProjects: myProjectsData?.length || 0,
          interestedProjects: favoriteData?.length || 0,
          supportedProjects: applicationsData?.length || 0,
          completedProjects: completedData?.length || 0,
        });
      } catch {
        // 에러 발생 시 0으로 초기화
        onProjectCountsChange?.({
          myProjects: 0,
          interestedProjects: 0,
          supportedProjects: 0,
          completedProjects: 0,
        });
      }
    };

    void fetchCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const activeProjects = projects;

  return (
    <div className=" mx-auto px-36 mt-12 mb-20">
      {/* 탭 네비게이션 */}
      <div className="flex pt-[60px] pl-[50px] gap-[50px]">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-3 text-7 transition-colors duration-300 cursor-pointer ${
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
      <div className="mt-15 mx-auto max-[1279px]:justify-center">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-deep text-5">로딩 중...</p>
          </div>
        ) : activeProjects.length > 0 ? (
          <div className="grid grid-cols-1 max-[1279px]:justify-items-center min-[1280px]:grid-cols-2 min-[1750px]:grid-cols-3 gap-15">
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
