"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import HoverPreview from "./HoverPreview";
import SectionLabel from "./SectionLabel";
import TransitionLink from "./TransitionLink";

const ease = "ease-[cubic-bezier(0.19,1,0.22,1)]";

/** Editorial archive: dense, tabular, every row a link with a trailing preview. */
export default function ProjectArchive({ projects, index = "05" }: { projects: Project[]; index?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section aria-labelledby="archive-title" className="pb-[var(--section)]">
      <div className="wrap">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <h2 id="archive-title" className="t-h2">
            Archive
          </h2>
          <SectionLabel index={index}>
            <span className="tnum">{String(projects.length).padStart(2, "0")} entries</span>
          </SectionLabel>
        </div>

        <div aria-hidden className="t-label t-muted grid-12 hidden border-b border-[var(--line)] pb-3 md:grid">
          <span className="md:col-span-3 lg:col-span-5">Project</span>
          <span className="md:col-span-2 lg:col-span-2">Industry</span>
          <span className="md:col-span-2 lg:col-span-4">Services</span>
          <span className="md:col-span-1 lg:col-span-1 text-right">Year</span>
        </div>

        <ul className="group/list" onPointerLeave={() => setActive(null)}>
          {projects.map((p) => (
            <li key={p.slug} className="border-b border-[var(--line)]">
              <TransitionLink
                href={`/work/${p.slug}`}
                onPointerEnter={() => setActive(p.slug)}
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive(null)}
                data-cursor="view"
                className={`group grid-12 items-baseline gap-y-1 py-5 transition-opacity duration-500 md:py-6 lg:group-hover/list:opacity-30 lg:hover:!opacity-100`}
              >
                <span className={`col-span-3 text-[clamp(22px,2.2vw,36px)] font-semibold leading-[1.05] tracking-[-0.03em] transition-transform duration-700 md:col-span-3 lg:col-span-5 ${ease} group-hover:translate-x-2`}>
                  {p.title}
                </span>
                <span className="t-label col-span-1 text-right md:hidden tnum">{p.year}</span>
                <span className="t-label t-muted col-span-4 md:col-span-2 lg:col-span-2">
                  <span className="sr-only">Industry: </span>
                  {p.category}
                </span>
                <span className="t-label t-muted col-span-4 hidden md:col-span-2 md:block lg:col-span-4">
                  <span className="sr-only">Services: </span>
                  {p.services.join(", ")}
                </span>
                <span className="t-label tnum hidden text-right md:col-span-1 md:block">{p.year}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
      <HoverPreview items={projects.map((p) => ({ id: p.slug, src: p.thumbnail, alt: p.title }))} active={active} />
    </section>
  );
}
