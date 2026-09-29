import type { Project } from "@/data/projects";

/** Reusable metadata block: Client / Industry / Services / Year. */
export default function ProjectMeta({ project, className = "" }: { project: Project; className?: string }) {
  const rows: [string, React.ReactNode][] = [
    ["Client", project.client],
    ["Industry", project.category],
    ["Services", project.services.join(", ")],
    ["Year", project.year],
  ];
  return (
    <dl className={`grid grid-cols-2 gap-x-[var(--gutter)] gap-y-6 lg:grid-cols-4 ${className}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="border-t border-[var(--line)] pt-3">
          <dt className="t-label t-muted mb-2">{k}</dt>
          <dd className="text-[15px] leading-snug">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
