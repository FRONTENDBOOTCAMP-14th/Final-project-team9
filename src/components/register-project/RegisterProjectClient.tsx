"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import SuccessToast from "@/components/project-detail/SuccessToast";
import BaseForm, {
  type BaseFormRef,
} from "@/components/register-project/BaseForm";
import DetailForm, {
  type DetailFormRef,
} from "@/components/register-project/DetailForm";
import Stepbar from "@/components/register-project/StepBar";
import TeamForm, {
  type TeamFormRef,
} from "@/components/register-project/TeamForm";
import { supabase } from "@/lib/supabase";
import { useDetailFormStore } from "@/store/detail-form-store";
import { useDropdownStore } from "@/store/dropdown-store";
import { useRegisterProjectStore } from "@/store/register-project-store";
import { useTeamFormStore } from "@/store/team-form-store";
import { useToastStore } from "@/store/toast-store";

export default function RegisterProjectClient() {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();
  const baseFormRef = useRef<BaseFormRef>(null);
  const teamFormRef = useRef<TeamFormRef>(null);
  const detailFormRef = useRef<DetailFormRef>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  // Store reset functions
  const resetBaseForm = useRegisterProjectStore((state) => state.resetForm);
  const resetTeamForm = useTeamFormStore((state) => state.resetForm);
  const resetDetailForm = useDetailFormStore((state) => state.resetForm);
  const resetDropdown = useDropdownStore((state) => state.resetAll);

  const handleRegisterProject = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const baseData = baseFormRef.current?.getData();
      if (!baseData) return;
      const teamData = teamFormRef.current?.getData();
      if (!teamData) return;
      const detailData = detailFormRef.current?.getData();
      if (!detailData) return;

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        showToast("로그인이 필요합니다.", "error");
        setIsSubmitting(false);
        return;
      }

      // 프로젝트 등록 전에
      // 1️⃣ 마스터 테이블에서 ID 조회
      const { data: domains } = await supabase
        .from("domains")
        .select("id,name");
      const { data: fields } = await supabase.from("fields").select("id,name");
      const { data: techStacksDB } = await supabase
        .from("tech_stacks")
        .select("id,name");

      const domainId = domains?.find((d) => d.name === teamData.domain)?.id;
      const fieldId = fields?.find((f) => f.name === baseData.category)?.id;

      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert([
          {
            owner_id: user.id,
            name: baseData.projectName,
            field_id: fieldId,
            deadline: baseData.deadline,
            short_description: baseData.description,
            domain_id: domainId,
            expected_schedule: teamData.schedule,
            detail_plan: detailData.plan,
          },
        ])
        .select()
        .single();

      if (projectError) throw projectError;
      const projectId = project.id;

      if (teamData.techStack.length > 0) {
        const techStacksToInsert = await Promise.all(
          teamData.techStack.map(async (name) => {
            let stack = techStacksDB?.find((ts) => ts.name === name);
            if (!stack) {
              const { data, error } = await supabase
                .from("tech_stacks")
                .insert({ name })
                .select()
                .single();
              if (error) throw error;
              stack = data as { id: number; name: string };
            }

            return { project_id: projectId, tech_stack_id: stack.id };
          })
        );

        await supabase.from("project_tech_stacks").insert(techStacksToInsert);
      }

      if (teamData.positions.length > 0) {
        const positionsToInsert = teamData.positions.map((pos) => ({
          project_id: projectId,
          position_name: pos.role,
          recruit_count: pos.count,
        }));
        await supabase.from("project_positions").insert(positionsToInsert);
      }

      if (teamData.requirements.length > 0) {
        const requirements = teamData.requirements.map((req) => ({
          project_id: projectId,
          content: req,
        }));
        await supabase.from("project_requirements").insert(requirements);
      }

      if (teamData.preferences.length > 0) {
        const preferences = teamData.preferences.map((pref) => ({
          project_id: projectId,
          content: pref,
        }));
        await supabase.from("project_preferences").insert(preferences);
      }

      showToast("프로젝트가 성공적으로 등록되었습니다!", "success");
      setTimeout(() => {
        // 페이지 이동 전에 폼 데이터 초기화
        resetBaseForm();
        resetTeamForm();
        resetDetailForm();
        resetDropdown();
        // 등록한 프로젝트 ID를 URL 파라미터로 전달
        router.push(`/register-project/complete?projectId=${projectId}`);
      }, 1500); // Toast가 보이는 시간을 확보
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류 발생";
      showToast("프로젝트 등록 실패: " + errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    let canProceed = false;
    switch (currentStep) {
      case 1:
        canProceed = baseFormRef.current?.validate() ?? false;
        break;
      case 2:
        canProceed = teamFormRef.current?.validate() ?? false;
        break;
      case 3:
        canProceed = detailFormRef.current?.validate() ?? false;
        // 마지막 단계에서 등록 완료 시 완료 페이지로 이동
        if (canProceed) {
          void handleRegisterProject();
          return;
        }
        break;
    }

    if (canProceed && currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // 다음 단계로 넘어갈 때 페이지 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 스텝바 영역 - 555px 여백 */}
      <div className="px-[555px]">
        <Stepbar currentStep={currentStep} />
      </div>

      {/* 폼 영역 - 224px 여백 */}
      <div className="pb-20 px-[224px] mt-[160px]">
        <div className={currentStep === 1 ? "" : "hidden"}>
          <BaseForm ref={baseFormRef} onSubmit={() => {}} />
        </div>

        {/* TeamForm */}
        <div className={currentStep === 2 ? "" : "hidden"}>
          <TeamForm ref={teamFormRef} onSubmit={() => {}} />
        </div>

        {/* DetailForm */}
        <div className={currentStep === 3 ? "" : "hidden"}>
          <DetailForm ref={detailFormRef} onSubmit={() => {}} />
        </div>

        {/* 다음 버튼 */}
        <div className="flex justify-center mt-[130px]">
          <Button
            onClick={handleNext}
            variant="primary"
            size="lg"
            className="w-[270px] h-[90px] text-[length:var(--text-7)] gap-3"
          >
            <span>{currentStep === 3 ? "등록" : "다음 단계"}</span>
            {currentStep !== 3 && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
