import Footer from "@/components/common/footer/Footer";
import GoTopButton from "@/components/common/GoTopButton";
import Header from "@/components/common/header/Header";
import ProjectDetailClient from "@/components/project-detail/ProjectDetailClient";
import { supabase } from "@/lib/supabase";
import type { ProjectHeaderInfo, ProjectDetail } from "@/types/project";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
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
  const techStackNames: string[] = techStack?.map((t) => t.name);

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
    estimatedPeriod: project.deadline,
    duration: project.expected_schedule,
    positions: project.project_positions || [],
    status: project.status || "recruiting", // 이부분 해야함
    teamSize:
      project.project_positions.reduce(
        (sum, pos) => sum + (pos.recruit_count || 0),
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
