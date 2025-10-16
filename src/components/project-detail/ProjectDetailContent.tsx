"use client";

import type { ReactNode } from "react";
import type { ProjectDetail } from "@/types/project";

interface ProjectDetailContentProps {
  project: ProjectDetail;
  applyButton?: ReactNode;
}

export default function ProjectDetailContent({
  project,
  applyButton,
}: ProjectDetailContentProps) {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-8 py-12">
      <div className="max-w-[1620px] mx-auto">
        {/* 상단: 왼쪽(기술스택 + 요구사항/우대사항) + 오른쪽(주최자 + 지원버튼) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* 왼쪽 컬럼 (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* 기술 스택 */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-deep mb-4">
                기술 스택 🚀
              </h2>
              <div className="flex flex-wrap gap-3">
                {/* Supabase에서 가져올 내용 */}
                <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
                  react
                </span>
                <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
                  Next
                </span>
                <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
                  JS
                </span>
                <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
                  tw
                </span>
                <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
                  spring
                </span>
              </div>
            </section>

            {/* 요구사항 + 우대사항 */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-deep mb-6">요구사항 📋</h2>
              <div className="space-y-4 mb-8">
                {/* 오프라인 가능한 사람 */}
                <div>
                  <h3 className="text-lg font-semibold text-deep mb-2">
                    • 오프라인 가능한 사람
                  </h3>
                  <p className="text-gray-700 ml-4">
                    {/* Supabase에서 가져올 내용 */}주 1회 오프라인 미팅이
                    가능한 분
                  </p>
                </div>

                {/* git 사용 필수 */}
                <div>
                  <h3 className="text-lg font-semibold text-deep mb-2">
                    • git 사용 필수
                  </h3>
                  <p className="text-gray-700 ml-4">
                    {/* Supabase에서 가져올 내용 */}
                    협업을 위한 Git/GitHub 사용 필수
                  </p>
                </div>

                {/* 프로젝트 완료 의지가 있으신 분 */}
                <div>
                  <h3 className="text-lg font-semibold text-deep mb-2">
                    • 프로젝트 완료 의지가 있으신 분
                  </h3>
                  <p className="text-gray-700 ml-4">
                    {/* Supabase에서 가져올 내용 */}
                    끝까지 책임감 있게 완수할 수 있는 분
                  </p>
                </div>
              </div>

              {/* 우대사항 */}
              <div>
                <h2 className="text-2xl font-bold text-deep mb-4">
                  우대사항 ⭐
                </h2>
                <div className="flex flex-wrap gap-3">
                  {/* Supabase에서 가져올 내용 */}
                  <span className="px-4 py-2 border border-gray-300 text-deep rounded-full text-sm">
                    피그마 사용 가능
                  </span>
                  <span className="px-4 py-2 border border-gray-300 text-deep rounded-full text-sm">
                    앱 개발 경험
                  </span>
                  <span className="px-4 py-2 border border-gray-300 text-deep rounded-full text-sm">
                    next.js 사용 경험
                  </span>
                  <span className="px-4 py-2 border border-gray-300 text-deep rounded-full text-sm">
                    부트캠프 도는 관련 교육 수료
                  </span>
                  <span className="px-4 py-2 border border-gray-300 text-deep rounded-full text-sm">
                    코드 리뷰 경험
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* 오른쪽 컬럼 (1/3) - 프로젝트 주최자 + 지원 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 프로젝트 주최자 박스 */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-deep mb-6">
                프로젝트 주최자 👤
              </h2>

              {/* 프로필 정보 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden flex items-center justify-center">
                  <img
                    src="/assets/no-profile.svg"
                    alt="주최자 프로필"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-deep mb-2">
                  {project.ownerName || "지훈"}
                </h3>
                <p className="text-lg text-gray-600 mb-4">프론트엔드</p>
                <p className="text-base text-gray-500 mb-4">1년 미만</p>
                <p className="text-base text-gray-700 leading-relaxed px-2">
                  깔끔한 코드를 지향하는 개발자입니다.
                </p>

                {/* 이메일 */}
                <div className="mt-6 w-full">
                  <p className="text-sm text-gray-500 mb-2">
                    email : yamoo9@naver.com 📋
                  </p>
                </div>
              </div>
            </section>

            {/* 지원 박스 */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-deep mb-4">지원 🎉</h2>
              <p className="text-gray-600 mb-6">현재 3명 지원했습니다.</p>

              {/* 지원하기 버튼 */}
              {applyButton ? (
                applyButton
              ) : (
                <div className="text-center text-sm text-gray-500">
                  지원 버튼 영역
                </div>
              )}
            </section>
          </div>
        </div>

        {/* 하단: 프로젝트 상세 계획 (전체 너비) */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-deep mb-6">
            프로젝트 상세 계획 📝
          </h2>
          <div className="space-y-6 text-gray-700">
            {/* Supabase에서 가져올 내용 */}
            <div>
              <h3 className="text-xl font-semibold text-deep mb-3">
                [프로젝트 목표]
              </h3>
              <p className="leading-relaxed">
                AI 기반으로 사용자 취향에 맞는 주변 맛집을 추천하는 모바일
                서비스를 개발합니다. 개인화된 맛집 추천을 통해 외식 선택의
                어려움을 해결하고, 새로운 맛집 발견의 즐거움을 제공합니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-deep mb-3">
                [주요 기능]
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>- AI 맞춤 맛집 추천</li>
                <li>- 위치 기반 주변 검색</li>
                <li>- 음식 종류별 필터링</li>
                <li>- 리뷰 및 평점 시스템</li>
                <li>- 찜하기 및 방문 기록</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-deep mb-3">
                [구성 계획]
              </h3>
              <div className="space-y-2 ml-2">
                <p>1단계(1-2주): 기획 및 UI/UX 디자인</p>
                <p>2단계(3-5주): 핵심 기능 개발 (지도 API, AI 추천)</p>
                <p>3단계(6주): 테스트 및 배포</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 leading-relaxed">
                React Native와 OpenAI API를 활용하여 크로스플랫폼 앱으로
                제작합니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
