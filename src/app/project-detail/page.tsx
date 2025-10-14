"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import ApplyModal from "@/components/project-detail/ApplyModal";

export default function ProjectDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplySubmit = (data: { position: string; reason: string }) => {
    console.log("지원 데이터:", data);
    // 여기에서 실제 지원 로직 처리
    alert(`${data.position} 포지션으로 지원이 완료되었습니다!`);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">프로젝트 상세 페이지</h1>

        {/* 임시 프로젝트 정보 */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">AI 기반 헬스케어 앱 개발</h2>
          <p className="text-gray-600 mb-4">
            건강 관리를 위한 AI 기반 헬스케어 애플리케이션을 개발하는
            프로젝트입니다.
          </p>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              프론트엔드 개발자 모집
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              백엔드 개발자 모집
            </span>
          </div>
        </div>

        {/* 지원하기 버튼 */}
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          size="lg"
          className="w-full h-16"
        >
          지원하기
        </Button>

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
