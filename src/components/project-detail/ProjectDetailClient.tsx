'use client'

import { ProjectDetailHeader, ProjectDetailContent } from './index'
import type { ProjectHeaderInfo, ProjectDetail } from '@/types/project'
import { useIsOwner } from '@/hooks/useIsOwner'

interface ProjectDetailClientProps {
  projectHeaderData: ProjectHeaderInfo
  projectDetailData: ProjectDetail
  ownerId: string
}

export default function ProjectDetailClient({
  projectHeaderData,
  projectDetailData,
  ownerId,
}: ProjectDetailClientProps) {
  const { isOwner, loading } = useIsOwner(ownerId)

  if (loading) return <p>Loading...</p>

  return (
    <>
      <ProjectDetailHeader project={projectHeaderData} />
      <ProjectDetailContent project={projectDetailData} isOwner={isOwner} />
    </>
  )
}
