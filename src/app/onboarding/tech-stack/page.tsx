import type { Metadata } from "next";
import TechStackClient from "@/components/auth/TechStackClient";

export const metadata: Metadata = {
  title: "회원가입 | JOYIN",
  description:
    "자신있는 기술 스택 3가지를 선택하세요. 팀원들에게 나의 강점을 어필할 수 있습니다.",
  icons: {
    icon: "/assets/joyin-fav.ico",
  },
};

export default function TechStackPage() {
  return <TechStackClient />;
}
