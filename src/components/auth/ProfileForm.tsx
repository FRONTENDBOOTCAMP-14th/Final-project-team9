// src/components/auth/ProfileForm.tsx

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/input/Dropdown"; // 팀원의 드롭다운 컴포넌트 경로
import LabeledInput from "@/components/common/LabeledInput";
import { supabase } from "@/lib/supabase";
import { useDropdownStore } from "@/store/dropdown-store";

const ProfileForm = () => {
  // 1. 프로필 폼에 필요한 값들을 state로 관리합니다.
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const { selectedValues } = useDropdownStore();
  const [profileImage, setProfileImage] = useState<string>(
    "/assets/no-profile.svg"
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 드롭다운에 표시될 옵션들
  const positionOptions = ["프론트엔드", "백엔드", "디자이너", "기획자"];
  const experienceOptions = [
    "신입(1년 미만)",
    "주니어(1~3년)",
    "미들(3~5년)",
    "시니어(5년 이상)",
  ];

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 파일인지 확인
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 제한 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB 이하여야 합니다.");
        return;
      }

      setProfileImageFile(file);

      // 미리보기 이미지 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const position = selectedValues["포지션"];
    const career = selectedValues["경력"];

    if (!position || !career) return alert("포지션과 경력을 선택해주세요.");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("회원가입을 다시 해주세요!");
      return;
    }

    const username = user.user_metadata?.username;

    const position_id = positionOptions.indexOf(position) + 1;
    const career_id = experienceOptions.indexOf(career) + 1;

    let profileImageUrl = null;

    // 프로필 이미지 업로드
    if (profileImageFile) {
      const fileExt = profileImageFile.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, profileImageFile);

      if (uploadError) {
        console.error("이미지 업로드 실패:", uploadError);
        alert("프로필 이미지 업로드에 실패했습니다.");
        return;
      }

      // 업로드된 이미지의 public URL 가져오기
      const { data: publicUrlData } = supabase.storage
        .from("profile-images")
        .getPublicUrl(filePath);

      profileImageUrl = publicUrlData.publicUrl;
    }

    const { error: insertError } = await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      username,
      nickname,
      bio: introduction,
      position_id,
      career_id,
      profile_image: profileImageUrl,
    });

    if (insertError) {
      console.error(insertError);
      alert("프로필 등록에 실패했습니다.");
      return;
    }

    // user_metadata에도 프로필 이미지 URL 저장
    if (profileImageUrl) {
      await supabase.auth.updateUser({
        data: {
          profile_image: profileImageUrl,
        },
      });
    }

    alert("프로필 등록 완료!");
    window.location.href = "/";
  };

  return (
    <div className="w-full max-w-[615px]">
      <div className="flex justify-center mb-[50px]">
        {/* 프로필 사진 업로드 부분 */}
        <button
          type="button"
          onClick={handleImageClick}
          className="relative w-[200px] h-[200px] group"
          aria-label="프로필 사진 업로드"
        >
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden group-hover:opacity-80 transition-opacity">
            <Image
              src={profileImage}
              alt="프로필 사진"
              width={200}
              height={200}
              className="object-cover"
              unoptimized={profileImage.startsWith("data:")}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[50px] h-[50px] bg-[#16296D] rounded-full flex items-center justify-center text-white pointer-events-none group-hover:opacity-80 transition-opacity">
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
        {/* 숨겨진 파일 input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          aria-label="프로필 이미지 파일 선택"
        />
      </div>

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex flex-col gap-5"
      >
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
