'use client'

import { Heart, UsersRound, Calendar, Clock } from 'lucide-react'
import { PROJECT_STATUS_LABEL } from '@/constants/project'
import { useFavoriteStore } from '@/store/favorite-store'
import type { ProjectHeaderInfo } from '@/types/project'
import type { LucideIcon } from 'lucide-react'

interface ProjectDetailHeaderProps {
  project: ProjectHeaderInfo
}

interface InfoCardProps {
  icon: LucideIcon
  label: string
  value: string
}

interface PositionInfo {
  key: string
  label: string
  count: number
}

// 정보 카드 컴포넌트
function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-8 h-8 text-white" aria-hidden="true" />
      <div>
        <p className="text-5 text-[#6877ae] mb-1">{label}</p>
        <p className="text-[28px] text-white">{value}</p>
      </div>
    </div>
  )
}

// 포지션 카드 컴포넌트
function PositionCard({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex flex-col items-center text-white">
      <span className="text-5 mb-2">{label}</span>
      <span className="text-[28px]">{count}명</span>
    </div>
  )
}

export default function ProjectDetailHeader({
  project,
}: ProjectDetailHeaderProps) {
  const { favorites, toggleFavorite } = useFavoriteStore()
  const isFavorite = favorites.includes(project.id)

  // 모집 포지션 데이터 구조화
  const positionList: PositionInfo[] = project.positions.map((pos) => ({
    key: pos.id.toString(),
    label: pos.position_name,
    count: pos.recruit_count,
  }))

  return (
    <header className="w-full h-[640px] bg-gradient-to-r from-deep to-[#006ebd] py-20">
      <div className="w-full max-w-[1920px] mx-auto px-8 pt-[50px]">
        <div className="max-w-[1620px] mx-auto">
          {/* 상단: 상태, 카테고리와 찜 버튼 */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-[50px]">
              <span
                className="bg-white text-deep text-5 px-4 py-1.5 rounded-[10px]"
                role="status"
                aria-label={`프로젝트 상태: ${PROJECT_STATUS_LABEL[project.status]}`}
              >
                {PROJECT_STATUS_LABEL[project.status]}
              </span>
              <span
                className="text-white text-6"
                aria-label="프로젝트 카테고리"
              >
                {project.category}
              </span>
            </div>

            <button
              onClick={() => toggleFavorite(project.id)}
              aria-label={
                isFavorite
                  ? `${project.title} 찜 해제`
                  : `${project.title} 찜하기`
              }
              className="transition-transform hover:scale-110 focus:outline-none"
            >
              <Heart
                className={`w-8 h-8 ${
                  isFavorite
                    ? 'fill-red-500 stroke-red-500'
                    : 'stroke-white fill-none'
                }`}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* 제목 */}
          <h1 className="text-white text-[60px] font-bold mb-5 leading-tight">
            {project.title}
          </h1>

          {/* 설명 */}
          <p className="text-white/90 text-9 mb-[117px] leading-relaxed">
            {project.description}
          </p>

          {/* 프로젝트 정보 */}
          <section
            className="flex items-center justify-between text-white"
            aria-label="프로젝트 상세 정보"
          >
            {/* 기본 정보 */}
            <div className="flex items-center gap-16">
              <InfoCard
                icon={UsersRound}
                label="팀 인원"
                value={`${project.teamSize}명`}
              />
              <InfoCard
                icon={Calendar}
                label="모집 마감"
                value={project.estimatedPeriod}
              />
              <InfoCard
                icon={Clock}
                label="예상 일정"
                value={project.duration}
              />
            </div>

            {/* 모집 포지션 */}
            <div
              className="flex items-center gap-[60px]"
              role="list"
              aria-label="모집 포지션"
            >
              {positionList.map((position) => (
                <div key={position.key} role="listitem">
                  <PositionCard label={position.label} count={position.count} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </header>
  )
}
