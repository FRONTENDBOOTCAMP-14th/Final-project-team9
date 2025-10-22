import Image from "next/image";
import MainPageProjectCard from "@/components/common/project-card/MainPageProjectCard";
import { jalnan } from "@/fonts";
import { supabase } from "@/lib/supabase";
import type { ProjectCard } from "@/types/project";
import type { StatCardData } from "./types";

// 통계 카드 데이터
const statsData: StatCardData[] = [
  {
    icon: "/assets/user.svg",
    alt: "사용자 아이콘",
    value: "1200+",
    label: "사용자",
  },
  {
    icon: "/assets/pencil.svg",
    alt: "프로젝트 아이콘",
    value: "240+",
    label: "진행 중인 프로젝트",
  },
  {
    icon: "/assets/medal.svg",
    alt: "완성 프로젝트 아이콘",
    value: "700+",
    label: "완성된 프로젝트",
  },
];

// Supabase에서 랜덤으로 4개의 프로젝트를 가져오는 함수
async function fetchRandomProjects(): Promise<ProjectCard[]> {
  try {
    // 1. 전체 프로젝트 수 확인
    const { count } = await supabase
      .from("project_view")
      .select("*", { count: "exact", head: true });

    if (!count || count === 0) return [];

    // 2. 랜덤 오프셋 계산 (최대 4개까지만)
    const limit = Math.min(4, count);
    const maxOffset = Math.max(0, count - limit);
    const randomOffset = Math.floor(Math.random() * (maxOffset + 1));

    // 3. 랜덤 오프셋으로 프로젝트 조회
    const { data: projects } = await supabase
      .from("project_view")
      .select("*")
      .range(randomOffset, randomOffset + limit - 1);

    if (!projects?.length) return [];

    const projectIds = projects.map((p) => String(p.id));
    const ownerIds = [...new Set(projects.map((p) => p.owner_id))];
    const fieldIds = [...new Set(projects.map((p) => p.field_id))];

    // 4. 관련 데이터 조회
    const { data: owners } = await supabase
      .from("users")
      .select("id, nickname, profile_image, career_id")
      .in("id", ownerIds);

    const careerIds = [
      ...new Set(owners?.map((o) => o.career_id).filter(Boolean)),
    ];
    const { data: careers } = await supabase
      .from("careers")
      .select("id, name")
      .in("id", careerIds);

    const { data: positions } = await supabase
      .from("project_positions")
      .select("project_id, recruit_count")
      .in("project_id", projectIds);

    const { data: techLinks } = await supabase
      .from("project_tech_stacks")
      .select("project_id, tech_stack_id")
      .in("project_id", projectIds);

    const techStackIds = [
      ...new Set(techLinks?.map((t) => t.tech_stack_id).filter(Boolean)),
    ];
    const { data: techStacks } = await supabase
      .from("tech_stacks")
      .select("id, name")
      .in("id", techStackIds);

    const { data: fields } = await supabase
      .from("fields")
      .select("id, name")
      .in("id", fieldIds);

    // 5. 데이터 매핑
    const mappedResults: ProjectCard[] = projects.map((p) => {
      const owner = owners?.find((o) => o.id === p.owner_id);
      const careerName =
        careers?.find((c) => c.id === owner?.career_id)?.name ?? "경력 없음";
      const memberCount =
        positions
          ?.filter((pos) => String(pos.project_id) === String(p.id))
          .reduce((sum, pos) => sum + (pos.recruit_count ?? 0), 0) ?? 0;

      const skills =
        techLinks
          ?.filter((t) => String(t.project_id) === String(p.id))
          .map((t) => {
            const tech = techStacks?.find((ts) => ts.id === t.tech_stack_id);
            return tech?.name ?? "";
          })
          .filter(Boolean) ?? [];

      const fieldName =
        fields?.find((f) => f.id === p.field_id)?.name ?? "기타";

      // 모집 기간 포맷팅: created_at ~ deadline
      const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}.${day}`;
      };

      const periodFormatted =
        p.created_at && p.deadline
          ? `${formatDate(p.created_at)}~${formatDate(p.deadline)}`
          : p.deadline || "";

      return {
        id: p.id,
        title: p.name,
        description: p.short_description,
        owner: owner?.nickname || "익명",
        profile_image: owner?.profile_image || "/assets/no-profile.svg",
        level: careerName,
        members: memberCount,
        period: periodFormatted,
        duration: p.expected_schedule,
        skills,
        remain: 0,
        category: fieldName,
        position: p.position,
        status: p.status || "모집중",
      };
    });

    return mappedResults;
  } catch (err) {
    console.error("랜덤 프로젝트 조회 오류:", err);
    return [];
  }
}

export default async function ProjectSection() {
  const projectsData = await fetchRandomProjects();
  return (
    <section
      className="bg-[#E9fbff] py-[100px]"
      aria-labelledby="project-section-heading"
    >
      <div className="max-w-[1920px] mx-auto px-8">
        <h2
          id="project-section-heading"
          className={`text-center text-[length:var(--text-12)] font-bold text-[color:var(--color-primary)] mt-[150px] mb-[30px] ${jalnan.className}`}
        >
          진행중인 프로젝트
        </h2>
        <p className="text-center text-[length:var(--text-6)] text-[color:var(--color-deep)] mb-[80px]">
          현재 진행중인 프로젝트를 만나보세요.
        </p>

        {/* 통계 카드 */}
        <div
          className="flex justify-center gap-[180px] mb-[57px]"
          role="list"
          aria-label="프로젝트 통계"
        >
          {statsData.map((stat, index) => (
            <article
              key={index}
              className="bg-white rounded-[20px] w-[300px] h-[200px] flex flex-col items-center pt-[27px]"
              role="listitem"
            >
              <div className="flex items-center justify-center w-[43px] h-[43px] mb-[16px]">
                <Image
                  src={stat.icon}
                  alt={stat.alt}
                  width={43}
                  height={43}
                  className="object-contain"
                />
              </div>
              <p
                className="text-[length:var(--text-12)] font-bold text-[color:var(--color-primary)]"
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </p>
              <p className="text-[length:var(--text-6)] text-[color:var(--color-deep)]">
                {stat.label}
              </p>
            </article>
          ))}
        </div>

        {/* 프로젝트 카드 그리드 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-[30px] gap-y-[30px] max-w-[2100px] mx-auto"
          role="list"
          aria-label="프로젝트 목록"
        >
          {projectsData.map((project) => (
            <MainPageProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
