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
      className="w-full mt-[140px] px-36 mx-auto flex flex-col items-center"
      aria-label="검색 결과"
    >
      <h2 className="text-8 font-bold text-deep">
        총 {results.length}개 검색되었습니다
      </h2>

      {results.length > 0 ? (
        <ul
          className="mt-[50px] grid grid-cols-1 min-[1280px]:grid-cols-2 min-[1750px]:grid-cols-3 gap-14"
          role="list"
        >
          {results.map((project, index) => (
            <li key={project.id} className="w-[500px]">
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
                status={project.status}
                isPriority={index === 0}
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
