"use client";

import Image from "next/image";

export default function GoTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      className="fixed bottom-[50px] right-[50px] w-[80px] h-[80px] bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none flex items-center justify-center cursor-pointer"
      type="button"
    >
      <Image src="/assets/go-top.svg" alt="위로 이동" width={58} height={50} />
    </button>
  );
}
