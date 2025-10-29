import type { KeyboardEvent } from "react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/input/Dropdown";
import { useFetchStacks } from "@/hooks/useFetchStacks";
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
const FIELD_OPTIONS = ["프론트엔드", "백엔드", "기획자", "디자이너"];
const EXPERIENCE_OPTIONS = [
  "신입(1년 미만)",
  "주니어(1~3년)",
  "미들(3~5년)",
  "시니어(5년 이상)",
];

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

  // 3. 드롭다운 상태 관리
  const { selectedValues, setSelected, resetAll } = useDropdownStore();

  // 모달 닫기 핸들러 (Dropdown 스토어 리셋 포함)
  const handleClose = useCallback(() => {
    resetAll(); // Dropdown 스토어 초기화
    onClose();
  }, [onClose, resetAll]);

  // 1. 모달 접근성 관련 로직
  useModalAccessibility(modalRef, handleClose);

  // 2. 폼 상태 및 핸들러 로직
  const {
    formData,
    setFormData,
    skillInput,
    setSkillInput,
    errors,
    handleImageChange,
    handleChange,
    handleSubmit,
  } = useProfileForm(user, onSave);

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

  const { stacks: allStacksFromDB, loading, error } = useFetchStacks();
  const [filteredStacks, setFilteredStacks] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const searchTerm = skillInput.trim();
    if (searchTerm && !loading && !error) {
      setFilteredStacks(
        allStacksFromDB.filter(
          (stack) =>
            stack.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !formData.tech_stacks.includes(stack),
        ),
      );
    } else {
      setFilteredStacks([]);
    }
    setActiveIndex(-1);
  }, [skillInput, formData.tech_stacks, allStacksFromDB, loading, error]);

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredStacks.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredStacks.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + filteredStacks.length) % filteredStacks.length,
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      addSkill(filteredStacks[activeIndex]);
    } else if (e.key === "Escape") setSkillInput("");
  };

  const addSkill = (skill: string) => {
    if (
      formData.tech_stacks.length >= MAX_SKILLS ||
      formData.tech_stacks.includes(skill)
    )
      return;
    setFormData((prev) => ({
      ...prev,
      tech_stacks: [...prev.tech_stacks, skill],
    }));
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      tech_stacks: prev.tech_stacks.filter((s) => s !== skill),
    }));
  };

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
        className="bg-[#e9fafe] rounded-2xl px-[90px] py-7 shadow-2xl w-full max-w-[600px] flex flex-col relative max-h-[95vh] overflow-y-auto"
      >
        <ProfileImageUploader
          profile_image={formData.profile_image}
          username={formData.nickname || formData.username}
          fileInputRef={fileInputRef}
          onImageChange={handleImageChange}
        />

        <div className="space-y-3">
          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium text-gray mb-0.5">
              아이디
            </label>
            <input
              type="text"
              value={formData.username}
              disabled
              className="w-full p-2.5 bg-[#e9fafe] rounded-md border border-gray text-gray-500 cursor-not-allowed text-sm"
            />
          </div>
          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray mb-0.5">
              이메일
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full p-2.5 bg-[#e9fafe] rounded-md border border-gray text-gray-500 cursor-not-allowed text-sm"
            />
          </div>
          {/* 닉네임 */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray mb-0.5"
            >
              닉네임
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full p-2.5 bg-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-sm"
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>
            )}
          </div>
          {/* 한 줄 소개 */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray mb-0.5"
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
              className="w-full p-2.5 bg-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-sm"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
            )}
          </div>
          {/* 분야 */}
          <div>
            <label
              htmlFor="positions"
              className="block text-sm font-medium text-gray mb-0.5"
            >
              분야
            </label>
            <Dropdown
              options={FIELD_OPTIONS}
              placeholder="분야"
              width="100%"
              height="40px"
              className="!border-0 !text-sm !text-gray"
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, positions: value }))
              }
            />
          </div>
          {/* 경력 */}
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray mb-0.5"
            >
              경력
            </label>
            <Dropdown
              options={EXPERIENCE_OPTIONS}
              placeholder="경력"
              width="100%"
              height="40px"
              className="!border-0 !text-sm !text-gray"
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, careers: value }))
              }
            />
          </div>
          {/* 기술 스택 */}
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray mb-0.5"
            >
              기술 스택 (최대 {MAX_SKILLS}개)
            </label>
            <input
              id="skills"
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="기술 스택을 검색하고 Enter를 누르세요"
              className="w-full p-2.5 bg-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-sm"
            />
            {filteredStacks.length > 0 && (
              <ul className="border border-gray-300 bg-white rounded-md mt-1 max-h-40 overflow-y-auto z-10 absolute w-105">
                {filteredStacks.map((stack, idx) => (
                  <li
                    key={stack}
                    className={`px-4 py-2 cursor-pointer ${idx === activeIndex ? "bg-gray-100" : "hover:bg-gray-100"}`}
                    onClick={() => addSkill(stack)}
                  >
                    {stack}
                  </li>
                ))}
              </ul>
            )}
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
            )}
            <div className="flex gap-2 mt-3 flex-wrap">
              {formData.tech_stacks.map((skill) => (
                <div
                  key={skill}
                  className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-2 cursor-default"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-white hover:bg-deep rounded-full p-0.5 cursor-pointer"
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
            onClick={handleClose}
            className="bg-gray-300 text-gray-700 !h-[70px] cursor-pointer"
          >
            <span>취소</span>
          </Button>
          <Button
            size="xl"
            onClick={() => {
              void (async () => {
                await handleSubmit();
                handleClose();
              })();
            }}
            className="border- !h-[70px] cursor-pointer"
          >
            <span>완료</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
