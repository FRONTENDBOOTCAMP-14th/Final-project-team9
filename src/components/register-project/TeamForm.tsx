"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import Dropdown from "@/components/common/input/Dropdown";
import TechStackSearchBar from "@/components/common/search-bar/TechStackSearchBar";
import { supabase } from "@/lib/supabase";
import { useDropdownStore } from "@/store/dropdown-store";
import { useTeamFormStore, type TeamData } from "@/store/team-form-store";
import FormCard from "./FormCard";

interface TeamFormProps {
  onSubmit?: (data: TeamData) => void;
}

export interface TeamFormRef {
  validate: () => boolean;
  getData: () => TeamData;
}

const TeamForm = forwardRef<TeamFormRef, TeamFormProps>(
  ({ onSubmit: _onSubmit }, ref) => {
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
        if (!domainError && domainData)
          setDomains(domainData.map((d) => d.name));

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
    }, [
      selectedValues,
      teamData.domain,
      teamData.schedule,
      teamData.positions,
    ]);

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
          <FormCard
            title="도메인"
            description="무엇을 만들 예정인가요?"
            errorMessage={errors.domain}
            helpMessage="가장 가까운 분야를 선택해주세요"
          >
            <div className="w-[571px] h-[90px] ml-[50px] mt-[30px]">
              <Dropdown
                options={domains.length ? domains : ["불러오는 중..."]}
                placeholder="도메인을 선택해주세요"
                width="571px"
                height="90px"
              />
            </div>
          </FormCard>

          <FormCard
            title="예상 일정"
            description="프로젝트는 얼마나 진행될 예정인가요?"
            errorMessage={errors.schedule}
            helpMessage="충분한 시간을 두고 정해주세요"
          >
            <div className="w-[571px] h-[90px] ml-[50px] mt-[30px]">
              <Dropdown
                options={["1개월", "3개월", "6개월", "1년", "1년 이상"]}
                placeholder="예상 일정을 선택해주세요"
                width="571px"
                height="90px"
              />
            </div>
          </FormCard>
        </div>

        {/* 하단 4개 카드 - 각각 전체 너비 차지 (1473x351) */}
        <div
          style={{ marginTop: "130px" }}
          className="space-y-[130px] flex flex-col items-center"
        >
          {/* 기술 스택 카드 */}
          <FormCard
            title="기술 스택"
            description="프로젝트에 필요한 기술 스택을 선택해주세요!"
            errorMessage={errors.techStack}
            helpMessage=""
            width="1473px"
            height="351px"
          >
            <div className="w-[1373px] ml-[50px] mt-[30px]">
              <TechStackSearchBar
                value={techStackInput}
                onChange={setTechStackInput}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTechStack(techStackInput);
                  }
                }}
                placeholder={
                  teamData.techStack.length === 0
                    ? "최대 10개까지 선택 가능합니다"
                    : undefined
                }
              />
              <div
                className="flex flex-wrap mt-3"
                style={{ marginLeft: "10px" }}
              >
                {teamData.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full"
                    style={{
                      width: "60px",
                      height: "24px",
                      marginTop: "30px",
                      marginRight: "20px",
                      marginBottom: "42px",
                      marginLeft: index === 0 ? "0px" : "20px",
                      fontSize: "var(--text-5)",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    <span className="truncate flex-1">{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechStack(tech)}
                      className="text-blue-600 hover:text-blue-800 ml-1"
                      style={{ fontSize: "12px" }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </FormCard>

          {/* 포지션 카드 */}
          <FormCard
            title="포지션"
            description="어떤 팀원이 필요한가요?"
            errorMessage={errors.positions}
            helpMessage=""
            width="1473px"
            height={`${Math.max(405, 180 + teamData.positions.length * 120 + 80)}px`}
          >
            <div className="w-[1373px] ml-[50px] mt-[30px] space-y-3">
              {teamData.positions.map((position, index) => (
                <div key={index} className="flex items-center gap-[44px]">
                  <div className="w-[848px]">
                    <Dropdown
                      options={
                        positions.length ? positions : ["불러오는 중..."]
                      }
                      placeholder={`포지션${index + 1}을 선택해주세요`}
                      width="848px"
                      height="90px"
                      onChange={(value) => updatePositionRole(index, value)}
                      value={position.role}
                    />
                  </div>
                  <div className="w-[369px] h-[90px] flex items-center border border-gray-200 rounded-lg px-[40px]">
                    <button
                      type="button"
                      onClick={() => updatePositionCount(index, -1)}
                      className="w-[30px] h-[30px] flex items-center justify-center text-gray-500 hover:text-gray-700 rounded"
                      style={{ fontSize: "18px" }}
                    >
                      −
                    </button>
                    <span
                      className="flex-1 h-full flex items-center justify-center"
                      style={{
                        fontSize: "var(--text-7)",
                        color: "var(--color-gray)",
                      }}
                    >
                      {position.count}명
                    </span>
                    <button
                      type="button"
                      onClick={() => updatePositionCount(index, 1)}
                      className="w-[30px] h-[30px] flex items-center justify-center text-gray-500 hover:text-gray-700 rounded"
                      style={{ fontSize: "18px" }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePosition(index)}
                    className="w-[30px] h-[30px] flex items-center justify-center text-gray-500 hover:text-gray-700 rounded ml-[44px]"
                    style={{ fontSize: "18px" }}
                  >
                    −
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPosition}
                className="w-full h-[50px] border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center"
              >
                + 포지션 추가
              </button>
            </div>
          </FormCard>

          {/* 요구 사항 카드 */}
          <FormCard
            title="요구 사항"
            description="팀원에게 꼭 필요한 조건이 있나요?"
            errorMessage=""
            helpMessage=""
            width="1473px"
            height={`${Math.max(405, 180 + teamData.requirements.length * 120 + 80)}px`}
          >
            <div className="w-[1373px] ml-[50px] mt-[30px] space-y-3">
              {teamData.requirements.map((req, index) => (
                <input
                  key={index}
                  type="text"
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  placeholder="요구사항을 입력해주세요"
                  className="w-full h-[90px] border border-gray-200 rounded-lg px-[30px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    fontSize: "var(--text-7)",
                    color: "var(--color-gray)",
                  }}
                />
              ))}
              <div
                className="mb-2"
                style={{
                  marginTop: "19px",
                  fontSize: "var(--text-5)",
                  color: "#dbdbdb",
                }}
              >
                선택사항이예요. 비워두셔도 괜찮아요. (최대 25자까지 가능합니다)
              </div>
              <button
                type="button"
                onClick={addRequirement}
                className="w-full h-[50px] border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center"
              >
                + 요구사항 추가
              </button>
            </div>
          </FormCard>

          {/* 우대 사항 카드 */}
          <FormCard
            title="우대 사항"
            description="있으면 더 좋을 조건이 있나요?"
            errorMessage=""
            helpMessage=""
            width="1473px"
            height={`${Math.max(405, 180 + Math.ceil(teamData.preferences.length / 5) * 120 + 80)}px`}
          >
            <div className="w-[1373px] ml-[50px] mt-[30px]">
              <input
                type="text"
                value={preferencesInput}
                onChange={(e) => setPreferencesInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addPreference(preferencesInput);
                  }
                }}
                placeholder="우대 사항을 입력해주세요"
                className="w-full h-[90px] border border-gray-200 rounded-lg px-[30px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  fontSize: "var(--text-7)",
                  color: "var(--color-gray)",
                }}
              />
              <div
                className="mb-2"
                style={{
                  marginTop: "19px",
                  fontSize: "var(--text-5)",
                  color: "#dbdbdb",
                }}
              >
                선택사항이예요. 비워두셔도 괜찮아요. (최대 15자까지 가능합니다)
              </div>
              <div
                className="flex flex-wrap gap-2"
                style={{ marginTop: "30px" }}
              >
                {teamData.preferences.map((pref, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {pref}
                    <button
                      type="button"
                      onClick={() => removePreference(pref)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </FormCard>
        </div>
      </form>
    );
  },
);

TeamForm.displayName = "TeamForm";

export default TeamForm;
