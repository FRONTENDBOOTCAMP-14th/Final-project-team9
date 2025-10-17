import Image from "next/image";
import Link from "next/link";

interface HeaderLogoProps {
  /** 로고를 감싸는 div에 적용할 추가적인 Tailwind CSS 클래스 */
  className?: string;
  /** 로고 이미지의 너비 (기본값: 80) */
  width?: number;
  /** 로고 이미지의 높이 (기본값: 80) */
  height?: number;
}

/**
 * 클릭 시 메인 페이지('/')로 이동하는 Joyin 로고 컴포넌트입니다.
 * props를 통해 크기와 외부 여백을 조절할 수 있습니다.
 * @param {string} [className]
 * @param {number} [width=80]
 * @param {number} [height=80]
 */
const HeaderLogo = ({
  className,
  width = 80,
  height = 80,
}: HeaderLogoProps) => {
  return (
    // Link 컴포넌트로 이미지를 감싸 클릭 가능하게 만듭니다.
    <Link href="/" aria-label="메인 페이지로 이동">
      <div className={`flex justify-center ${className || ""}`}>
        <Image
          src="/assets/joyin-logo.webp"
          alt="Joyin 로고"
          width={width}
          height={height}
          priority
        />
      </div>
    </Link>
  );
};

export default HeaderLogo;
