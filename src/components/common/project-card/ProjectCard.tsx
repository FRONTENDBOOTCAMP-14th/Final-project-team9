"use client";

import { Calendar, Clock, Heart, UsersRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_COLOR,
  type ProjectStatus,
} from "@/constants/project";
import { useFavoriteStore } from "@/store/favorite-store";

interface ProjectCardProps {
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
  status?: ProjectStatus;
  profile_image: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  owner,
  level,
  members,
  period,
  duration,
  skills,
  remain,
  category,
  status = "recruiting",
  profile_image,
}: ProjectCardProps) {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorite = favorites.includes(id);

  return (
    <div className="flex flex-col w-[500px] h-[600px] bg-white rounded-[26px] shadow-lg p-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[30px]">
          <span
            className={`${PROJECT_STATUS_COLOR[status]} text-white text-5 px-[15px] py-1 rounded-[10px]`}
          >
            {PROJECT_STATUS_LABEL[status]}
          </span>
          <span className="text-deep text-5">{category}</span>
        </div>

        <button onClick={() => toggleFavorite(id)}>
          <Heart
            className={`w-[30px] h-[30px] ${
              isFavorite ? "fill-red-500 stroke-red-500" : "stroke-gray-400"
            }`}
          />
        </button>
      </div>

      <h2 className="text-8 font-bold text-deep mt-[34px] break-words line-clamp-3">
        {title}
      </h2>
      <p className="text-gray text-5 mt-[9px] line-clamp-3">{description}</p>

      <div className="flex items-center gap-[30px] mt-auto">
        <Image
          src={profile_image}
          alt="프로필"
          width={100}
          height={100}
          className="rounded-full aspect-square"
        />
        <div className="flex flex-col gap-2.5">
          <div className="font-bold text-deep text-6">{owner}</div>
          <div className="text-4 text-gray">{level}</div>
        </div>
      </div>

      <div className="flex justify-between items-center text-5 text-deep mt-[25px]">
        <div>
          <span className="flex items-center gap-1">
            <UsersRound className="w-5 h-5" /> {members}명
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1">
            <Calendar className="w-5 h-5" /> {period}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1">
            <Clock className="w-5 h-5" /> {duration}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-7.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center justify-center px-3 h-6 bg-[#eeeeee] text-black rounded-full text-3 whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>

      <hr className="mt-7.5 text-[#d9d9d9] border-1" />

      <div className="flex justify-between items-center mt-5">
        <span className="text-5">
          <span className="text-primary font-bold">{remain}자리</span>
          <span className="text-deep"> 남았어요</span>
        </span>
        <button
          className="bg-primary text-white px-[15px] py-[6px] rounded-[10px] text-5 hover:bg-blue-700"
          onClick={() => router.push(`/project-detail/${id}`)}
        >
          자세히보기
        </button>
      </div>
    </div>
  );
}
