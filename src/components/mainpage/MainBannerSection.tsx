"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/common/header/Header";
import MainPageButton from "@/components/mainpage/MainPageButton";
import { jalnan } from "@/fonts";
import {
  SLOGANS,
  SLOGAN_POSITIONS,
  ANIMATION_TIMING,
  WHITE_TEXT_POSITIONS,
  ANIMATION_KEYFRAMES,
} from "./animations";

export default function MainBannerSection() {
  const [animationKey, setAnimationKey] = useState(0);

  // 컴포넌트 마운트 시 애니메이션 재시작
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, []);

  return (
    <section
      key={animationKey}
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
      <div className="flex flex-col items-center justify-center min-h-screen px-8 pt-60 pb-20">
        <div
          className="flex flex-col items-center relative"
          style={{ perspective: "1000px" }}
        >
          {/* 애니메이션 슬로건들 - 흐릿하게 나타났다 사라짐 */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {SLOGANS.map((slogan, index) => (
              <div
                key={index}
                className={`absolute whitespace-nowrap text-[length:var(--text-12)] text-white/60 ${jalnan.className}`}
                style={{
                  top: SLOGAN_POSITIONS[index].top,
                  left: SLOGAN_POSITIONS[index].left,
                  right: SLOGAN_POSITIONS[index].right,
                  animation: `fadeSlogan ${ANIMATION_TIMING.sloganDuration}s linear forwards`,
                  animationDelay: `${index * ANIMATION_TIMING.sloganDelay}s`,
                  transformStyle: "preserve-3d",
                  opacity: 0,
                  visibility: "hidden",
                  willChange: "transform, opacity, filter",
                }}
              >
                {slogan}
              </div>
            ))}
          </div>

          {/* 메인 슬로건 - JOYIN 로고 애니메이션 */}
          <h1
            key={animationKey}
            className={`${jalnan.className} text-[100px] leading-[140px] tracking-[-2px] text-center relative`}
            style={{ height: "140px" }}
          >
            {/* JOY - 중앙에서 오른쪽으로 이동 */}
            <span
              className="absolute left-1/2 text-primary inline-block opacity-0"
              style={{
                animation: `splitJOY ${ANIMATION_TIMING.joyinDuration}s ease-out forwards`,
                animationDelay: `${ANIMATION_TIMING.joyinStart}s`,
              }}
            >
              JOY
            </span>

            {/* IN - 중앙에서 왼쪽으로 이동 */}
            <span
              className="absolute left-1/2 text-primary inline-block opacity-0"
              style={{
                animation: `splitIN ${ANIMATION_TIMING.joyinDuration}s ease-out forwards`,
                animationDelay: `${ANIMATION_TIMING.joyinStart}s`,
              }}
            >
              IN
            </span>

            {/* JO - 왼쪽에 페이드인 */}
            <span
              className="absolute text-white inline-block opacity-0"
              style={{
                animation: `fadeInLeft ${ANIMATION_TIMING.whiteTextDuration}s ease-out forwards`,
                animationDelay: `${ANIMATION_TIMING.whiteTextStart}s`,
                left: WHITE_TEXT_POSITIONS.jo,
              }}
            >
              JO
            </span>

            {/* US - IN 뒤에 페이드인 */}
            <span
              className="absolute text-white inline-block opacity-0"
              style={{
                animation: `fadeInStatic ${ANIMATION_TIMING.whiteTextDuration}s ease-out forwards`,
                animationDelay: `${ANIMATION_TIMING.whiteTextStart}s`,
                left: WHITE_TEXT_POSITIONS.us,
              }}
            >
              {" "}
              US,
            </span>

            {/* EN - 가운데 페이드인 */}
            <span
              className="absolute text-white inline-block opacity-0"
              style={{
                animation: `fadeInStatic ${ANIMATION_TIMING.whiteTextDuration}s ease-out forwards`,
                animationDelay: `${ANIMATION_TIMING.whiteTextStart}s`,
                left: WHITE_TEXT_POSITIONS.en,
              }}
            >
              {" "}
              EN
            </span>

            {/* US - 오른쪽에 페이드인 */}
            <span
              className="absolute text-white inline-block opacity-0"
              style={{
                animation: `fadeInRight ${ANIMATION_TIMING.whiteTextDuration}s ease-out forwards`,
                animationDelay: `${ANIMATION_TIMING.whiteTextStart}s`,
                left: WHITE_TEXT_POSITIONS.lastUs,
              }}
            >
              {" "}
              US
            </span>
          </h1>

          {/* 부제 */}
          <p
            className={`text-[length:var(--text-12)] font-bold text-[color:var(--color-deep)] mb-[140px] ${jalnan.className}`}
            style={{
              animation: `fadeInStatic ${ANIMATION_TIMING.whiteTextDuration}s ease-out forwards`,
              animationDelay: `${ANIMATION_TIMING.subtitleStart}s`,
              opacity: 0,
            }}
          >
            함께 성장하고, 함께 만들어가는 커뮤니티
          </p>

          {/* 버튼 그룹 */}
          <div
            style={{
              animation: `fadeInStatic ${ANIMATION_TIMING.whiteTextDuration}s ease-out forwards`,
              animationDelay: `${ANIMATION_TIMING.buttonStart}s`,
              opacity: 0,
            }}
          >
            <MainPageButton />
          </div>
        </div>
      </div>

      {/* 애니메이션 스타일 */}
      <style jsx>{ANIMATION_KEYFRAMES}</style>
    </section>
  );
}
