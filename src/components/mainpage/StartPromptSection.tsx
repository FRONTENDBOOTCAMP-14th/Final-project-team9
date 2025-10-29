import Image from "next/image";
import { jalnan } from "@/fonts";

export default function StartPromptSection() {
  return (
    <section
      className="relative bg-deep py-[150px]"
      aria-labelledby="start-prompt-heading"
    >
      <div className="max-w-[1920px] mx-auto px-8">
        {/* 중앙 배경 이미지 */}
        <div
          className="flex items-center justify-center pointer-events-none drop-shadow-[6px_6px_30px_#ffffff]"
          aria-hidden="true"
        >
          <Image
            src="/assets/joyin-bg.png"
            alt=""
            width={1620}
            height={780}
            className="rounded-[40px] w-auto h-auto"
            quality={100}
          />
        </div>

        {/* 컨텐츠 - 이미지 위에 겹침 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2
              id="start-prompt-heading"
              className={`text-white text-[80px] mb-[50px] ${jalnan.className}`}
            >
              지금 바로 시작해보세요!
            </h2>
            <p className="text-[length:var(--text-7)] text-[color:var(--color-deep)] leading-relaxed">
              상상하고 있는 아이디어를 사람들과 함께 제작하거나,
              <br />
              흥미로운 주제의 프로젝트에 참여해보세요!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
