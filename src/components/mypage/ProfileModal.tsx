import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
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

// 이미지 위에 표시될 플러스 아이콘
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 파일 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Optional Chaining 적용
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profileImageUrl: newImageUrl }));
    }
  };

  // 컴포넌트가 언마운트될 때 생성된 Object URL을 해제하여 메모리 누수를 방지합니다.
  useEffect(() => {
    const imageUrl = formData.profileImageUrl;
    return () => {
      if (imageUrl?.startsWith("blob:")) {
        // Optional Chaining 적용
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [formData.profileImageUrl]);

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

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      skillInput.trim() !== "" &&
      formData.skills.length < 3
    ) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
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

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-[#e9fafe] rounded-2xl px-[90px] py-10 shadow-2xl w-full max-w-[600px] flex flex-col gap-6 relative"
      >
        {/* 프로필 이미지 업로드 섹션 */}
        <div className="relative mx-auto mb-4">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 group"
            aria-label="프로필 이미지 변경"
          >
            <img
              src={
                formData.profileImageUrl ||
                `https://placehold.co/128x128/E9FAFE/333333?text=${formData.name.charAt(0)}`
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex justify-end items-end transition-opacity duration-300">
              <div className="w-10 h-10 bg-deep rounded-full flex justify-center items-center group-hover:bg-primary">
                <PlusIcon />
              </div>
            </div>
          </button>
        </div>

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
              한 줄 소개
            </label>
            <input
              id="introduction"
              name="introduction"
              type="text"
              value={formData.introduction}
              onChange={handleChange}
              className="w-full p-3 bg-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label
              htmlFor="field"
              className="block text-sm font-medium text-gray mb-1"
            >
              분야
            </label>
            <select
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              className="w-full p-3 bg-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option>프론트엔드</option>
              <option>백엔드</option>
              <option>디자이너</option>
              <option>기획자</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray mb-1"
            >
              경력
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 bg-white rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option>신입</option>
              <option>1~3년</option>
              <option>3~5년</option>
              <option>5년 이상</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray mb-1"
            >
              기술 스택 (최대 3개)
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
          <Button size="xl" onClick={handleSubmit} className="border-">
            <span>완료</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
