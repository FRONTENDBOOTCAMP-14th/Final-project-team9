import { useState, useEffect } from "react";
import type { UserProfileCardProps } from "@/components/mypage/Profile";
import useProfileStore from "@/store/profile-store";
import {
  sanitizeHTML,
  sanitizeDescription,
  normalizeWhitespace,
} from "@/utils/sanitize";

const MAX_SKILLS = 3;
const MAX_INTRODUCTION_LENGTH = 100;

export function useProfileForm(
  initialUser: Omit<UserProfileCardProps, "projectCounts">,
  onSave: (updatedUser: Omit<UserProfileCardProps, "projectCounts">) => void
) {
  // 기본값을 명시하여 런타임에 일부 필드가 없을 때 발생하는 에러를 방지
  const defaultInitial = {
    profile_image: "",
    username: "",
    nickname: "",
    email: "",
    bio: "",
    positions: "",
    careers: "",
    tech_stacks: [] as string[],
  };

  const [formData, setFormData] = useState(() => {
    // initialUser의 tech_stacks를 명시적으로 복사
    const merged = {
      ...defaultInitial,
      ...initialUser,
      tech_stacks: Array.isArray(initialUser.tech_stacks)
        ? [...initialUser.tech_stacks]
        : [],
    };
    return merged as Omit<UserProfileCardProps, "projectCounts">;
  });
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const { updateProfile } = useProfileStore();

  // 이미지 Object URL 클린업
  useEffect(() => {
    const imageUrl = formData.profile_image;
    return () => {
      if (imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [formData.profile_image]);

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
      setFormData((prev) => ({ ...prev, profile_image: newImageUrl }));
    }
  };

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    // 살균처리 적용
    const sanitized = normalizeWhitespace(sanitizeHTML(skillInput));
    const trimmedSkill = sanitized.trim();
    if (trimmedSkill === "") return;
    const currentSkills = Array.isArray(formData.tech_stacks)
      ? formData.tech_stacks
      : [];
    if (currentSkills.length >= MAX_SKILLS) {
      alert(`최대 ${MAX_SKILLS}개까지만 추가할 수 있습니다.`);
      return;
    }
    if (
      currentSkills
        .map((s) => s.toLowerCase())
        .includes(trimmedSkill.toLowerCase())
    ) {
      alert("이미 추가된 기술 스택입니다.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      tech_stacks: [
        ...(Array.isArray(prev.tech_stacks) ? prev.tech_stacks : []),
        trimmedSkill,
      ],
    }));
    setSkillInput("");
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tech_stacks: (Array.isArray(prev.tech_stacks)
        ? prev.tech_stacks
        : []
      ).filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // 살균처리 적용
    let sanitized = value;
    if (name === "bio") {
      sanitized = sanitizeDescription(value, MAX_INTRODUCTION_LENGTH);
    } else {
      sanitized = sanitizeHTML(value);
    }
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const bioLength = formData?.bio ? formData.bio.length : 0;
    const techStacksLength = Array.isArray(formData?.tech_stacks)
      ? formData.tech_stacks.length
      : 0;

    if (bioLength > MAX_INTRODUCTION_LENGTH) {
      newErrors.bio = `한 줄 소개는 ${MAX_INTRODUCTION_LENGTH}자 이내로 작성해주세요.`;
    }
    if (techStacksLength === 0) {
      newErrors.tech_stacks = "최소 1개의 기술 스택을 추가해주세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // 스토어의 액션을 호출하는 깔끔한 코드
    await updateProfile(formData, profileImageFile);

    onSave(formData);
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
