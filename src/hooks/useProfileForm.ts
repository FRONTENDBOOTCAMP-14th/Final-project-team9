import { useState, useEffect } from "react";
import type { UserProfileCardProps } from "@/components/mypage/Profile";
import useProfileStore from "@/store/profile-store";
import {
  sanitizeHTML,
  sanitizeDescription,
  normalizeWhitespace,
} from "@/utils/sanitize";
import { useToastStore } from "@/store/toast-store";

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
  const showToast = useToastStore((state) => state.showToast);

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
        showToast("이미지 파일만 업로드 가능합니다.", "error");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        showToast("파일 크기는 10MB 이하여야 합니다.", "error");
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
      showToast(`최대 ${MAX_SKILLS}개까지만 추가할 수 있습니다.`, "error");
      return;
    }
    if (
      currentSkills
        .map((s) => s.toLowerCase())
        .includes(trimmedSkill.toLowerCase())
    ) {
      showToast("이미 추가된 기술 스택입니다.", "error");
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

    try {
      // 1. 스토어의 액션을 호출합니다. (이제 이 함수는 에러만 던집니다)
      await updateProfile(formData, profileImageFile);

      // 2. 로직이 여기까지 오면 성공한 것입니다. 성공 토스트를 띄웁니다.
      showToast("프로필이 성공적으로 저장되었습니다.", "success");

      // 3. 부모 컴포넌트(Profile.tsx)에 저장 완료를 알립니다.
      onSave(formData);
    } catch (error) {
      // 4. updateProfile이 에러를 던지면 여기서 잡습니다. 에러 토스트를 띄웁니다.
      console.error("프로필 저장 실패:", error); // (개발자를 위해 console.error는 남겨둡니다)
      const errorMessage =
        error instanceof Error ? error.message : "프로필 저장에 실패했습니다.";
      showToast(errorMessage, "error");
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
