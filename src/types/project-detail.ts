export interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApplyFormData) => void;
}

export interface ApplyFormData {
  position: string;
  reason: string;
}

export interface FormErrors {
  position: string;
  reason: string;
}

export interface SuccessToastProps {
  isVisible: boolean;
  onClose: () => void;
}
