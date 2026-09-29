import type { Project } from "@/data/projects";
import SectionLabel from "../SectionLabel";
import TextReveal from "../TextReveal";

/** Challenge → Outcome as a structured index, not a blog post. */
export default function CaseNarrative({ project }: { project: Project }) {
  const rows = [
    { k: "Challenge", v: project.challenge, big: false },
    { k: "Insight", v: project.insight, big: true },
    { k: "Idea", v: project.idea, big: true },
    { k: "Solution", v: project.solution, big: false },
    { k: "Outcome", v: project.outcome, big: false },
  ];
  return (
    <section aria-label="Case study" className="section">
      <div className="wrap grid-12 mb-[clamp(64px,14vh,180px)] gap-y-8">
        <SectionLabel index="01" className="col-span-4 md:col-span-2 lg:col-span-3">
          The brief
        </SectionLabel>
        <TextReveal as="p" className="t-statement col-span-4 md:col-span-6 lg:col-start-5 lg:col-span-8">
          {project.description}
        </TextReveal>
      </div>

      <dl className="wrap">
        {rows.map((r, i) => {
          const placeholder = r.v.startsWith("[");
          return (
            <div key={r.k} className="grid-12 gap-y-4 border-t border-[var(--line)] py-8 md:py-12">
              <dt className="t-label col-span-4 flex gap-3 md:col-span-2 lg:col-span-3">
                <span className="tnum t-muted">{String(i + 1).padStart(2, "0")}</span>
                {r.k}
              </dt>
              <dd
                className={`col-span-4 md:col-span-6 lg:col-start-5 lg:col-span-7 ${
                  placeholder ? "t-label t-muted border border-dashed border-[var(--line)] p-4" : r.big ? "t-h3" : "t-lead max-w-[48ch]"
                }`}
              >
                {r.v}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
