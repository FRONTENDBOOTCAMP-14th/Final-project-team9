import FormCard from "../FormCard";

interface PreferencesSectionProps {
  preferences: string[];
  preferencesInput: string;
  onInputChange: (value: string) => void;
  onAddPreference: (pref: string) => void;
  onRemovePreference: (pref: string) => void;
}

export default function PreferencesSection({
  preferences,
  preferencesInput,
  onInputChange,
  onAddPreference,
  onRemovePreference,
}: PreferencesSectionProps) {
  return (
    <FormCard
      title="우대 사항"
      description="있으면 더 좋을 조건이 있나요?"
      errorMessage=""
      helpMessage=""
      width="1473px"
      height={`${Math.max(405, 180 + Math.ceil(preferences.length / 5) * 120 + 80)}px`}
    >
      <div className="w-[1373px] ml-[50px] mt-[30px]">
        <input
          type="text"
          value={preferencesInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddPreference(preferencesInput);
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
        <div className="flex flex-wrap gap-2" style={{ marginTop: "30px" }}>
          {preferences.map((pref, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {pref}
              <button
                type="button"
                onClick={() => onRemovePreference(pref)}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </FormCard>
  );
}
