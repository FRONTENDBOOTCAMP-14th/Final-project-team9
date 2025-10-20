"use client";

import React, { useImperativeHandle, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useDropdownStore } from "@/store/dropdown-store";
import { useTeamFormStore, type TeamData } from "@/store/team-form-store";
import DomainSection from "./sections/DomainSection";
import PositionSection from "./sections/PositionSection";
import PreferencesSection from "./sections/PreferencesSection";
import RequirementsSection from "./sections/RequirementsSection";
import ScheduleSection from "./sections/ScheduleSection";
import TechStackSection from "./sections/TechStackSection";

interface TeamFormProps {
  onSubmit?: (data: TeamData) => void;
  ref?: React.Ref<TeamFormRef>;
}

export interface TeamFormRef {
  validate: () => boolean;
  getData: () => TeamData;
}

export default function TeamForm({ onSubmit: _onSubmit, ref }: TeamFormProps) {
  const {
    // 상태
    teamData,
    techStackInput,
    preferencesInput,
    errors,
    domainDropdownOpen: _domainDropdownOpen,
    scheduleDropdownOpen: _scheduleDropdownOpen,
    positionDropdownOpen: _positionDropdownOpen,

    // 액션들
    updateTeamData,
    setTechStackInput,
    setPreferencesInput,
    setError,
    clearError: _clearError,
    clearAllErrors,
    setDomainDropdownOpen: _setDomainDropdownOpen,
    setScheduleDropdownOpen: _setScheduleDropdownOpen,
    setPositionDropdownOpen: _setPositionDropdownOpen,
    addTechStack,
    removeTechStack,
    addPosition,
    removePosition,
    updatePositionRole,
    updatePositionCount,
    addRequirement,
    updateRequirement,
    addPreference,
    removePreference,
  } = useTeamFormStore();

  const { selectedValues } = useDropdownStore();
  const [domains, setDomains] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [_techStacks, setTechStacks] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: domainData, error: domainError } = await supabase
        .from("domains")
        .select("name");
      if (!domainError && domainData) setDomains(domainData.map((d) => d.name));

      const { data: positionData, error: positionError } = await supabase
        .from("positions")
        .select("name");
      if (!positionError && positionData)
        setPositions(positionData.map((p) => p.name));

      const { data: techData, error: techError } = await supabase
        .from("tech_stacks")
        .select("name");
      if (!techError && techData) setTechStacks(techData.map((t) => t.name));
    };
    void fetchData();
  }, []);

  // Dropdown 선택 값을 teamData와 동기화
  useEffect(() => {
    const domainValue = selectedValues["도메인을 선택해주세요"];
    const scheduleValue = selectedValues["예상 일정을 선택해주세요"];

    if (domainValue && domainValue !== teamData.domain) {
      updateTeamData("domain", domainValue);
    }
    if (scheduleValue && scheduleValue !== teamData.schedule) {
      updateTeamData("schedule", scheduleValue);
    }

    // 포지션 드롭다운 값들 동기화
    teamData.positions.forEach((position, index) => {
      const positionValue = selectedValues[`포지션을 선택해주세요`];
      if (positionValue && positionValue !== position.role) {
        updatePositionRole(index, positionValue);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues, teamData.domain, teamData.schedule, teamData.positions]);

  const validateForm = (): boolean => {
    // 모든 에러 초기화
    clearAllErrors();
    let isValid = true;

    // 도메인 필수 검증
    if (!teamData.domain.trim()) {
      setError("domain", "도메인을 선택해주세요");
      isValid = false;
    }

    // 예상 일정 필수 검증
    if (!teamData.schedule.trim()) {
      setError("schedule", "예상 일정을 선택해주세요");
      isValid = false;
    }

    // 기술스택 최소 1개 필수 검증
    if (teamData.techStack.length === 0) {
      setError("techStack", "기술스택을 최소 1개 이상 선택해주세요");
      isValid = false;
    }

    // 포지션 최소 1개 및 역할 입력 필수 검증
    if (teamData.positions.length === 0) {
      setError("positions", "포지션을 최소 1개 이상 추가해주세요");
      isValid = false;
    } else {
      // 각 포지션의 역할이 입력되었는지 검증
      for (let i = 0; i < teamData.positions.length; i++) {
        if (!teamData.positions[i].role.trim()) {
          setError("positions", `${i + 1}번째 포지션의 역할을 입력해주세요`);
          isValid = false;
          break;
        }
      }
    }

    return isValid;
  };

  useImperativeHandle(ref, () => ({
    validate: validateForm,
    getData: () => teamData,
  }));

  return (
    <form>
      {/* 상단 2개 카드 - 2열 그리드 */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 justify-items-center"
        style={{ gap: "130px" }}
      >
        <DomainSection domains={domains} error={errors.domain} />
        <ScheduleSection error={errors.schedule} />
      </div>

      {/* 하단 4개 카드 - 각각 전체 너비 차지 */}
      <div
        style={{ marginTop: "130px" }}
        className="space-y-[130px] flex flex-col items-center"
      >
        <TechStackSection
          techStack={teamData.techStack}
          techStackInput={techStackInput}
          error={errors.techStack}
          onInputChange={setTechStackInput}
          onAddTechStack={addTechStack}
          onRemoveTechStack={removeTechStack}
        />

        <PositionSection
          positions={teamData.positions}
          availablePositions={positions}
          error={errors.positions}
          onAddPosition={addPosition}
          onRemovePosition={removePosition}
          onUpdateRole={updatePositionRole}
          onUpdateCount={updatePositionCount}
        />

        <RequirementsSection
          requirements={teamData.requirements}
          onAddRequirement={addRequirement}
          onUpdateRequirement={updateRequirement}
        />

        <PreferencesSection
          preferences={teamData.preferences}
          preferencesInput={preferencesInput}
          onInputChange={setPreferencesInput}
          onAddPreference={addPreference}
          onRemovePreference={removePreference}
        />
      </div>
    </form>
  );
}
