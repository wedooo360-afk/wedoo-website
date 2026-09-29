import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseHero from "@/components/case/CaseHero";
import CaseNarrative from "@/components/case/CaseNarrative";
import NextProject from "@/components/case/NextProject";
import StoryBlocks from "@/components/case/StoryBlocks";
import { getNextProject, getProject, projects } from "@/data/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: `${project.title} / WEDOO`, description: project.summary, images: [project.heroImage] },
  };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((p) => p.slug === slug);

  return (
    <article>
      <CaseHero project={project} index={index} total={projects.length} />
      <CaseNarrative project={project} />
      <StoryBlocks blocks={project.story} tone={project.tone} />
      <NextProject project={getNextProject(slug)} />
    </article>
  );
}
