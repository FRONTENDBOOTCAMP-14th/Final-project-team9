import Link from "next/link";
import { jalnan } from "../../fonts";

interface ButtonData {
  href: string;
  text: string;
  ariaLabel: string;
}

const buttonData: ButtonData[] = [
  {
    href: "/projects",
    text: "프로젝트 찾기",
    ariaLabel: "프로젝트 찾기 페이지로 이동",
  },
  {
    href: "/register-project",
    text: "프로젝트 등록",
    ariaLabel: "새 프로젝트 등록 페이지로 이동",
  },
];

const buttonBaseStyles = `
  inline-flex items-center justify-center
  w-60 h-16
  bg-primary text-white
  rounded-xl
  text-7 font-bold
  border-2 border-transparent
  hover:bg-primary/90 hover:border-primary/30 hover:scale-105
  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
  focus-visible:ring-4 focus-visible:ring-primary/30
  active:scale-95
  transition-all duration-300 ease-in-out
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
`;

export default function MainPageButton() {
  return (
    <section
      className="flex gap-24 justify-center"
      role="navigation"
      aria-label="주요 액션 버튼"
    >
      {buttonData.map((button) => (
        <Link
          key={button.href}
          href={button.href}
          className={`${jalnan.className} ${buttonBaseStyles}`}
          aria-label={button.ariaLabel}
        >
          <span>{button.text}</span>
        </Link>
      ))}
    </section>
  );
}
