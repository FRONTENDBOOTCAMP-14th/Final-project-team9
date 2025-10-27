import React, { useEffect, useRef } from "react";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/input/Dropdown";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { useProfileForm } from "@/hooks/useProfileForm";
import { useDropdownStore } from "@/store/dropdown-store";
import ProfileImageUploader from "./ProfileImageUploader";
import type { UserProfileCardProps } from "./Profile";

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

// 상수 분리
const MAX_SKILLS = 3;
const MAX_INTRODUCTION_LENGTH = 100;
const FIELD_OPTIONS = ["프론트엔드", "백엔드", "디자이너", "기획자"];
const EXPERIENCE_OPTIONS = ["신입", "1-3년", "3-5년", "5년 이상"];

export default function ProfileEditModal({
  user,
  onClose,
  onSave,
}: {
  user: Omit<UserProfileCardProps, "projectCounts">;
  onClose: () => void;
  onSave: (updatedUser: Omit<UserProfileCardProps, "projectCounts">) => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. 모달 접근성 관련 로직
  useModalAccessibility(modalRef, onClose);

  // 2. 폼 상태 및 핸들러 로직
  const {
    formData,
    setFormData,
    skillInput,
    setSkillInput,
    errors,
    handleImageChange,
    handleSkillAdd,
    handleSkillRemove,
    handleChange,
    handleSubmit,
  } = useProfileForm(user, onSave);

  // 3. 드롭다운 상태 관리
  const { selectedValues, setSelected } = useDropdownStore();

  // Dropdown 초기값 설정
  useEffect(() => {
    setSelected("분야", user.positions);
    setSelected("경력", user.careers);
  }, [user.positions, user.careers, setSelected]);

  // Dropdown 값이 변경될 때 formData 업데이트
  useEffect(() => {
    const field = selectedValues["분야"];
    const careers = selectedValues["경력"];

    if (field && field !== formData.positions) {
      setFormData((prev) => ({ ...prev, positions: field }));
    }
    if (careers && careers !== formData.careers) {
      setFormData((prev) => ({ ...prev, careers }));
    }
  }, [selectedValues, formData.positions, formData.careers, setFormData]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
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
        <ProfileImageUploader
          profile_image={formData.profile_image}
          username={formData.username}
          fileInputRef={fileInputRef}
          onImageChange={handleImageChange}
        />

        <div className="space-y-4">
          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium text-gray mb-1">
              아이디
            </label>
            <input
              type="text"
              value={formData.username}
              disabled
              className="w-full p-3 bg-[#e9fafe] rounded-md border border-gray text-gray-500 cursor-not-allowed"
            />
          </div>
          {/* 이메일 */}
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
          {/* 한 줄 소개 */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray mb-1"
            >
              한 줄 소개 ({formData.bio.length}/{MAX_INTRODUCTION_LENGTH})
            </label>
            <input
              id="bio"
              name="bio"
              type="text"
              value={formData.bio}
              onChange={handleChange}
              maxLength={MAX_INTRODUCTION_LENGTH}
              className="w-full p-3 bg-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
            )}
          </div>
          {/* 분야 */}
          <div>
            <label
              htmlFor="positions"
              className="block text-sm font-medium text-gray mb-1"
            >
              분야
            </label>
            <Dropdown
              options={FIELD_OPTIONS}
              placeholder="분야"
              width="100%"
              height="48px"
              className="!border-0 !text-[16px] !text-gray"
            />
          </div>
          {/* 경력 */}
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray mb-1"
            >
              경력
            </label>
            <Dropdown
              options={EXPERIENCE_OPTIONS}
              placeholder="경력"
              width="100%"
              height="48px"
              className="!border-0 !text-[16px] !text-gray"
            />
          </div>
          {/* 기술 스택 */}
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
              {formData.tech_stacks.map((skill) => (
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
