import React from "react";
import Image from "next/image";

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

interface ProfileImageUploaderProps {
  profile_image: string;
  username: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileImageUploader({
  profile_image,
  username,
  fileInputRef,
  onImageChange,
}: ProfileImageUploaderProps) {
  // username prop을 사용하여 대체 텍스트와 플레이스홀더를 동적으로 생성합니다.
  const altText = `${username}의 프로필 이미지`;
  const placeholderUrl = `https://placehold.co/128x128/E9FAFE/333333?text=${username?.charAt(0) || "?"}`;
  // next/image는 외부 호스트를 사용하려면 next.config.js에 도메인을 추가해야 합니다.
  // 여기서는 placeholderUrl 또는 외부 URL을 사용하는 경우 unoptimized=true로 설정해 에러를 회피합니다.
  const srcToUse = profile_image || placeholderUrl;
  const shouldUnoptimized =
    srcToUse.startsWith("blob:") ||
    srcToUse.endsWith(".svg") ||
    srcToUse.startsWith("http");
  return (
    <button
      onClick={() => fileInputRef.current?.click()}
      className="relative mx-auto mb-4 w-32 h-32 group"
      aria-label="프로필 이미지 변경"
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onImageChange}
        className="hidden"
      />
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-primary transition-colors bg-gray-100">
        <Image
          // 이미지가 없으면 이름 이니셜 플레이스홀더를 보여줍니다.
          src={srcToUse}
          // 동적으로 생성된 alt 텍스트를 사용합니다.
          alt={altText}
          width={128}
          height={128}
          className="w-full h-full object-cover"
          unoptimized={shouldUnoptimized}
          priority
        />
      </div>
      <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[color:var(--color-deep)] rounded-full flex justify-center items-center group-hover:bg-primary transition-colors shadow-lg">
        <PlusIcon />
      </div>
    </button>
  );
}
