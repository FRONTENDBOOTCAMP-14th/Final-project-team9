import { useState, useEffect } from "react";
import type { UserProfileCardProps } from "@/components/mypage/Profile";

const MAX_SKILLS = 3;
const MAX_INTRODUCTION_LENGTH = 100;

export function useProfileForm(
  initialUser: Omit<UserProfileCardProps, "projectCounts">,
  onSave: (updatedUser: Omit<UserProfileCardProps, "projectCounts">) => void,
) {
  const [formData, setFormData] = useState(initialUser);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  // 이미지 Object URL 클린업
  useEffect(() => {
    const imageUrl = formData.profileImageUrl;
    return () => {
      if (imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [formData.profileImageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB 이하여야 합니다.");
        return;
      }
      setProfileImageFile(file);
      const newImageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profileImageUrl: newImageUrl }));
    }
  };

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
      let profileImageUrl = formData.profileImageUrl;
      if (profileImageFile) {
        // ... (Supabase 업로드 로직)
      } else {
        if (formData.profileImageUrl?.startsWith("blob:")) {
          profileImageUrl = initialUser.profileImageUrl;
        }
      }
      onSave({ ...formData, profileImageUrl });
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  return {
    formData,
    setFormData,
    skillInput,
    setSkillInput,
    errors,
    profileImageFile,
    handleImageChange,
    handleSkillAdd,
    handleSkillRemove,
    handleChange,
    handleSubmit,
  };
}
