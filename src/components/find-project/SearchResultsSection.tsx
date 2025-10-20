import ProjectCard from "@/components/common/project-card/ProjectCard";
import type { ProjectCard as ProjectCardType } from "@/types/project";

interface SearchResultsSectionProps {
  results: ProjectCardType[];
}

export default function SearchResultsSection({
  results,
}: SearchResultsSectionProps) {
  return (
    <section
      className="w-full max-w-[1620px] mt-[140px] ml-[160px] self-start"
      aria-label="검색 결과"
    >
      <h2 className="text-8 font-bold text-deep">
        총 {results.length}개 검색되었습니다
      </h2>

      {results.length > 0 ? (
        <ul className="mt-[50px] grid grid-cols-3 gap-6" role="list">
          {results.map((project) => (
            <li key={project.id}>
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                owner={project.owner}
                level={project.level}
                members={project.members}
                period={project.period}
                duration={project.duration}
                skills={project.skills}
                remain={project.remain}
                category={project.category}
                profile_image={project.profile_image}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-[50px] text-5 text-gray">
          검색 결과가 없습니다. 다른 조건으로 검색해보세요.
        </p>
      )}
    </section>
  );
}
