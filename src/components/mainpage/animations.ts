// 서브 슬로건 위치 정보
export const SLOGAN_POSITIONS = [
  { top: "-100px", left: "38%", transform: "translateX(-50%)" }, // 상단 왼쪽으로 치우침
  { top: "40px", left: "1%", transform: "translateX(0)" }, // 좌측 상단 끝쪽
  { top: "160px", right: "20%", transform: "translateX(0)" }, // 우측 중간 살짝 아래
  { top: "250px", left: "1%", transform: "translateX(0)" }, // 좌측 하단 끝
  { top: "50px", right: "10%", transform: "translateX(0)" }, // 우측 상단 중간쯤
];

// 애니메이션 타이밍 상수
export const ANIMATION_TIMING = {
  sloganDuration: 2.5, // 서브 슬로건 애니메이션 지속 시간 (초)
  sloganDelay: 1.5, // 서브 슬로건 간격 (초)
  joyinStart: 8.5, // JOYIN 시작 시간 (초)
  joyinDuration: 3, // JOYIN 분리 애니메이션 지속 시간 (초)
  whiteTextStart: 11.5, // 흰색 글자 시작 시간 (초)
  whiteTextDuration: 1, // 흰색 글자 페이드인 지속 시간 (초)
  subtitleStart: 12, // 서브타이틀 시작 시간 (초)
  buttonStart: 12.3, // 버튼 시작 시간 (초)
} as const;

// 슬로건 텍스트
export const SLOGANS = [
  "Join 하세요, Joy 가 기다립니다",
  "함께 성장하고, 함께 만들어가는 커뮤니티",
  "세상의 모든 즐거움을 연결하다",
  "Join에서 시작해 Joy로 완성하다",
  "Join the fun, Joyin with us!",
];

// 흰색 글자 위치
export const WHITE_TEXT_POSITIONS = {
  jo: "calc(50% - 500px)",
  us: "calc(50% - 220px)",
  en: "calc(50% - 23px)",
  lastUs: "calc(50% + 350px)",
} as const;

// 애니메이션 keyframes CSS
export const ANIMATION_KEYFRAMES = `
  /* 서브 슬로건 페이드인/아웃 애니메이션 
   * 작게 흐릿하게 나타나서 → 선명하게 커지고 → 다시 크게 흐려지며 사라짐
   * 사용: 5개의 서브 슬로건이 순차적으로 등장/사라질 때
   */
  @keyframes fadeSlogan {
    /* 0-30%: 페이드인 (작고 흐림 → 크고 선명) */
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
    /* 30-46%: 선명하게 유지하며 서서히 커짐 */
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
    /* 46-100%: 페이드아웃 (계속 커지며 흐려짐) */
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

  /* JOYIN의 'JOY' 분리 애니메이션
   * 중앙에서 부드럽게 나타나 → 잠시 머물다 → 오른쪽으로 이동
   * 사용: JOYIN 로고가 분리될 때 JOY 부분
   */
  @keyframes splitJOY {
    /* 0-40%: 페이드인 (작게 시작 → 정상 크기) */
    0% {
      opacity: 0;
      left: 50%;
      transform: translateX(-100%) scale(0.80);
    }
    40% {
      opacity: 1;
      left: 50%;
      transform: translateX(-100%) scale(1);
    }
    /* 40-60%: 중앙에 잠시 머무름 */
    60% {
      opacity: 1;
      left: 50%;
      transform: translateX(-100%) scale(1);
    }
    /* 60-100%: 오른쪽으로 이동 */
    100% {
      opacity: 1;
      left: calc(50% + 120px);
      transform: translateX(0) scale(1);
    }
  }

  /* JOYIN의 'IN' 분리 애니메이션
   * 중앙에서 부드럽게 나타나 → 잠시 머물다 → 왼쪽으로 이동
   * 사용: JOYIN 로고가 분리될 때 IN 부분
   */
  @keyframes splitIN {
    /* 0-40%: 페이드인 (작게 시작 → 정상 크기) */
    0% {
      opacity: 0;
      left: 50%;
      transform: translateX(0) scale(0.80);
    }
    40% {
      opacity: 1;
      left: 50%;
      transform: translateX(0) scale(1);
    }
    /* 40-60%: 중앙에 잠시 머무름 */
    60% {
      opacity: 1;
      left: 50%;
      transform: translateX(0) scale(1);
    }
    /* 60-100%: 왼쪽으로 이동 */
    100% {
      opacity: 1;
      left: calc(50% - 360px);
      transform: translateX(0) scale(1);
    }
  }

  /* 기본 페이드인 애니메이션
   * 투명 → 불투명
   * 사용: 흰색 텍스트(JO, US, EN, US), 서브타이틀, 버튼
   */
  @keyframes fadeInStatic {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* 왼쪽 요소 페이드인 (현재는 fadeInStatic과 동일)
   * 사용: 'JO' 텍스트
   */
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* 오른쪽 요소 페이드인 (현재는 fadeInStatic과 동일)
   * 사용: 마지막 'US' 텍스트
   */
  @keyframes fadeInRight {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
