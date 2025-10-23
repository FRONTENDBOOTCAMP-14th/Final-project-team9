import type { ProjectStatus } from "@/constants/project";
import { supabase } from "@/lib/supabase";
import type { SearchFilters } from "@/store/search-filter-store";
import type { ProjectCard } from "@/types/project";

export async function fetchProjects(
  filters: SearchFilters,
): Promise<ProjectCard[]> {
  try {
    let query = supabase.from("project_view").select("*");

    if (filters.searchQuery) {
      const search = `%${filters.searchQuery}%`;
      query = query.or(
        `name.ilike.${search},short_description.ilike.${search},expected_schedule.ilike.${search},detail_plan.ilike.${search},user_name.ilike.${search}`,
      );
    }

    if (filters.position) {
      const { data: projectPos } = await supabase
        .from("project_positions")
        .select("project_id")
        .eq("position_name", filters.position);

      const projectIds = projectPos?.map((p) => p.project_id);
      if (projectIds?.length) query = query.in("id", projectIds);
    }
    if (filters.duration) {
      const { data: projectDur } = await supabase
        .from("project_view")
        .select("id")
        .eq("expected_schedule", filters.duration);

      const projectIds = projectDur?.map((d) => d.id);
      if (projectIds?.length) query = query.in("id", projectIds);
    }
    if (filters.field) {
      const { data: fieldData } = await supabase
        .from("fields")
        .select("id")
        .eq("name", filters.field);

      const fieldId = fieldData?.[0]?.id;

      if (fieldId) {
        const { data: projectsWithField } = await supabase
          .from("project_view")
          .select("id")
          .eq("field_id", fieldId);
        const projectIds = projectsWithField?.map((p) => p.id);
        if (projectIds?.length) query = query.in("id", projectIds);
        else {
          return [];
        }
      }
    }

    const { data: projectData } = await query;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overDateProject = projectData
      .filter((p) => new Date(p.deadline) < today)
      .map((p) => p.id);

    await supabase
      .from("projects")
      .update({ status: "false" })
      .in("id", overDateProject);

    const { data: domainData } = await supabase
      .from("domains")
      .select("id")
      .eq("name", filters.domain);

    const domainId = domainData?.[0]?.id;

    if (domainId) {
      const { data: projectsWithDomain } = await supabase
        .from("projects")
        .select("id")
        .eq("domain_id", domainId);
      const projectIds = projectsWithDomain?.map((p) => p.id);
      if (projectIds?.length) query = query.in("id", projectIds);
      else {
        return [];
      }
    }

    const { data: projects, error: projectsError } = await query;
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
        p.project_positions?.reduce(
          (sum, pos) => sum + (pos.recruit_count ?? 0),
          0,
        ) ?? 0;

      const skills =
        techLinks
          ?.filter((t) => String(t.project_id) === String(p.id))
          .map((t) => {
            const tech = techStacks?.find((ts) => ts.id === t.tech_stack_id);
            return tech?.name ?? "알 수 없음";
          }) ?? [];

      const fieldName =
        fields?.find((f) => f.id === p.field_id)?.name ?? "기타";

      let remain = 0;
      if (p.deadline) {
        const today = new Date();
        const deadlineDate = new Date(p.deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        remain = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }

      const status: ProjectStatus = p.status === "true" ? "true" : "false";

      return {
        id: p.id,
        title: p.name,
        description: p.short_description,
        owner: p.user_name || "",
        profile_image: p.user_profile_image || "/assets/no-profile.svg",
        level: careerName,
        members: memberCount,
        period: p.deadline,
        duration: p.expected_schedule,
        skills,
        remain: remain > 0 ? remain : 0,
        category: fieldName,
        position: p.position,
        status,
      };
    });

    const sortedResults = mappedResults.sort((a, b) => {
      if (a.status === "false" && b.status !== "false") return 1;
      if (a.status !== "false" && b.status === "false") return -1;
      return 0;
    });

    return sortedResults;
  } catch (err) {
    console.error("프로젝트 조회 오류:", err);
    return [];
  }
}
