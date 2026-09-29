import type { Project } from "@/data/projects";
import ImageReveal from "../ImageReveal";
import ProjectMeta from "../ProjectMeta";
import TextReveal from "../TextReveal";
import TransitionLink from "../TransitionLink";

export default function CaseHero({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <section aria-labelledby="case-title" className="pt-[calc(var(--header-h)+clamp(32px,8vh,96px))]">
      <div className="wrap">
        <div className="t-label mb-[clamp(32px,8vh,88px)] flex items-center justify-between">
          <TransitionLink href="/work" className="u-link">
            &larr; All work
          </TransitionLink>
          <span className="tnum">
            Case {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <TextReveal as="h1" id="case-title" by="words" on="load" delay={0.2} className="t-h1 max-w-[12ch]">
          {project.title}
        </TextReveal>

        <div className="grid-12 mt-[clamp(40px,8vh,96px)] gap-y-12">
          <p className="t-lead col-span-4 max-w-[34ch] md:col-span-5 lg:col-span-4">{project.summary}</p>
          <ProjectMeta project={project} className="col-span-4 md:col-span-8 lg:col-start-6 lg:col-span-7" />
        </div>
      </div>

      <ImageReveal
        src={project.heroImage}
        alt={`${project.title}: hero image`}
        aspect="16 / 9"
        sizes="100vw"
        priority
        reveal={false}
        flipTarget
        className="mt-[clamp(48px,10vh,120px)] max-md:!aspect-[4/5]"
      />
    </section>
  );
}
