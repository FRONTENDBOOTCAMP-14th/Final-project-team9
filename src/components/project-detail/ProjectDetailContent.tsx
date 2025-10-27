"use client";

import { useState } from "react";
import Image from "next/image";
import PreferenceTagList from "@/components/common/tag/PreferenceTagList";
import TagList from "@/components/common/tag/TagList";
import ApplyModal from "@/components/project-detail/ApplyModal";
import RecruitmentButton from "@/components/project-detail/RecruitmentButton";
import SuccessToast from "@/components/project-detail/SuccessToast";
import type { ProjectStatus } from "@/constants/project";
import { supabase } from "@/lib/supabase";
import type { ProjectDetail } from "@/types/project";

interface ProjectDetailContentProps {
  project: ProjectDetail;
  isOwner?: boolean; // 현재 사용자가 프로젝트 주최자인지
  onStatusChange?: (status: ProjectStatus) => void; // 상태 변경 콜백
}

export default function ProjectDetailContent({
  project,
  isOwner = false,
  onStatusChange,
}: ProjectDetailContentProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(project.status === "false");
  const [applicantCount, setApplicantCount] = useState(
    project.applicantCount || 0,
  );

  // 지원자 수 실시간 조회
  const fetchApplicantCount = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("applicant_count")
        .eq("id", project.id)
        .single();

      if (!error && data) {
        setApplicantCount(data.applicant_count || 0);
      }
    } catch (error) {
      console.error("지원자 수 조회 실패:", error);
    }
  };

  const handleCloseRecruitment = async () => {
    try {
      // Supabase에서 프로젝트 상태를 "false"(모집완료)로 업데이트
      const { error } = await supabase
        .from("projects")
        .update({ status: "false" })
        .eq("id", project.id);

      if (error) throw error;

      setIsClosed(true);
      setToastMessage("마감 완료 되었습니다");
      setShowToast(true);

      // 부모 컴포넌트에 상태 변경 알림
      if (onStatusChange) {
        onStatusChange("false");
      }
    } catch (error) {
      console.error("모집 마감 실패:", error);
      alert("모집 마감에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCopyEmail = async () => {
    if (!project.ownerEmail) {
      console.error("이메일 주소가 없습니다.");
      return;
    }

    try {
      await navigator.clipboard.writeText(project.ownerEmail);
      setToastMessage("이메일이 클립보드에 복사되었습니다");
      setShowToast(true);
    } catch (err) {
      console.error("이메일 복사 실패:", err);
      alert("이메일 복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto px-8 py-12">
      <div className="max-w-[1620px] mx-auto">
        {/* 상단: 왼쪽(기술스택 + 요구사항/우대사항) + 오른쪽(주최자 + 지원버튼) */}
        <div className="flex flex-col lg:flex-row gap-[30px] mb-[30px]">
          {/* 왼쪽 컬럼 - 기술스택 + 요구사항/우대사항 */}
          <div className="flex-1 w-full max-w-[1090px] space-y-[30px]">
            {/* 기술 스택 - 1090 x 241 (최소 높이) */}
            <section className="bg-white rounded-2xl shadow-lg p-13 w-full min-h-[241px]">
              <h2 className="text-4xl font-bold text-deep mb-14">
                기술 스택 <span aria-hidden="true">🚀</span>
              </h2>
              {/* project.techStack: string[] 에서 맵핑 */}
              <TagList
                items={project.techStack ?? []}
                removable={false}
                className=""
                tagClassName="bg-primary text-white"
                labelClassName="text-6 font-medium text-white"
              />
            </section>

            {/* 요구사항 + 우대사항 - 1090 x 483 (최소 높이) */}
            <section className="bg-white rounded-2xl shadow-lg p-13 w-full min-h-[483px]">
              <h2 className="text-4xl font-bold text-deep mb-6">
                요구사항 <span aria-hidden="true">📋</span>
              </h2>
              {/* project.requirements: string[] 에서 맵핑 */}
              <div className="space-y-4 mb-15">
                {project.requirements && project.requirements.length > 0 ? (
                  project.requirements.map((req, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-deep mb-2">
                        • {req}
                      </h3>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-lg">
                    등록된 요구사항이 없습니다.
                  </p>
                )}
              </div>

              {/* 우대사항 */}
              <div>
                <h2 className="text-2xl text-deep mb-8">
                  우대사항 <span aria-hidden="true">⭐</span>
                </h2>
                {/* project.preferences: string[] 에서 맵핑 */}
                {project.preferences && project.preferences.length > 0 ? (
                  <PreferenceTagList items={project.preferences} />
                ) : (
                  <p className="text-gray-500 text-lg">
                    등록된 우대사항이 없습니다.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* 오른쪽 컬럼 - 프로젝트 주최자 + 지원 */}
          <div className="w-full lg:w-[500px] space-y-[30px]">
            {/* 프로젝트 주최자 박스 - 500 x 406 */}
            <section
              className="bg-white rounded-2xl shadow-lg p-13 w-full h-[406px]"
              aria-labelledby="project-host-title"
            >
              <h2
                id="project-host-title"
                className="text-4xl font-bold text-deep mb-6"
              >
                프로젝트 주최자 <span aria-hidden="true">👤</span>
              </h2>

              {/* 프로필 정보 */}
              <div className="flex gap-6 mb-6">
                {/* 프로필 이미지 */}
                <div className="w-30 h-30 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <Image
                    src={project.ownerProfileImage || "/assets/no-profile.svg"}
                    alt={`${project.ownerName || "주최자"}의 프로필 사진`}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 정보 */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-deep mb-2">
                    {project.ownerName || "이름 없음"}
                  </h3>
                  <p className="text-xl text-gray-600 mb-1">
                    {project.ownerRole || "역할 미정"}
                  </p>
                  <p className="text-xl text-gray-400">
                    {project.ownerExperience || "경력 미정"}
                  </p>
                </div>
              </div>

              {/* 소개 */}
              {project.ownerBio && (
                <p className="text-xl text-deep font-bold leading-relaxed mt-10 mb-2">
                  {project.ownerBio}
                </p>
              )}

              {/* 이메일 */}
              {project.ownerEmail && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      void handleCopyEmail();
                    }}
                    className="text-base text-gray-500 hover:text-gray-700 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1"
                    aria-label={`${project.ownerEmail} 이메일 주소 복사`}
                    type="button"
                  >
                    email : {project.ownerEmail}
                  </button>
                  <button
                    onClick={() => {
                      void handleCopyEmail();
                    }}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    aria-label={`${project.ownerEmail} 이메일 주소 복사`}
                    type="button"
                  >
                    <span aria-hidden="true">📋</span>
                  </button>
                </div>
              )}
            </section>

            {/* 지원 박스 - 500 x 321 */}
            <section
              className="bg-white rounded-2xl shadow-lg p-13 w-full h-[321px] flex flex-col"
              aria-labelledby="apply-section-title"
            >
              <h2
                id="apply-section-title"
                className="text-4xl font-bold text-deep mb-4"
              >
                지원 <span aria-hidden="true">🎉</span>
              </h2>
              <p className="text-xl text-gray mb-6">
                현재 <strong className="font-bold">{applicantCount}명</strong>{" "}
                지원했습니다.
              </p>

              {/* 버튼 - 270 x 96, font-size: 28px, 중앙정렬, 하단마진 50px, border-radius: 20px */}
              <div className="flex justify-center mt-auto mb-[50px]">
                <RecruitmentButton
                  isClosed={isClosed}
                  isOwner={isOwner}
                  onCloseRecruitment={() => void handleCloseRecruitment()}
                  onApply={() => setIsModalOpen(true)}
                  size="small"
                />
              </div>
            </section>
          </div>
        </div>

        {/* 하단: 프로젝트 상세 계획 - 1620 width, 높이 가변 */}
        <section
          className="bg-white rounded-2xl shadow-lg p-13 w-full max-w-[1620px]"
          aria-labelledby="project-plan-title"
        >
          <h2
            id="project-plan-title"
            className="text-4xl font-bold text-deep mb-6"
          >
            프로젝트 상세 계획 <span aria-hidden="true">📝</span>
          </h2>
          {/* project.projectPlan: string 에서 맵핑 */}
          {project.projectPlan ? (
            <div className="space-y-6 text-deep whitespace-pre-wrap text-[28px] break-words">
              {project.projectPlan}
            </div>
          ) : (
            <p className="text-gray-500 text-[28px]">
              프로젝트 계획이 아직 작성되지 않았습니다.
            </p>
          )}
        </section>

        {/* 하단 버튼 - 1620 x 90, 상단 120px, 하단 207px */}
        {/* 하단 지원하기 버튼 - 1620 x 90, font-size: 36px, border-radius: 20px, 상단마진 120px, 하단마진 207px */}
        <div className="w-full max-w-[1620px] mt-[120px] mb-[207px]">
          <RecruitmentButton
            isClosed={isClosed}
            isOwner={isOwner}
            onCloseRecruitment={() => void handleCloseRecruitment()}
            onApply={() => setIsModalOpen(true)}
            size="large"
          />
        </div>
      </div>

      {/* 이메일 복사 성공 토스트 */}
      <SuccessToast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />

      {/* 지원하기 모달 */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          void (async () => {
            try {
              console.log("지원 데이터:", data);

              // Supabase에서 applicant_count 증가
              const { data: currentProject, error: fetchError } = await supabase
                .from("projects")
                .select("applicant_count")
                .eq("id", project.id)
                .single();

              if (fetchError) throw fetchError;

              const newCount = (currentProject.applicant_count || 0) + 1;

              const { error: updateError } = await supabase
                .from("projects")
                .update({ applicant_count: newCount })
                .eq("id", project.id);

              if (updateError) throw updateError;

              // 최신 지원자 수 반영
              await fetchApplicantCount();

              setIsModalOpen(false);
              setToastMessage("지원이 완료되었습니다");
              setShowToast(true);
            } catch (error) {
              console.error("지원 실패:", error);
              alert("지원에 실패했습니다. 다시 시도해주세요.");
            }
          })();
        }}
      />
    </div>
  );
}
