"use client";

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
  status?: string;
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
  status = "모집중",
}: MainPageProjectCardProps) {
  return (
    <div className="flex flex-col w-[380px] h-[380px] bg-white rounded-[26px] shadow-lg p-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[30px]">
          <span
            className={`text-white text-5 px-[15px] py-1 rounded-[10px] ${status === "모집완료" ? "bg-gray" : "bg-primary"}`}
          >
            {status}
          </span>
          <span className="text-deep text-5">{category}</span>
        </div>
      </div>

      <h2 className="text-7 text-deep mt-[30px]">{title}</h2>

      <div className="flex items-center gap-[30px] mt-[20px]">
        <Image
          src="/assets/no-profile.svg"
          alt="프로필"
          width={80}
          height={80}
        />
        <div className="flex flex-col">
          <div className=" text-deep text-5">{owner}</div>
          <div className="text-3 text-gray">{level}</div>
        </div>
      </div>

      <hr className="mt-[20px] mb-[15px] border-t border-[#d9d9d9]" />

      <div className="flex justify-between items-center text-5 text-deep">
        <div className="flex flex-col items-center">
          <span className="text-gray text-[10px] mb-[4px]">모집인원</span>
          <span className="text-deep">{members}명</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray text-[10px] mb-[4px]">모집기간</span>
          <span className="text-deep">{period}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray text-[10px] mb-[4px]">진행기간</span>
          <span className="text-deep">{duration}</span>
        </div>
      </div>
    </div>
  );
}
