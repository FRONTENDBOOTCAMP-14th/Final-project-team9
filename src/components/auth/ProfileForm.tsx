// src/components/auth/ProfileForm.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import LabeledInput from "@/components/common/LabeledInput";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/input/Dropdown"; // 팀원의 드롭다운 컴포넌트 경로

const ProfileForm = () => {
  // 1. 프로필 폼에 필요한 값들을 state로 관리합니다.
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");

  // 드롭다운에 표시될 옵션들
  const positionOptions = ["프론트엔드", "백엔드", "디자이너", "기획자"];
  const experienceOptions = [
    "신입(1년 미만)",
    "주니어(1~3년)",
    "미들(3~5년)",
    "시니어(5년 이상)",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Zustand 스토어에서 선택된 값을 가져와서 함께 처리
    // const { selectedValues } = useDropdownStore.getState();
    // const position = selectedValues['포지션'];
    // const experience = selectedValues['경력'];
    console.log("프로필 정보:", {
      nickname,
      introduction /* position, experience */,
    });
  };

  return (
    <div className="w-full max-w-[615px]">
      <div className="flex justify-center mb-[50px]">
        {/* 프로필 사진 업로드 부분 */}
        <button className="relative w-[200px] h-[200px] rounded-full bg-gray-200 flex items-center justify-center">
          <Image
            src="/assets/no-profile.svg" // 기본 프로필 이미지
            alt="프로필 사진"
            width={200}
            height={200}
          />
          <div className="absolute bottom-0 right-0 w-[50px] h-[50px] bg-[#16296D] rounded-full flex items-center justify-center text-white">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_246_187)">
                <path
                  d="M30 12.7075H17.2895V0H12.7075V12.7075H0V17.2895H12.7075V30H17.2895V17.2895H30V12.7075Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_246_187">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <LabeledInput
          id="profile-nickname"
          label="닉네임"
          required
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          containerClassName="w-full h-[80px]"
        />

        {/* 팀원의 드롭다운 컴포넌트 사용 */}
        <Dropdown
          placeholder="포지션"
          options={positionOptions}
          width="100%"
          height="80px"
          required
          className="border-[1px] border-white text-[24px] text-[#16296D]"
        />

        <Dropdown
          placeholder="경력"
          options={experienceOptions}
          width="100%"
          height="80px"
          required
          className="border-[1px] border-white text-[24px] text-[#16296D]"
        />

        <LabeledInput
          id="profile-introduction"
          label="한줄 소개"
          type="text"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          containerClassName="w-full h-[80px]"
        />

        <Button
          type="submit"
          size="lg"
          className="w-full h-[80px] text-[24px] mt-5"
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
