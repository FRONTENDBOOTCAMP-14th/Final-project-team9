"use client";

import { useState } from "react";
import { useIsOwner } from "@/hooks/useIsOwner";
import type { ProjectHeaderInfo, ProjectDetail } from "@/types/project";
import { ProjectDetailHeader, ProjectDetailContent } from "./index";

interface ProjectDetailClientProps {
  projectHeaderData: ProjectHeaderInfo;
  projectDetailData: ProjectDetail;
  ownerId: string;
}

export default function ProjectDetailClient({
  projectHeaderData,
  projectDetailData,
  ownerId,
}: ProjectDetailClientProps) {
  const { isOwner, loading } = useIsOwner(ownerId);
  const [currentStatus, setCurrentStatus] = useState(projectHeaderData.status);

  if (loading) return <p>Loading...</p>;

  // 상태가 업데이트되면 헤더와 콘텐츠 모두 동기화
  const updatedHeaderData = { ...projectHeaderData, status: currentStatus };
  const updatedDetailData = { ...projectDetailData, status: currentStatus };

  return (
    <>
      <ProjectDetailHeader project={updatedHeaderData} />
      <ProjectDetailContent
        project={updatedDetailData}
        isOwner={isOwner}
        onStatusChange={setCurrentStatus}
      />
    </>
  );
}
