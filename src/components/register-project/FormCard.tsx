import React from "react";

// 공통 스타일 상수
export const CARD_STYLES = {
  container:
    "w-[671px] h-[362px] bg-white rounded-2xl border border-gray-100 flex flex-col",
  shadow: { boxShadow: "6px 6px 20px rgba(0, 0, 0, 0.1)" },
  title: "font-bold ml-[50px] mt-[50px]",
  titleStyle: { fontSize: "var(--text-8)", color: "var(--color-deep)" },
  description: "ml-[50px] mt-[10px]",
  descriptionStyle: { fontSize: "var(--text-6)", color: "var(--color-gray)" },
  input:
    "border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-primary placeholder:[color:var(--color-gray)] w-[571px] h-[90px] ml-[50px] mt-[30px] pl-[30px] pt-[26px] pb-[27px]",
  inputStyle: { fontSize: "var(--text-7)" },
  message: "ml-[50px] mt-[30px]",
  messageStyle: { fontSize: "var(--text-5)" },
};

interface FormCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  errorMessage?: string;
  helpMessage: string;
  width?: string;
  height?: string;
}

const FormCard: React.FC<FormCardProps> = ({
  title,
  description,
  children,
  errorMessage,
  helpMessage,
  width = "671px",
  height = "362px",
}) => (
  <div
    className="bg-white rounded-2xl border border-gray-100 flex flex-col"
    style={{
      ...CARD_STYLES.shadow,
      width,
      height,
    }}
  >
    <h3 className={CARD_STYLES.title} style={CARD_STYLES.titleStyle}>
      {title}
    </h3>
    <p className={CARD_STYLES.description} style={CARD_STYLES.descriptionStyle}>
      {description}
    </p>
    {children}
    <p
      className={CARD_STYLES.message}
      style={{
        ...CARD_STYLES.messageStyle,
        color: errorMessage ? "#ff4757" : "#dbdbdb",
      }}
    >
      {errorMessage || helpMessage}
    </p>
  </div>
);

export default FormCard;
