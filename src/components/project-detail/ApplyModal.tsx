"use client";

import React, { useEffect, useRef } from "react";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/input/Dropdown";
import { useApplyForm } from "@/hooks/useApplyForm";
import type { ApplyModalProps } from "@/types/project-detail";
import {
  POSITION_OPTIONS,
  FORM_CONSTANTS,
  PLACEHOLDER_TEXT,
} from "./constants";
import SuccessToast from "./SuccessToast";

export default function ApplyModal({
  isOpen,
  onClose,
  onSubmit,
}: ApplyModalProps) {
  const {
    reason,
    errors,
    selectedPosition,
    showSuccessToast,
    currentLength,
    maxLength,
    setErrors,
    setShowSuccessToast,
    validateForm,
    resetForm,
    handleReasonChange,
  } = useApplyForm(isOpen);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // 모달 닫힐 때 포커스 복원
  useEffect(() => {
    if (isOpen) {
      // 현재 포커스된 요소 저장
      previousActiveElement.current = document.activeElement as HTMLElement;
    } else {
      // 모달 닫힐 때 이전 포커스 복원
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // 포커스 트랩
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const handleSubmit = () => {
    const validationErrors = validateForm();

    if (validationErrors.position || validationErrors.reason) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      position: selectedPosition,
      reason: reason.trim(),
    });

    resetForm();
    setShowSuccessToast(true);

    setTimeout(() => {
      onClose();
    }, FORM_CONSTANTS.MODAL_CLOSE_DELAY);
  };

  const handleCancel = () => {
    resetForm();
    setShowSuccessToast(false);
    onClose();
  };

  if (!isOpen && !showSuccessToast) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 backdrop-blur-sm"
            onClick={handleCancel}
            aria-hidden="true"
          />

          {/* 모달 컨텐츠 */}
          <div
            ref={modalRef}
            className="bg-[#f5f5f5] rounded-2xl w-[495px] h-[671px] max-w-[90vw] max-h-[90vh] overflow-y-auto relative z-10 pt-[50px] pl-[50px] pr-[50px]"
            style={{ boxShadow: "4px 4px 7px rgba(170, 170, 170, 1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 제목 */}
            <h2
              id="modal-title"
              className="font-bold mb-[20px] text-[length:var(--text-8)] text-[color:var(--color-deep)]"
            >
              지원하기
            </h2>

            {/* 지원 포지션 */}
            <div className="mb-[30px]">
              <label
                htmlFor="position-select"
                className="block mb-[10px] text-[length:var(--text-7)] text-[color:var(--color-gray)]"
              >
                지원 포지션
              </label>
              <Dropdown
                options={[...POSITION_OPTIONS]}
                placeholder="포지션"
                width="396px"
                height="90px"
              />
              {errors.position && (
                <p
                  className="mt-[10px] text-[length:var(--text-5)] text-red-500"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.position}
                </p>
              )}
            </div>

            {/* 지원 사유 */}
            <div className="mb-[30px]">
              <label
                htmlFor="reason-textarea"
                className="block mb-[10px] text-[length:var(--text-7)] text-[color:var(--color-gray)]"
              >
                지원 사유
              </label>
              <textarea
                id="reason-textarea"
                value={reason}
                onChange={(e) => handleReasonChange(e.target.value)}
                placeholder={PLACEHOLDER_TEXT.REASON}
                maxLength={maxLength}
                aria-describedby="reason-info"
                aria-invalid={!!errors.reason}
                className="w-[396px] h-[171px] p-6 bg-white border border-[color:var(--color-gray)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[length:var(--text-6)]"
              />
              <div
                id="reason-info"
                className="flex justify-between mt-[10px] w-[396px] text-[length:var(--text-5)] text-[#dbdbdb]"
              >
                <span>최대 {maxLength}자 까지 가능합니다</span>
                <span aria-live="polite">
                  {currentLength}/{maxLength}
                </span>
              </div>
              {errors.reason && (
                <p
                  className="mt-[10px] text-[length:var(--text-5)] text-red-500"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.reason}
                </p>
              )}
            </div>

            {/* 버튼 영역 */}
            <div className="flex gap-7.5">
              <Button
                onClick={handleCancel}
                variant="secondary"
                className="w-[183px] h-[56px] text-[length:var(--text-6)]"
                aria-label="지원 취소"
              >
                취소하기
              </Button>
              <Button
                onClick={handleSubmit}
                variant="primary"
                className="w-[183px] h-[56px] text-[length:var(--text-6)] !text-white"
                aria-label="지원 제출"
              >
                지원하기
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 성공 토스트 */}
      <SuccessToast
        isVisible={!isOpen && showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
    </>
  );
}
