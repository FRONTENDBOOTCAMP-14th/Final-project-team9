'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import BaseForm, {
  type BaseFormRef,
} from '@/components/register-project/BaseForm'
import DetailForm, {
  type DetailFormRef,
} from '@/components/register-project/DetailForm'
import Stepbar from '@/components/register-project/StepBar'
import TeamForm, {
  type TeamFormRef,
} from '@/components/register-project/TeamForm'
import { supabase } from '@/lib/supabase'

export default function RegisterProjectClient() {
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()
  const baseFormRef = useRef<BaseFormRef>(null)
  const teamFormRef = useRef<TeamFormRef>(null)
  const detailFormRef = useRef<DetailFormRef>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegisterProject = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const baseData = baseFormRef.current!.getData()
      const teamData = teamFormRef.current!.getData()
      const detailData = detailFormRef.current!.getData()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        alert('로그인이 필요합니다.')
        setIsSubmitting(false)
        return
      }

      const fieldMap: Record<string, number> = {
        '웹 개발': 1,
        '모바일 앱': 2,
        '시스템': 3,
        '게임': 4,
        '기타': 5,
      }

      const domainMap: Record<string, number> = {
        이커머스: 1,
        sns: 2,
        게임: 3,
        유틸: 4,
        커뮤니티: 5,
        기타: 6,
      }

      const scheduleMap: Record<string, number> = {
        '1개월': 1,
        '3개월': 2,
        '6개월': 3,
        '1년': 4,
        '1년 이상': 5,
      }

      const fieldId = domainMap[baseData.category] // integer
      const domainId = domainMap[teamData.domain] // integer
      const scheduleId = scheduleMap[teamData.schedule] // integer

      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert([
          {
            owner_id: user.id,
            name: baseData.projectName,
            field_id: fieldId,
            deadline: baseData.deadline,
            short_description: baseData.description,
            domain_id: domainId,
            expected_schedule: scheduleId,
            detail_plan: detailData.plan,
          },
        ])
        .select()
        .single()

      if (projectError) throw projectError
      const projectId = project.id

      if (teamData.techStack.length > 0) {
        const techStacks = teamData.techStack.map((stackId) => ({
          project_id: projectId,
          tech_stack_id: Number(stackId),
        }))
        await supabase.from('project_tech_stacks').insert(techStacks)
      }

      if (teamData.positions.length > 0) {
        const positions = teamData.positions.map((pos) => ({
          project_id: projectId,
          position_name: pos.role,
          recruit_count: pos.count,
        }))
        await supabase.from('project_positions').insert(positions)
      }

      if (teamData.requirements.length > 0) {
        const requirements = teamData.requirements.map((req) => ({
          project_id: projectId,
          content: req,
        }))
        await supabase.from('project_requirements').insert(requirements)
      }

      if (teamData.preferences.length > 0) {
        const preferences = teamData.preferences.map((pref) => ({
          project_id: projectId,
          content: pref,
        }))
        await supabase.from('project_preferences').insert(preferences)
      }

      alert('프로젝트가 성공적으로 등록되었습니다!')
      router.push('/register-project/complete')
    } catch (error) {
      console.error('프로젝트 등록 실패:', error)
      alert('프로젝트 등록에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    let canProceed = false
    console.log('Current Step:', currentStep)
    console.log('BaseForm valid:', baseFormRef.current?.validate())
    console.log('TeamForm valid:', teamFormRef.current?.validate())
    console.log('DetailForm valid:', detailFormRef.current?.validate())

    switch (currentStep) {
      case 1:
        canProceed = baseFormRef.current?.validate() ?? false
        break
      case 2:
        canProceed = teamFormRef.current?.validate() ?? false
        break
      case 3:
        canProceed = detailFormRef.current?.validate() ?? false
        // 마지막 단계에서 등록 완료 시 완료 페이지로 이동
        if (canProceed) {
          handleRegisterProject()
          return
        }
        break
    }

    if (canProceed && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  // const renderStepContent = () => {
  //   switch (currentStep) {
  //     case 1:
  //       return <BaseForm ref={baseFormRef} onSubmit={() => {}} />
  //     case 2:
  //       return <TeamForm ref={teamFormRef} onSubmit={() => {}} />
  //     case 3:
  //       return <DetailForm ref={detailFormRef} onSubmit={() => {}} />
  //     default:
  //       return null
  //   }
  // }

  return (
    <>
      {/* 스텝바 영역 - 555px 여백 */}
      <div className="px-[555px]">
        <Stepbar currentStep={currentStep} />
      </div>

      {/* 폼 영역 - 224px 여백 */}
      <div className="pb-20 px-[224px] mt-[160px]">
        {/* {renderStepContent()} */}
        <div className={currentStep === 1 ? '' : 'hidden'}>
          <BaseForm ref={baseFormRef} onSubmit={() => {}} />
        </div>

        {/* TeamForm */}
        <div className={currentStep === 2 ? '' : 'hidden'}>
          <TeamForm ref={teamFormRef} onSubmit={() => {}} />
        </div>

        {/* DetailForm */}
        <div className={currentStep === 3 ? '' : 'hidden'}>
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
            <span>{currentStep === 3 ? '등록' : '다음 단계'}</span>
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
  )
}
