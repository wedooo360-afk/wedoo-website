import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import TransitionLink from "../TransitionLink";

const ease = "ease-[cubic-bezier(0.19,1,0.22,1)]";

export default function NextProject({ project }: { project: Project }) {
  return (
    <section aria-labelledby="next-title" className="pb-[var(--section)]">
      <TransitionLink
        href={`/work/${project.slug}`}
        flipFrom="[data-flip-source]"
        className="group wrap grid-12 items-end gap-y-8 border-t border-[var(--line)] pt-8"
        data-cursor="view"
        data-cursor-label="Next"
      >
        <p className="t-label col-span-4 flex items-center gap-2 md:col-span-8 lg:col-span-12">
          Next project
          <ArrowRight aria-hidden size={14} strokeWidth={1.6} className={`transition-transform duration-500 ${ease} group-hover:translate-x-1.5`} />
        </p>
        <h2 id="next-title" className={`t-h1 col-span-4 transition-transform duration-700 md:col-span-5 lg:col-span-7 ${ease} group-hover:translate-x-3`}>
          {project.title}
        </h2>
        <div className="col-span-4 md:col-span-3 lg:col-start-9 lg:col-span-4">
          <div data-flip-source className="frame frame-cut relative aspect-[4/3]">
            <Image src={project.thumbnail} alt={project.title} fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" />
          </div>
          <p className="t-label t-muted mt-3">
            {project.category} / {project.discipline}
          </p>
        </div>
      </TransitionLink>
    </section>
  );
}
