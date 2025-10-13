import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white w-[1920px] h-[351px] mx-auto">
      <div className="max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
        <div className="flex justify-between items-start">
          {/* 왼쪽 로고 및 정보 섹션 */}
          <div className="flex-1">
            <div className="flex items-center mb-8">
              <Image
                src="/assets/footer-logo.svg"
                alt="Joyin"
                width={127}
                height={42}
                className="mr-4"
              />
            </div>

            <div className="space-y-2 text-[length:var(--text-4)] text-[#e4e4e4]">
              <div className="flex gap-8">
                <div>
                  <p>상호명 : Joyin</p>
                  <p>주소 : 지구 어딘가</p>
                </div>
                <div>
                  <p>대표 : 남도현</p>
                  <p>사업자 번호 : 임자있음</p>
                </div>
                <div>
                  <p>| dohy0709@naver.com</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 text-[length:var(--text-5)] text-[#ffffff]">
              <div className="flex gap-8">
                <button className="hover:text-gray-300 transition-colors">
                  이용약관
                </button>
                <button className="hover:text-gray-300 transition-colors">
                  개인정보처리방침
                </button>
              </div>
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
              className="hover:opacity-70 transition-opacity"
            >
              <Image
                src="/assets/github.svg"
                alt="GitHub"
                width={40}
                height={40}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
