"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useScrollLock from "@/hooks/useScrollLock";
import ProfileEditModal from "./ProfileModal";

// SVG 아이콘 컴포넌트들
const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Props 타입 정의

export interface ProjectCounts {
  myProjects: number;
  interestedProjects: number;
  supportedProjects: number;
  completedProjects: number;
}

export interface UserProfileCardProps {
  profile_image: string;
  username: string;
  email: string;
  bio: string;
  positions: string;
  careers: string;
  tech_stacks: string[];
  projectCounts: ProjectCounts;
}

export default function UserProfileCard(props: UserProfileCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 프로필 데이터를 state로 관리하여 수정 가능하게 합니다.
  // props가 일부 비어있을 수 있으므로 안전한 기본값을 병합합니다.
  const defaultUser = {
    profile_image: "",
    username: "",
    email: "",
    bio: "",
    positions: "",
    careers: "",
    tech_stacks: [] as string[],
    projectCounts: {
      myProjects: 0,
      interestedProjects: 0,
      supportedProjects: 0,
      completedProjects: 0,
    },
  } as UserProfileCardProps;

  const [userData, setUserData] = useState<UserProfileCardProps>({
    ...defaultUser,
    ...props,
  });
  const blobUrlsRef = useRef<Set<string>>(new Set());

  // props.projectCounts가 변경될 때마다 업데이트
  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      projectCounts: props.projectCounts,
    }));
  }, [props.projectCounts]);

  const handleSettingsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = (
    updatedUser: Omit<UserProfileCardProps, "projectCounts">
  ) => {
    // 실제 애플리케이션에서는 여기서 API 호출 등을 통해 서버에 데이터를 저장합니다.
    console.log("저장될 데이터:", updatedUser);
    setUserData((prev) => ({ ...prev, ...updatedUser }));
    setIsModalOpen(false);
    // 새로운 blob URL이라면 추적 목록에 추가
    if (updatedUser.profile_image?.startsWith("blob:")) {
      blobUrlsRef.current.add(updatedUser.profile_image);
    }
  };

  // 컴포넌트 언마운트 시 모든 blob URL 정리
  useEffect(() => {
    const blobUrls = blobUrlsRef.current;
    return () => {
      blobUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  // 모달 오픈 시 스크롤 정지 훅
  useScrollLock(isModalOpen);

  return (
    <>
      <div className="w-[1620px] h-[400px] bg-white rounded-4xl py-9 px-20 shadow-lg flex flex-col justify-between relative mx-auto box-border">
        <div className="flex items-center">
          <div className="w-[167px] h-[167px] rounded-full overflow-hidden mr-8 bg-gray-300 relative">
            <Image
              src={userData.profile_image || "/assets/no-profile.svg"}
              alt={`${userData.username}'s profile`}
              width={167}
              height={167}
              className="object-cover"
              unoptimized={
                userData.profile_image?.startsWith("blob:") ||
                userData.profile_image?.endsWith(".svg") ||
                !userData.profile_image
              }
            />
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <div className="flex items-center gap-4">
              <h2 className="text-8 text-deep font-extrabold">
                {userData.username}
              </h2>
              <span className="text-5 text-gray">{userData.email}</span>
            </div>
            <p className="text-5 text-deep font-bold">{userData.bio}</p>
            <div className="flex gap-3 text-5 text-gray-600">
              <span>{userData.positions}</span>
              <span>{userData.careers}</span>
            </div>
          </div>
          <button
            onClick={handleSettingsClick}
            aria-label="프로필 수정"
            className="absolute top-10 right-10 text-gray-500 hover:text-gray-800"
          >
            <SettingsIcon />
          </button>
        </div>

        <div className="flex justify-end gap-5">
          {Object.entries({
            "나의 프로젝트": userData.projectCounts.myProjects,
            "관심 프로젝트": userData.projectCounts.interestedProjects,
            "지원한 프로젝트": userData.projectCounts.supportedProjects,
            "종료된 프로젝트": userData.projectCounts.completedProjects,
          }).map(([label, count]) => (
            <button
              key={label}
              className="bg-white border-1 rounded-[10px] text-gray text-5 font-bold py-1 px-5"
            >
              {label} {count}
            </button>
          ))}
        </div>

        <hr className="border-t-2 border-zinc-300" />

        <div className="flex items-center gap-3">
          {userData.tech_stacks.map((skill) => (
            <span
              key={skill}
              className="bg-primary text-white text-6 font-bold py-1 px-5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ProfileEditModal
          user={{
            profile_image: userData.profile_image,
            username: userData.username,
            email: userData.email,
            bio: userData.bio,
            positions: userData.positions,
            careers: userData.careers,
            tech_stacks: userData.tech_stacks,
          }}
          onClose={handleCloseModal}
          onSave={handleSaveProfile}
        />
      )}
    </>
  );
}
