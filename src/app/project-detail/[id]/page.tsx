import type { Metadata } from "next";
import Footer from "@/components/common/footer/Footer";
import GoTopButton from "@/components/common/GoTopButton";
import Header from "@/components/common/header/Header";
import ProjectDetailClient from "@/components/project-detail/ProjectDetailClient";
import { supabase } from "@/lib/supabase";
import type { ProjectHeaderInfo, ProjectDetail } from "@/types/project";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  const { data: project } = await supabase
    .from("project_view")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    return {
      title: "프로젝트 상세 | JOYIN",
      description: "JOYIN에서 다양한 프로젝트를 만나보세요.",
      icons: {
        icon: "/assets/joyin-fav.ico",
      },
    };
  }

  return {
    title: `${project.name} | JOYIN`,
    description:
      project.short_description ||
      "프로젝트 상세 정보를 확인하고 함께할 팀원을 찾아보세요.",
    icons: {
      icon: "/assets/joyin-fav.ico",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;

  const { data: project, error: projectError } = await supabase
    .from("project_view")
    .select("*")
    .eq("id", id)
    .single();

  if (projectError || !project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <p>프로젝트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const { data: field, error: _fieldError } = await supabase
    .from("fields")
    .select("*")
    .eq("id", project.field_id)
    .single();

  const { data: domain, error: _domainError } = await supabase
    .from("domains")
    .select("*")
    .eq("id", project.domain_id)
    .single();

  const { data: position, error: _positionError } = await supabase
    .from("positions")
    .select("*")
    .eq("id", project.user_position)
    .single();

  const { data: career, error: _careerError } = await supabase
    .from("careers")
    .select("*")
    .eq("id", project.user_career)
    .single();

  const { data: techStack, error: _techStackError } = await supabase
    .from("tech_stacks")
    .select("*")
    .in("id", project.project_tech_stacks);
  const techStackNames: string[] = techStack?.map((t) => t.name) ?? [];

  // 모집 기간 포맷팅: created_at ~ deadline (M.D~M.D 형식)
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}.${day}`;
  };

  const periodFormatted =
    project.created_at && project.deadline
      ? `${formatDate(project.created_at)}~${formatDate(project.deadline)}`
      : project.deadline || "";

  // ✅ Header용 데이터
  const projectHeaderData: ProjectHeaderInfo = {
    id: project.id,
    title: project.name,
    description: project.short_description,
    category: field.name,
    domain: domain.name,
    techStack: techStackNames || [],
    preferences: project.project_preferences || [],
    requirements: project.project_requirements || [],
    estimatedPeriod: periodFormatted,
    duration: project.expected_schedule,
    positions: project.project_positions || [],
    status: project.status || "true", // "true" = 모집중, "false" = 모집완료
    teamSize:
      project.project_positions.reduce(
        (sum: number, pos: { recruit_count?: number }) =>
          sum + (pos.recruit_count || 0),
        0,
      ) || 0,
  };

  // ✅ 상세 정보용 데이터
  const projectDetailData: ProjectDetail = {
    ...projectHeaderData,
    createdAt: project.created_at,
    updatedAt: project.updated_at,
    ownerId: project.owner_id,
    ownerName: project.user_name,
    ownerEmail: project.user_email,
    ownerProfileImage: project.user_profile_image || "/assets/no-profile.svg",
    ownerRole: position.name,
    ownerExperience: career.name,
    ownerBio: project.user_description,
    applicantCount: project.applicant_count || 0, // 이부분 해야함
    projectPlan: project.detail_plan,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="white" />
      <ProjectDetailClient
        projectHeaderData={projectHeaderData}
        projectDetailData={projectDetailData}
        ownerId={project.owner_id || ""}
      />
      <Footer />
      <GoTopButton />
    </div>
  );
}
