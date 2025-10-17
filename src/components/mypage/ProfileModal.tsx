import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/input/Dropdown";
import { supabase } from "@/lib/supabase";
import { useDropdownStore } from "@/store/dropdown-store";
import type { UserProfileCardProps } from "./Profile"; // 파일 경로 확인 필요

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function ProfileEditModal({
  user,
  onClose,
  onSave,
}: {
  user: Omit<UserProfileCardProps, "projectCounts">;
  onClose: () => void;
  onSave: (updatedUser: Omit<UserProfileCardProps, "projectCounts">) => void;
}) {
  const [formData, setFormData] = useState(user);
  const [skillInput, setSkillInput] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  // 상수 분리
  const MAX_SKILLS = 3;
  const MAX_INTRODUCTION_LENGTH = 100;
  const FIELD_OPTIONS = ["프론트엔드", "백엔드", "디자이너", "기획자"];
  const EXPERIENCE_OPTIONS = ["신입", "1-3년", "3-5년", "5년 이상"];

  const { selectedValues, setSelected } = useDropdownStore();

  // Dropdown 초기값 설정
  useEffect(() => {
    setSelected("분야", user.field);
    setSelected("경력", user.experience);
  }, [user.field, user.experience, setSelected]);

  // Dropdown 값이 변경될 때 formData 업데이트
  useEffect(() => {
    const field = selectedValues["분야"];
    const experience = selectedValues["경력"];

    if (field && field !== formData.field) {
      setFormData((prev) => ({ ...prev, field }));
    }
    if (experience && experience !== formData.experience) {
      setFormData((prev) => ({ ...prev, experience }));
    }
  }, [selectedValues, formData.field, formData.experience]);

  // 이미지 파일 변경 핸들러
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
      const newImageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profileImageUrl: newImageUrl }));
    }
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // --- ✅ 모든 함수를 독립적으로 분리 ---

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill === "") return;

    if (formData.skills.length >= MAX_SKILLS) {
      alert(`최대 ${MAX_SKILLS}개까지만 추가할 수 있습니다.`);
      return;
    }
    if (
      formData.skills
        .map((s) => s.toLowerCase())
        .includes(trimmedSkill.toLowerCase())
    ) {
      alert("이미 추가된 기술 스택입니다.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, trimmedSkill],
    }));
    setSkillInput("");
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (formData.introduction.length > MAX_INTRODUCTION_LENGTH) {
      newErrors.introduction = `한 줄 소개는 ${MAX_INTRODUCTION_LENGTH}자 이내로 작성해주세요.`;
    }
    if (formData.skills.length === 0) {
      newErrors.skills = "최소 1개의 기술 스택을 추가해주세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // 프로필 이미지 업로드 처리
      let profileImageUrl = formData.profileImageUrl;

      // 새로운 이미지 파일이 있을 때만 업로드
      if (profileImageFile) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          alert("로그인이 필요합니다.");
          return;
        }

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

        // users 테이블 업데이트
        const { error: updateError } = await supabase
          .from("users")
          .update({ profile_image: profileImageUrl })
          .eq("id", user.id);

        if (updateError) {
          console.error("users 테이블 업데이트 실패:", updateError);
        }

        // user_metadata 업데이트
        const { error: metadataError } = await supabase.auth.updateUser({
          data: {
            profile_image: profileImageUrl,
          },
        });

        if (metadataError) {
          console.error("user_metadata 업데이트 실패:", metadataError);
        }
      } else {
        // 이미지를 변경하지 않았다면 기존 URL 유지
        // blob URL이 아닌 원본 URL 사용
        if (
          formData.profileImageUrl?.startsWith("blob:") ||
          formData.profileImageUrl?.startsWith("data:")
        ) {
          profileImageUrl = user.profileImageUrl; // 원본 user 데이터의 URL 사용
        }
      }

      // 업데이트된 프로필 정보 저장
      onSave({ ...formData, profileImageUrl });
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  // --- ✅ JSX 반환문은 컴포넌트의 마지막에 한번만 존재 ---
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
      <style>{`
        .profile-modal-dropdown [role="listbox"] {
          font-size: 16px !important;
          color: rgb(156, 156, 156) !important;
          border: none !important;
          border-radius: 0.375rem !important; /* rounded-md */
        }
        .profile-modal-dropdown [role="listbox"] li {
          font-size: 16px !important;
          color: rgb(156, 156, 156) !important;
          border: none !important;
          padding: 0.75rem !important; /* p-3 */
        }
        .profile-modal-dropdown button {
          border: none !important;
          border-radius: 0.375rem !important; /* rounded-md */
          padding: 0.75rem !important; /* p-3 */
        }
        .profile-modal-dropdown button span {
          color: rgb(17, 24, 39) !important; /* text-gray-900, 한줄소개와 동일 */
        }
      `}</style>
      <div
        ref={modalRef}
        className="bg-[#e9fafe] rounded-2xl px-[90px] py-10 shadow-2xl w-full max-w-[600px] flex flex-col gap-6 relative"
      >
        <button
          onClick={() => fileInputRef.current?.click()}
          className="relative mx-auto mb-4 w-32 h-32 group"
          aria-label="프로필 이미지 변경"
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-primary transition-colors bg-gray-100">
            <Image
              src={formData.profileImageUrl || "/assets/no-profile.svg"}
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              unoptimized={
                formData.profileImageUrl?.startsWith("blob:") ||
                formData.profileImageUrl?.endsWith(".svg")
              }
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[color:var(--color-deep)] rounded-full flex justify-center items-center group-hover:bg-primary transition-colors shadow-lg">
            <PlusIcon />
          </div>
        </button>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray mb-1">
              아이디
            </label>
            <input
              type="text"
              value={formData.name}
              disabled
              className="w-full p-3 bg-[#e9fafe] rounded-md border border-gray text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray mb-1">
              이메일
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full p-3 bg-[#e9fafe] rounded-md border border-gray text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label
              htmlFor="introduction"
              className="block text-sm font-medium text-gray mb-1"
            >
              한 줄 소개 ({formData.introduction.length}/
              {MAX_INTRODUCTION_LENGTH})
            </label>
            <input
              id="introduction"
              name="introduction"
              type="text"
              value={formData.introduction}
              onChange={handleChange}
              maxLength={MAX_INTRODUCTION_LENGTH}
              className="w-full p-3 bg-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.introduction && (
              <p className="text-red-500 text-sm mt-1">{errors.introduction}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="field"
              className="block text-sm font-medium text-gray mb-1"
            >
              분야
            </label>
            <div className="profile-modal-dropdown">
              <Dropdown
                options={FIELD_OPTIONS}
                placeholder="분야"
                width="100%"
                height="48px"
                className="!border-0 !text-[16px] !text-gray"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray mb-1"
            >
              경력
            </label>
            <div className="profile-modal-dropdown">
              <Dropdown
                options={EXPERIENCE_OPTIONS}
                placeholder="경력"
                width="100%"
                height="48px"
                className="!border-0 !text-[16px] !text-gray"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray mb-1"
            >
              기술 스택 (최대 {MAX_SKILLS}개)
            </label>
            <input
              id="skills"
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillAdd}
              placeholder="기술 스택을 검색하고 Enter를 누르세요"
              className="w-full p-3 bg-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
            )}
            <div className="flex gap-2 mt-3 flex-wrap">
              {formData.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleSkillRemove(skill)}
                    className="text-white hover:bg-deep rounded-full p-0.5"
                    aria-label={`${skill} 제거`}
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-10 mt-4">
          <Button
            size="xl"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 rounded-lg"
          >
            <span>취소</span>
          </Button>
          <Button
            size="xl"
            onClick={() => void handleSubmit()}
            className="border-"
          >
            <span>완료</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
