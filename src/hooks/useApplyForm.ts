import { useState, useEffect, useCallback } from "react";
import {
  ERROR_MESSAGES,
  FORM_CONSTANTS,
} from "@/components/project-detail/constants";
import { useDropdownStore } from "@/store/dropdown-store";
import type { FormErrors } from "@/types/project";

export function useApplyForm(isOpen: boolean) {
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<FormErrors>({
    position: "",
    reason: "",
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { selectedValues, setSelected } = useDropdownStore();

  const selectedPosition = selectedValues["포지션"] || "";

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setSelected("포지션", "");
      setErrors({ position: "", reason: "" });
    }
  }, [isOpen, setSelected]);

  // 포지션 선택 시 에러 메시지 제거
  useEffect(() => {
    if (selectedPosition && errors.position) {
      setErrors((prev) => ({ ...prev, position: "" }));
    }
  }, [selectedPosition, errors.position]);

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {
      position: "",
      reason: "",
    };

    if (!selectedPosition) {
      newErrors.position = ERROR_MESSAGES.POSITION_REQUIRED;
    }
    if (reason.trim().length === 0) {
      newErrors.reason = ERROR_MESSAGES.REASON_REQUIRED;
    }

    return newErrors;
  }, [selectedPosition, reason]);

  const resetForm = useCallback(() => {
    setReason("");
    setSelected("포지션", "");
    setErrors({ position: "", reason: "" });
  }, [setSelected]);

  const handleReasonChange = useCallback(
    (value: string) => {
      setReason(value);
      if (errors.reason) {
        setErrors((prev) => ({ ...prev, reason: "" }));
      }
    },
    [errors.reason],
  );

  return {
    reason,
    errors,
    selectedPosition,
    showSuccessToast,
    currentLength: reason.length,
    maxLength: FORM_CONSTANTS.MAX_REASON_LENGTH,
    setErrors,
    setShowSuccessToast,
    validateForm,
    resetForm,
    handleReasonChange,
  };
}
