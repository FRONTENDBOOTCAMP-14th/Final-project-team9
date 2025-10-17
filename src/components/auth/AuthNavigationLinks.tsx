import Link from "next/link";

export type LinkType = "login" | "signup" | "findId" | "findPassword";

interface AuthNavigationLinksProps {
  type: LinkType;
}

const AuthNavigationLinks = ({ type }: AuthNavigationLinksProps) => {
  switch (type) {
    case "login":
      return (
        <div className="flex justify-between items-center text-[20px] text-[#90A5EA] h-[24px] w-full">
          <Link href="/sign-up" className="hover:underline">
            회원가입
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/find-id" className="hover:underline">
              아이디 찾기
            </Link>
            <span className="text-[12px] text-black">|</span>
            <Link href="/find-password" className="hover:underline">
              비밀번호 찾기
            </Link>
          </div>
        </div>
      );

    case "findPassword":
      return (
        <div className="w-full flex justify-end">
          <Link
            href="/find-password"
            className="text-[#90A5EA] text-[20px] hover:underline"
          >
            비밀번호 찾기
          </Link>
        </div>
      );

    case "findId":
      return (
        <div className="w-full flex justify-end">
          <Link
            href="/find-id"
            className="text-[#90A5EA] text-[20px] hover:underline"
          >
            아이디 찾기
          </Link>
        </div>
      );

    case "signup":
      return (
        <div className="w-full flex justify-end">
          <Link
            href="/login"
            className="text-[#90A5EA] text-[20px] hover:underline"
          >
            로그인
          </Link>
        </div>
      );

    default:
      return null;
  }
};

export default AuthNavigationLinks;
