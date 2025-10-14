"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/input/Dropdown";
import { useDropdownStore } from "@/store/dropdown-store";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { position: string; reason: string }) => void;
}

export default function ApplyModal({
  isOpen,
  onClose,
  onSubmit,
}: ApplyModalProps) {
  const [reason, setReason] = useState("");
  const { selectedValues, setSelected } = useDropdownStore();

  const maxLength = 100;
  const currentLength = reason.length;
  const selectedPosition = selectedValues["포지션"] || "";

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setSelected("포지션", "");
    }
  }, [isOpen, setSelected]);

  const handleSubmit = () => {
    if (!selectedPosition) {
      alert("포지션을 선택해주세요.");
      return;
    }
    if (reason.trim().length === 0) {
      alert("지원 사유를 입력해주세요.");
      return;
    }

    onSubmit({
      position: selectedPosition,
      reason: reason.trim(),
    });

    // 제출 후 상태 초기화
    setReason("");
    setSelected("포지션", "");
    onClose();
  };

  const handleCancel = () => {
    setReason("");
    setSelected("포지션", "");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 backdrop-blur-sm" onClick={handleCancel} />

      {/* 모달 컨텐츠 */}
      <div
        className="bg-white rounded-2xl p-8 w-[495px] h-[671px] max-w-[90vw] max-h-[90vh] overflow-y-auto relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목 */}
        <h2
          className="font-bold mb-8"
          style={{
            fontSize: "var(--text-8)",
            color: "var(--color-deep)",
          }}
        >
          지원하기
        </h2>

        {/* 지원 포지션 */}
        <div className="mb-6">
          <label
            className="block mb-4"
            style={{
              fontSize: "var(--text-6)",
              color: "var(--color-gray)",
            }}
          >
            지원 포지션
          </label>
          <Dropdown
            options={["프론트엔드", "백엔드", "풀스택", "디자이너", "기획자"]}
            placeholder="포지션"
            width="100%"
            height="90px"
          />
        </div>

        {/* 지원 사유 */}
        <div className="mb-8">
          <label
            className="block mb-4"
            style={{
              fontSize: "var(--text-6)",
              color: "var(--color-gray)",
            }}
          >
            지원 사유
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="함께 하는게 맞아요. 시켜만 주시면 열심히 하겠습니다."
            maxLength={maxLength}
            className="w-full h-[200px] p-6 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{
              fontSize: "var(--text-6)",
            }}
          />
          <div
            className="text-right mt-2"
            style={{
              fontSize: "var(--text-5)",
              color:
                currentLength > 0 ? "var(--color-deep)" : "var(--color-gray)",
            }}
          >
            최대 100자 까지 가능합니다 {currentLength}/{maxLength}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-4">
          <Button
            onClick={handleCancel}
            variant="secondary"
            className="flex-1 h-[60px]"
            style={{
              fontSize: "var(--text-6)",
            }}
          >
            취소하기
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            className="flex-1 h-[60px]"
            style={{
              fontSize: "var(--text-6)",
            }}
          >
            지원하기
          </Button>
        </div>
      </div>
    </div>
  );
}
