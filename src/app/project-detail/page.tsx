"use client";

import { useState } from "react";
import ApplyModal from "@/components/project-detail/ApplyModal";
import type { ApplyFormData } from "@/components/project-detail/types";

export default function ProjectDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const applicantCount = 3; // 임시 데이터 - 실제로는 API에서 받아올 값

  const handleApplySubmit = (data: ApplyFormData) => {
    console.log("지원 데이터:", data);
    // 여기에서 실제 지원 로직 처리 (API 호출 등)
    // 모달 닫기는 ApplyModal 내부에서 처리함
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-lg p-12 max-w-[600px] w-full">
        {/* 제목 */}
        <h1 className="text-5xl font-bold mb-6 text-gray-900">지원 🎉</h1>

        {/* 부제목 */}
        <p className="text-lg text-gray-500 mb-10">
          현재{" "}
          <span className="font-semibold text-blue-600">
            {applicantCount}명
          </span>{" "}
          지원했습니다.
        </p>

        {/* 지원하기 버튼 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full h-[72px] bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white text-xl font-semibold rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          지원하기
        </button>

        {/* 지원하기 모달 */}
        <ApplyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleApplySubmit}
        />
      </div>
    </div>
  );
}
