import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="bg-[#1a1a1a] text-white w-full h-[351px]"
      role="contentinfo"
      aria-label="사이트 푸터"
    >
      <div className="w-full max-w-[1920px] mx-auto px-8 h-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex justify-between items-start">
            {/* 왼쪽 로고 및 정보 섹션 */}
            <div className="flex-1">
              <div className="flex items-center mb-8">
                <Image
                  src="/assets/footer-logo.svg"
                  alt="Joyin 로고"
                  width={127}
                  height={42}
                  className="mr-4"
                />
              </div>

              <address className="space-y-2 text-[length:var(--text-4)] text-[#e4e4e4] not-italic">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div>
                    <p>상호명 : Joyin</p>
                    <p>주소 : 경기도 성남시 분당구</p>
                  </div>
                  <div>
                    <p>대표 : 남도현</p>
                    <p>사업자 번호 : 010 2367 7688</p>
                  </div>
                  <div>
                    <p>
                      <a
                        href="mailto:dohy0709@naver.com"
                        className="underline hover:text-gray-300 transition-colors"
                        aria-label="이메일 문의하기"
                      >
                        dohy0709@naver.com
                      </a>
                    </p>
                  </div>
                </div>
              </address>

              <div className="flex justify-between items-center mt-6 text-[length:var(--text-5)] text-[#ffffff]">
                <nav aria-label="푸터 링크">
                  <ul className="flex gap-8 list-none">
                    <li>
                      <a
                        href="/terms"
                        className="hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
                      >
                        이용약관
                      </a>
                    </li>
                    <li>
                      <a
                        href="/privacy"
                        className="hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
                      >
                        개인정보처리방침
                      </a>
                    </li>
                  </ul>
                </nav>
                <p className="text-[#ffffff]">
                  Copyright © 2025 9in구직. All rights reserved
                </p>
              </div>
            </div>

            {/* 오른쪽 깃허브 아이콘 */}
            <div className="flex items-center">
              <a
                href="https://github.com/FRONTENDBOOTCAMP-14th/Final-project-team9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
                aria-label="GitHub 저장소 방문하기 (새 창에서 열림)"
              >
                <Image
                  src="/assets/github.svg"
                  alt=""
                  width={40}
                  height={40}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
