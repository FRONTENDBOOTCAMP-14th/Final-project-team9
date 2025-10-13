import Link from "next/link";
import { jalnan } from "../../../../fonts";

interface Props {
  className?: string;
}

export default function LoginButton({ className = "" }: Props) {
  const baseStyles =
    "w-[100px] h-[45px] rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center";
  const variantStyles =
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <Link
      href="/login"
      role="button"
      aria-label="로그인 페이지로 이동"
      className={`${baseStyles} ${variantStyles} ${jalnan.className} text-[length:var(--text-5)] ${className}`}
    >
      로그인
    </Link>
  );
}
