"use client";

import React, { useState } from "react";
import ProjectCard from "@/components/common/project-card/ProjectCard";

// 각 탭의 이름과 데이터 키를 정의
const TABS = [
  { name: "나의 프로젝트", key: "myProjects" },
  { name: "관심 프로젝트", key: "interestedProjects" },
  { name: "지원한 프로젝트", key: "supportedProjects " },
  { name: "종료된 프로젝트", key: "completedProjects" },
];

// 프로젝트 데이터 타입 정의
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
    },
  ],
  interestedProjects: [
    {
      id: 3,
      title: "관심 프로젝트",
      description: "설명",
      owner: "주현",
      level: "신입",
      members: 5,
      period: "3.1-5.1",
      duration: "2개월",
      skills: ["Angular"],
      remain: 0,
      category: "데이터 분석",
    },
  ],
  supportedProjects: [],
  completedProjects: [],
};

export default function ProjectTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  const activeProjects = mockProjectsData[activeTab] || [];

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
