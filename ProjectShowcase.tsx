import type { Project } from "@/data/projects";
import CTA from "./CTA";
import ProjectCard from "./ProjectCard";
import SectionLabel from "./SectionLabel";
import TextReveal from "./TextReveal";

/** Selected work: every project gets its own editorial layout (set per project in data). */
export default function ProjectShowcase({
  projects,
  title = ["Selected", "Work"],
  showAllLink = true,
  index = "02",
}: {
  projects: Project[];
  title?: [string, string];
  showAllLink?: boolean;
  index?: string;
}) {
  return (
    <section id="work" aria-labelledby="work-title" className="section" tabIndex={-1}>
      <div className="wrap grid-12 mb-[clamp(56px,12vh,160px)] items-end gap-y-8">
        <TextReveal as="h2" id="work-title" by="words" className="t-h1 col-span-4 md:col-span-6 lg:col-span-8">
          <span className="block">{title[0]}</span>
          <span className="block lg:pl-[calc((100%+var(--gutter))/8*2)]">{title[1]}</span>
        </TextReveal>
        <div className="col-span-4 flex items-end justify-between md:col-span-2 md:block lg:col-start-10 lg:col-span-3">
          <div>
            <p className="t-h3 tnum mb-2">({String(projects.length).padStart(2, "0")})</p>
            <SectionLabel index={index}>Index {projects[0]?.year}</SectionLabel>
          </div>
          {showAllLink && (
            <div className="md:mt-8">
              <CTA href="/work">All work</CTA>
            </div>
          )}
        </div>
      </div>

      <ol className="flex flex-col gap-[clamp(96px,18vh,220px)]">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <ProjectCard project={p} index={i} />
          </li>
        ))}
      </ol>
    </section>
  );
}
