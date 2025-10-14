"use client";

import { Calendar, Clock, UsersRound } from "lucide-react";
import Image from "next/image";

interface MainPageProjectCardProps {
  id: number;
  title: string;
  owner: string;
  level: string;
  members: number;
  period: string;
  duration: string;
  category: string;
}

/**
 * 메인페이지 전용 프로젝트 카드 (380x380, 디스플레이 전용)
 * 기존 ProjectCard 디자인을 재사용하되 크기 축소 및 인터랙션 제거
 */
export default function MainPageProjectCard({
  title,
  owner,
  level,
  members,
  period,
  duration,
  category,
}: MainPageProjectCardProps) {
  return (
    <div className="flex flex-col w-[380px] h-[380px] bg-white rounded-[26px] shadow-lg p-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[30px]">
          <span className="bg-primary text-white text-5 px-[15px] py-1 rounded-[10px]">
            모집중
          </span>
          <span className="text-deep text-5">{category}</span>
        </div>
      </div>

      <h2 className="text-7 font-bold text-deep mt-[34px]">{title}</h2>

      <div className="flex items-center gap-[30px] mt-auto">
        <Image
          src="/assets/no-profile.svg"
          alt="프로필"
          width={80}
          height={80}
        />
        <div className="flex flex-col gap-2.5">
          <div className="font-bold text-deep text-5">{owner}</div>
          <div className="text-3 text-gray">{level}</div>
        </div>
      </div>

      <div className="flex justify-between items-center text-5 text-deep mt-[25px]">
        <div className="flex flex-col items-center">
          <span className="text-gray text-4 mb-[4px]">모집인원</span>
          <span className="flex items-center gap-1 font-bold text-deep">
            <UsersRound className="w-5 h-5" /> {members}명
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray text-4 mb-[4px]">모집기간</span>
          <span className="flex items-center gap-1 font-bold text-deep">
            <Calendar className="w-5 h-5" /> {period}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray text-4 mb-[4px]">진행기간</span>
          <span className="flex items-center gap-1 font-bold text-deep">
            <Clock className="w-5 h-5" /> {duration}
          </span>
        </div>
      </div>
    </div>
  );
}
