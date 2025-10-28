import { useEffect, useState, KeyboardEvent } from 'react'
import { supabase } from '@/lib/supabase'
import TechStackSearchBar from '@/components/common/search-bar/TechStackSearchBar'
import TagList from '@/components/common/tag/TagList'
import FormCard from '../FormCard'

interface TechStackSectionProps {
  techStack: string[]
  techStackInput: string
  error?: string
  onInputChange: (value: string) => void
  onAddTechStack: (tech: string) => void
  onRemoveTechStack: (tech: string) => void
}

const MAX_STACK_COUNT = 10

export default function TechStackSection({
  techStack,
  techStackInput,
  error,
  onInputChange,
  onAddTechStack,
  onRemoveTechStack,
}: TechStackSectionProps) {
  const [allStacks, setAllStacks] = useState<string[]>([])
  const [filteredStacks, setFilteredStacks] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const fetchTechStacks = async () => {
      const { data, error } = await supabase.from('tech_stacks').select('name')
      if (!error && data) {
        setAllStacks(data.map((item) => item.name))
      }
    }
    void fetchTechStacks()
  }, [])

  useEffect(() => {
    if (techStackInput.trim() === '') {
      setFilteredStacks([])
      setActiveIndex(-1)
      return
    }

    const filtered = allStacks.filter(
      (stack) =>
        stack.toLowerCase().includes(techStackInput.toLowerCase()) &&
        !techStack.includes(stack),
    )

    setFilteredStacks(filtered)
    setActiveIndex(-1)
  }, [techStackInput, allStacks, techStack])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredStacks.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % filteredStacks.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(
        (prev) => (prev - 1 + filteredStacks.length) % filteredStacks.length,
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0) {
        handleSelectStack(filteredStacks[activeIndex])
      } else {
        handleSelectStack(techStackInput)
      }
    } else if (e.key === 'Escape') {
      setFilteredStacks([])
    }
  }

  const handleSelectStack = (stack: string) => {
    if (!stack.trim()) return
    if (techStack.includes(stack)) return
    if (techStack.length >= MAX_STACK_COUNT) return
    onAddTechStack(stack)
    onInputChange('')
    setFilteredStacks([])
  }

  return (
    <FormCard
      title="기술 스택"
      description="프로젝트에 필요한 기술 스택을 선택해주세요!"
      errorMessage={error}
      helpMessage=""
      width="1473px"
      height="351px"
    >
      <div className="w-[1373px] ml-[50px] mt-[30px] relative">
        <TechStackSearchBar
          value={techStackInput}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          placeholder={
            techStack.length >= MAX_STACK_COUNT
              ? `최대 ${MAX_STACK_COUNT}개까지 선택 가능합니다`
              : '기술 스택 검색'
          }
          disabled={techStack.length >= MAX_STACK_COUNT}
        />
        {filteredStacks.length > 0 && (
          <div className="absolute top-full left-0 -mt-4 bg-white border border-gray-300 rounded-[10px] z-10 w-[1335px] max-h-60 overflow-y-auto">
            <ul>
              {filteredStacks.map((stack, index) => (
                <li
                  key={stack}
                  onClick={() => handleSelectStack(stack)}
                  className={`px-6 py-3 cursor-pointer text-lg ${
                    index === activeIndex ? 'bg-gray-100' : 'hover:bg-gray-100'
                  }`}
                >
                  {stack}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-[20px] ml-[10px]">
          <TagList
            items={techStack}
            removable={true}
            onRemove={onRemoveTechStack}
            tagClassName="bg-primary text-white"
            labelClassName="text-6 font-medium text-white"
          />
        </div>
      </div>
    </FormCard>
  )
}
