"use client";

import React, { useState } from "react";
import ProjectCard from "@/components/common/project-card/ProjectCard";
import { useFavoriteStore } from "@/store/favorite-store";

// 각 탭의 이름과 데이터 키를 정의
const TABS = [
  { name: "나의 프로젝트", key: "myProjects" },
  { name: "관심 프로젝트", key: "interestedProjects" },
  { name: "지원한 프로젝트", key: "supportedProjects " },
  { name: "종료된 프로젝트", key: "completedProjects" },
];

// 프로젝트 데이터 타입 정의 (카드 컴포넌트 임시 데이터 삭제시 삭제)
interface Project {
  id: number;
  title: string;
  description: string;
  owner: string;
  level: string;
  members: number;
  period: string;
  duration: string;
  skills: string[];
  remain: number;
  category: string;
  profile_image: string;
}

// 카드 컴포넌트 임시 더미 데이터
const mockProjectsData: Record<string, Project[]> = {
  myProjects: [
    {
      id: 1,
      title: "AI 기반 주변 맛집 추천 서비스",
      description: "AI를 기반으로 주변의 맛집을 찾는 서비스",
      owner: "지훈",
      level: "주니어(3년 미만)",
      members: 4,
      period: "1.1-3.1",
      duration: "2개월",
      skills: ["React", "Next", "JS", "SW", "Spring"],
      remain: 2,
      category: "웹 개발",
      profile_image: "/assets/no-profile.svg",
    },
    {
      id: 2,
      title: "두 번째 나의 프로젝트",
      description: "설명",
      owner: "미리",
      level: "시니어(5년 이상)",
      members: 3,
      period: "2.1-4.1",
      duration: "2개월",
      skills: ["Vue", "TS"],
      remain: 1,
      category: "앱 개발",
      profile_image: "/assets/no-profile.svg",
    },
    {
      id: 3,
      title: "세 번째 나의 프로젝트",
      description: "설명",
      owner: "미리",
      level: "시니어(5년 이상)",
      members: 3,
      period: "2.1-4.1",
      duration: "2개월",
      skills: ["Vue", "TS"],
      remain: 1,
      category: "앱 개발",
      profile_image: "/assets/no-profile.svg",
    },
    {
      id: 4,
      title: "네 번째 나의 프로젝트",
      description: "설명",
      owner: "미리",
      level: "시니어(5년 이상)",
      members: 3,
      period: "2.1-4.1",
      duration: "2개월",
      skills: ["Vue", "TS"],
      remain: 1,
      category: "앱 개발",
      profile_image: "/assets/no-profile.svg",
    },
  ],
  interestedProjects: [],
  supportedProjects: [],
  completedProjects: [],
};

export default function ProjectTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  const { favorites } = useFavoriteStore();

  // 모든 프로젝트를 하나의 배열로 통합
  // new Map을 사용하여 중복된 id를 가진 프로젝트를 제거합니다.
  const allProjects = Array.from(
    new Map(
      Object.values(mockProjectsData)
        .flat()
        .map((p) => [p.id, p]),
    ).values(),
  );

  // 현재 탭에 따라 보여줄 프로젝트 목록을 결정
  const activeProjects = (() => {
    // "관심 프로젝트" 탭이 활성화된 경우
    if (activeTab === "interestedProjects") {
      // 모든 프로젝트 중에서 favorites 배열에 id가 포함된 것만 필터링
      return allProjects.filter((project) => favorites.includes(project.id));
    }
    // 다른 탭의 경우 기존 방식대로 데이터를 가져옴
    return mockProjectsData[activeTab] || [];
  })();

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
        {activeProjects.length > 0 ? (
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
