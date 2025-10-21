"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/common/header/Header";
import MainPageButton from "@/components/mainpage/MainPageButton";
import { jalnan } from "@/fonts";

export default function MainBannerSection() {
  const [animationKey, setAnimationKey] = useState(0);

  // 컴포넌트 마운트 시 애니메이션 재시작
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, []);

  // 애니메이션에 표시될 슬로건들
  const slogans = [
    "Join 하세요, Joy 가 기다립니다",
    "함께 성장하고, 함께 만들어가는 커뮤니티",
    "세상의 모든 즐거움을 연결하다",
    "Join에서 시작해 Joy로 완성하다",
    "Join the fun, Joyin with us!",
  ];

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
            {slogans.map((slogan, index) => {
              // 각 슬로건의 위치를 다르게 설정
              const positions = [
                { top: "-100px", left: "38%", transform: "translateX(-50%)" }, // 상단 왼쪽으로 치우침
                { top: "40px", left: "1%", transform: "translateX(0)" }, // 좌측 상단 끝쪽
                { top: "160px", right: "20%", transform: "translateX(0)" }, // 우측 중간 살짝 아래
                { top: "250px", left: "1%", transform: "translateX(0)" }, // 좌측 하단 끝
                { top: "50px", right: "10%", transform: "translateX(0)" }, // 우측 상단 중간쯤
              ];

              return (
                <div
                  key={index}
                  className={`absolute whitespace-nowrap text-[length:var(--text-12)] text-white/60 ${jalnan.className}`}
                  style={{
                    top: positions[index].top,
                    left: positions[index].left,
                    right: positions[index].right,
                    animation: `fadeSlogan 2.5s linear forwards`,
                    animationDelay: `${index * 1.5}s`,
                    transformStyle: "preserve-3d",
                    opacity: 0,
                    visibility: "hidden",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  {slogan}
                </div>
              );
            })}
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
                animation: "splitJOY 3s ease-out forwards",
                animationDelay: "8.5s",
              }}
            >
              JOY
            </span>

            {/* IN - 중앙에서 왼쪽으로 이동 */}
            <span
              className="absolute left-1/2 text-primary inline-block opacity-0"
              style={{
                animation: "splitIN 3s ease-out forwards",
                animationDelay: "8.5s",
              }}
            >
              IN
            </span>

            {/* JO - 왼쪽에 페이드인 */}
            <span
              className="absolute text-white inline-block opacity-0"
              style={{
                animation: "fadeInLeft 1s ease-out forwards",
                animationDelay: "11.5s",
                left: "calc(50% - 500px)",
              }}
            >
              JO
            </span>

            {/* US - IN 뒤에 페이드인 */}
            <span
              className="absolute text-white inline-block opacity-0"
              style={{
                animation: "fadeInStatic 1s ease-out forwards",
                animationDelay: "11.5s",
                left: "calc(50% - 220px)",
              }}
            >
              {" "}
              US,
            </span>

            {/* EN - 가운데 페이드인 */}
            <span
              className="absolute text-white inline-block opacity-0"
              style={{
                animation: "fadeInStatic 1s ease-out forwards",
                animationDelay: "11.5s",
                left: "calc(50% - 23px)",
              }}
            >
              {" "}
              EN
            </span>

            {/* US - 오른쪽에 페이드인 */}
            <span
              className="absolute text-white inline-block opacity-0"
              style={{
                animation: "fadeInRight 1s ease-out forwards",
                animationDelay: "11.5s",
                left: "calc(50% + 350px)",
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
              animation: "fadeInStatic 1s ease-out forwards",
              animationDelay: "12s",
              opacity: 0,
            }}
          >
            함께 성장하고, 함께 만들어가는 커뮤니티
          </p>

          {/* 버튼 그룹 */}
          <div
            style={{
              animation: "fadeInStatic 1s ease-out forwards",
              animationDelay: "12.3s",
              opacity: 0,
            }}
          >
            <MainPageButton />
          </div>
        </div>
      </div>

      {/* 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes fadeSlogan {
          0% {
            opacity: 0;
            transform: scale(0.85);
            filter: blur(8px);
            visibility: hidden;
          }
          8% {
            opacity: 0.15;
            transform: scale(0.88);
            filter: blur(6px);
            visibility: visible;
          }
          15% {
            opacity: 0.3;
            transform: scale(0.92);
            filter: blur(4px);
            visibility: visible;
          }
          22% {
            opacity: 0.45;
            transform: scale(0.96);
            filter: blur(2px);
            visibility: visible;
          }
          30% {
            opacity: 0.6;
            transform: scale(1);
            filter: blur(0px);
            visibility: visible;
          }
          38% {
            opacity: 0.58;
            transform: scale(1.02);
            filter: blur(0px);
            visibility: visible;
          }
          46% {
            opacity: 0.54;
            transform: scale(1.04);
            filter: blur(0.5px);
            visibility: visible;
          }
          54% {
            opacity: 0.48;
            transform: scale(1.06);
            filter: blur(1.5px);
            visibility: visible;
          }
          62% {
            opacity: 0.4;
            transform: scale(1.09);
            filter: blur(2.5px);
            visibility: visible;
          }
          70% {
            opacity: 0.32;
            transform: scale(1.12);
            filter: blur(4px);
            visibility: visible;
          }
          78% {
            opacity: 0.22;
            transform: scale(1.15);
            filter: blur(5.5px);
            visibility: visible;
          }
          86% {
            opacity: 0.12;
            transform: scale(1.19);
            filter: blur(6.5px);
            visibility: visible;
          }
          93% {
            opacity: 0.05;
            transform: scale(1.22);
            filter: blur(7.5px);
            visibility: visible;
          }
          100% {
            opacity: 0;
            transform: scale(1.25);
            filter: blur(8px);
            visibility: hidden;
          }
        }

        @keyframes fadeInFinal {
          0% {
            opacity: 0;
            transform: scale(0.7);
            filter: blur(10px);
          }
          5% {
            opacity: 0.08;
            transform: scale(0.72);
            filter: blur(9.5px);
          }
          10% {
            opacity: 0.15;
            transform: scale(0.75);
            filter: blur(9px);
          }
          15% {
            opacity: 0.23;
            transform: scale(0.78);
            filter: blur(8.5px);
          }
          20% {
            opacity: 0.3;
            transform: scale(0.8);
            filter: blur(8px);
          }
          25% {
            opacity: 0.38;
            transform: scale(0.83);
            filter: blur(7px);
          }
          30% {
            opacity: 0.45;
            transform: scale(0.85);
            filter: blur(6px);
          }
          35% {
            opacity: 0.53;
            transform: scale(0.88);
            filter: blur(5px);
          }
          40% {
            opacity: 0.6;
            transform: scale(0.9);
            filter: blur(4px);
          }
          45% {
            opacity: 0.65;
            transform: scale(0.92);
            filter: blur(3.5px);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.93);
            filter: blur(3px);
          }
          55% {
            opacity: 0.73;
            transform: scale(0.94);
            filter: blur(2.5px);
          }
          60% {
            opacity: 0.76;
            transform: scale(0.95);
            filter: blur(2px);
          }
          65% {
            opacity: 0.8;
            transform: scale(0.96);
            filter: blur(1.5px);
          }
          70% {
            opacity: 0.83;
            transform: scale(0.97);
            filter: blur(1px);
          }
          75% {
            opacity: 0.86;
            transform: scale(0.98);
            filter: blur(0.8px);
          }
          80% {
            opacity: 0.89;
            transform: scale(0.985);
            filter: blur(0.5px);
          }
          85% {
            opacity: 0.92;
            transform: scale(0.99);
            filter: blur(0.3px);
          }
          90% {
            opacity: 0.95;
            transform: scale(0.995);
            filter: blur(0.1px);
          }
          95% {
            opacity: 0.98;
            transform: scale(0.998);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }

        @keyframes splitIN {
          0% {
            opacity: 1;
            transform: translateX(150px);
          }
          40% {
            opacity: 1;
            transform: translateX(150px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes showJOYIN {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes splitJOY {
          0% {
            opacity: 0;
            left: 50%;
            transform: translateX(-100%) scale(0.95);
          }
          40% {
            opacity: 1;
            left: 50%;
            transform: translateX(-100%) scale(1);
          }
          60% {
            opacity: 1;
            left: 50%;
            transform: translateX(-100%) scale(1);
          }
          100% {
            opacity: 1;
            left: calc(50% + 120px);
            transform: translateX(0) scale(1);
          }
        }

        @keyframes splitIN {
          0% {
            opacity: 0;
            left: 50%;
            transform: translateX(0) scale(0.95);
          }
          40% {
            opacity: 1;
            left: 50%;
            transform: translateX(0) scale(1);
          }
          60% {
            opacity: 1;
            left: 50%;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 1;
            left: calc(50% - 360px);
            transform: translateX(0) scale(1);
          }
        }

        @keyframes fadeInStatic {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes fadeInLeft {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
