'use client'

import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react'
import Dropdown from '@/components/common/input/Dropdown'
import { useDropdownStore } from '@/store/dropdown-store'
import {
  useRegisterProjectStore,
  type FormData,
} from '@/store/register-project-store'
import FormCard, { CARD_STYLES } from './FormCard'
import { supabase } from '@/lib/supabase'

interface BaseFormProps {
  onSubmit?: (data: FormData) => void
}

export interface BaseFormRef {
  validate: () => boolean
  getData: () => FormData
}

const BaseForm = forwardRef<BaseFormRef, BaseFormProps>(({ onSubmit }, ref) => {
  const { formData, errors, updateField, validateForm } =
    useRegisterProjectStore()

  const { selectedValues } = useDropdownStore()
  const [fields, setFields] = useState<string[]>([])
  const [loadingFields, setLoadingFields] = useState(true)

  useEffect(() => {
    const fetchFields = async () => {
      const { data, error } = await supabase.from('fields').select('name')
      if (error) {
        console.error('도메인 조회 실패:', error)
        setFields([])
      } else {
        setFields(data.map((d) => d.name))
      }
      setLoadingFields(false)
    }
    fetchFields()
  }, [])

  // Dropdown 선택 값을 formData와 동기화
  useEffect(() => {
    const categoryValue = selectedValues['분야']
    if (categoryValue) {
      updateField('category', categoryValue)
    }
  }, [selectedValues, updateField])

  // ref를 통해 외부에서 접근할 수 있는 함수들 노출
  useImperativeHandle(ref, () => ({
    validate: validateForm,
    getData: () => formData,
  }))

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    updateField(field, value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit?.(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '130px' }}>
        {/* 프로젝트 이름 카드 */}
        <FormCard
          title="프로젝트 이름"
          description="한 눈에 알아볼 수 있는 이름으로 지어주세요!"
          errorMessage={errors.projectName}
          helpMessage="최대 30자까지 가능합니다"
        >
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
            placeholder="예) AI 기반 헬스케어 앱 개발"
            maxLength={30}
            className={CARD_STYLES.input}
            style={CARD_STYLES.inputStyle}
          />
        </FormCard>

        {/* 분야 카드 */}
        <FormCard
          title="분야"
          description="어떤 분야의 프로젝트 인가요?"
          errorMessage={errors.category}
          helpMessage="가장 가까운 분야를 선택해주세요"
        >
          <div className="w-[571px] h-[90px] ml-[50px] mt-[30px] [&>div]:!w-[571px] [&>div>button]:!h-[90px] [&>div>button]:!pl-[30px] [&>div>button]:!pt-[26px] [&>div>button]:!pb-[27px]">
            <Dropdown
              options={loadingFields ? ['불러오는 중...'] : fields}
              placeholder="분야"
            />
          </div>
        </FormCard>

        {/* 모집 마감 카드 */}
        <FormCard
          title="모집 마감"
          description="언제까지 모집을 마감할까요?"
          errorMessage={errors.deadline}
          helpMessage="오늘 이후 날짜를 선택해주세요"
        >
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => handleInputChange('deadline', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={`${CARD_STYLES.input} pr-[40px]`}
            style={CARD_STYLES.inputStyle}
          />
        </FormCard>

        {/* 프로젝트 간단 소개 카드 */}
        <FormCard
          title="프로젝트 간단 소개"
          description="한 줄로 매력을 어필해보세요!"
          errorMessage={errors.description}
          helpMessage="10 ~ 100자 이내 입력 가능합니다"
        >
          <input
            type="text"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="이 프로젝트는 ~하는 것을 목표로 합니다."
            maxLength={100}
            className={CARD_STYLES.input}
            style={CARD_STYLES.inputStyle}
          />
        </FormCard>
      </div>
    </form>
  )
})

BaseForm.displayName = 'BaseForm'

export default BaseForm
