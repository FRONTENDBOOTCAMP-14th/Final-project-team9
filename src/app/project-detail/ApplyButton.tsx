//임시 상태관리 파일
"use client";

import { useState } from "react";
import ApplyModal from "@/components/project-detail/ApplyModal";
import type { ApplyFormData } from "@/components/project-detail/types";

export default function ApplyButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplySubmit = (data: ApplyFormData) => {
    console.log("지원 데이터:", data);
    // TODO: API 연동
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        지원하기
      </button>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleApplySubmit}
      />
    </>
  );
}
