import Image from "next/image";
import Header from "@/components/common/header/Header";
import MainPageButton from "@/components/mainpage/MainPageButton";
import { jalnan } from "@/fonts";

export default function MainBannerSection() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      aria-labelledby="main-banner-heading"
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/assets/joyin-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
          quality={100}
        />
      </div>

      {/* 헤더 */}
      <Header variant="transparent" />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        <div className="flex flex-col items-center">
          <h1
            id="main-banner-heading"
            className={`text-center mb-8 ${jalnan.className}`}
          >
            <span className="block text-[120px] font-bold leading-tight tracking-tight">
              <span className="text-white">JO</span>
              <span className="text-primary">IN</span>
              <span className="text-white"> US, EN</span>
              <span className="text-primary">JOY</span>
              <span className="text-white"> US</span>
            </span>
          </h1>

          {/* 부제 */}
          <p
            className={`text-[length:var(--text-12)] font-bold text-[color:var(--color-deep)] mb-[140px] ${jalnan.className}`}
          >
            함께 성장하고, 함께 만들어가는 커뮤니티
          </p>

          {/* 버튼 그룹 */}
          <MainPageButton />
        </div>
      </div>
    </section>
  );
}
