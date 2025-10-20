import { supabase } from "@/lib/supabase";
import type { ProjectCard } from "@/types/project";

export async function fetchProjects(
  searchQuery: string = "",
): Promise<ProjectCard[]> {
  try {
    // 1️⃣ 프로젝트 기본 정보 가져오기
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .ilike("name", `%${searchQuery}%`);

    if (projectsError) throw projectsError;
    if (!projects?.length) return [];

    const projectIds = projects.map((p) => String(p.id));
    const ownerIds = [...new Set(projects.map((p) => p.owner_id))];
    const fieldIds = [...new Set(projects.map((p) => p.field_id))];

    const { data: owners } = await supabase
      .from("users")
      .select("id, nickname, profile_image, career_id")
      .in("id", ownerIds);

    const careerIds = [...new Set(owners?.map((o) => o.career_id))];
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

    const techStackIds = [...new Set(techLinks?.map((t) => t.tech_stack_id))];
    const { data: techStacks } = await supabase
      .from("tech_stacks")
      .select("id, name")
      .in("id", techStackIds);

    const { data: fields } = await supabase
      .from("fields")
      .select("id, name")
      .in("id", fieldIds);

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
            return tech?.name ?? "알 수 없음";
          }) ?? [];

      const fieldName =
        fields?.find((f) => f.id === p.field_id)?.name ?? "기타";

      return {
        id: p.id,
        title: p.name,
        description: p.short_description,
        owner: owner?.nickname || "",
        profile_image: owner?.profile_image || "/assets/no-profile.svg",
        level: careerName,
        members: memberCount,
        period: p.deadline,
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
    console.error("프로젝트 조회 오류:", err);
    return [];
  }
}
