"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { Project, ShowcaseLayout } from "@/data/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { FINE_POINTER, REDUCED } from "@/lib/media";
import ImageReveal from "./ImageReveal";
import TransitionLink from "./TransitionLink";

type Props = { project: Project; index: number; layout?: ShowcaseLayout };

const num = (i: number) => String(i + 1).padStart(2, "0");
const ease = "ease-[cubic-bezier(0.19,1,0.22,1)]";

/** Services list that is quiet until hover on desktop, always visible on touch. */
function Services({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <ul className={`t-label t-muted space-y-1 transition-[opacity,translate] duration-700 ${ease} lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100 ${className}`}>
      {project.services.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

function Arrow() {
  return (
    <span className="t-label relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap pb-1.5">
      View case
      <ArrowRight aria-hidden size={14} strokeWidth={1.6} className={`transition-transform duration-500 ${ease} group-hover:translate-x-1.5`} />
      <span aria-hidden className={`absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-700 ${ease} group-hover:scale-x-[0.35]`} />
    </span>
  );
}

/* 01 · Full-bleed image, title underneath */
function Full({ project, index }: Props) {
  return (
    <TransitionLink href={`/work/${project.slug}`} flipFrom="[data-flip-source]" className="group block" data-cursor="view" aria-label={`${project.title}: view project`}>
      <ImageReveal
        src={project.thumbnail}
        alt={project.title}
        aspect="16 / 9"
        sizes="100vw"
        cut
        flipSource
        className="max-md:!aspect-[4/5]"
      />
      <div className="wrap grid-12 mt-5 gap-y-4 md:mt-7">
        <p className={`t-label tnum col-span-1 transition-transform duration-500 ${ease} group-hover:translate-y-1`}>{num(index)}</p>
        <h3 className={`t-h2 col-span-3 md:col-span-5 lg:col-span-7 transition-transform duration-700 ${ease} group-hover:translate-x-2`}>{project.title}</h3>
        <div className="col-span-4 flex items-start justify-between gap-6 md:col-span-2 md:col-start-7 lg:col-start-10 lg:col-span-3">
          <div>
            <p className="t-label mb-3">
              {project.category} / {project.discipline}
            </p>
            <Services project={project} />
          </div>
          <Arrow />
        </div>
      </div>
    </TransitionLink>
  );
}

/* 02 · Image offset right, big empty field left */
function Offset({ project, index }: Props) {
  return (
    <TransitionLink href={`/work/${project.slug}`} flipFrom="[data-flip-source]" className="group wrap grid-12 gap-y-6" data-cursor="view" aria-label={`${project.title}: view project`}>
      <div className="col-span-4 flex flex-col justify-between md:col-span-3 lg:col-span-4 max-md:order-2">
        <div className="hidden md:block">
          <p className={`t-label tnum mb-5 transition-transform duration-500 ${ease} group-hover:translate-x-1`}>{num(index)}</p>
          <p className="t-lead max-w-[22ch]">{project.summary}</p>
        </div>
        <div>
          <p className="t-label tnum mb-4 md:hidden">{num(index)}</p>
          <h3 className={`t-h2 mb-6 transition-transform duration-700 ${ease} group-hover:translate-x-2`}>{project.title}</h3>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="t-label mb-3">
                {project.category} / {project.discipline} / {project.year}
              </p>
              <Services project={project} />
            </div>
            <Arrow />
          </div>
        </div>
      </div>
      <ImageReveal
        src={project.thumbnail}
        alt={project.title}
        aspect="4 / 3"
        sizes="(min-width: 1024px) 58vw, 100vw"
        cut
        flipSource
        className="col-span-4 md:col-span-5 lg:col-start-6 lg:col-span-7 max-md:order-1"
      />
    </TransitionLink>
  );
}

/* 03 · Split screen: image | project colour field with a small collage */
function Split({ project, index }: Props) {
  const toneStyle = { background: project.tone, color: project.onTone } as CSSProperties;
  return (
    <TransitionLink href={`/work/${project.slug}`} flipFrom="[data-flip-source]" className="group grid md:grid-cols-2" data-cursor="view" aria-label={`${project.title}: view project`}>
      <ImageReveal src={project.story[0]?.type === "full" ? project.story[0].image.src : project.thumbnail} alt={project.title} sizes="(min-width: 768px) 50vw, 100vw" flipSource className="aspect-[4/5] md:aspect-auto md:min-h-[min(100vh,1000px)]" />
      <div style={toneStyle} className="relative flex flex-col justify-between gap-16 overflow-hidden px-[var(--margin)] py-[clamp(32px,6vw,88px)]">
        <div className="flex items-start justify-between">
          <p className={`t-label tnum transition-transform duration-500 ${ease} group-hover:translate-y-1`}>{num(index)}</p>
          <p className="t-label">{project.year}</p>
        </div>
        <div className="grid grid-cols-5 items-end gap-[var(--gutter)]">
          <div className="col-span-2 aspect-[3/4] relative overflow-hidden">
            <Image src={project.collage?.[0] ?? project.heroImage} alt="" fill sizes="20vw" className={`object-cover transition-[scale] duration-1000 ${ease} group-hover:scale-105`} />
          </div>
          <div className="col-span-2 col-start-4 aspect-square relative -mb-[12%] overflow-hidden">
            <Image src={project.collage?.[1] ?? project.heroImage} alt="" fill sizes="20vw" className={`object-cover transition-[scale] duration-1000 ${ease} group-hover:scale-105`} />
          </div>
        </div>
        <div>
          <h3 className={`t-h1 mb-6 transition-transform duration-700 ${ease} group-hover:translate-x-2`}>{project.title}</h3>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="t-label mb-3">
                {project.category} / {project.discipline}
              </p>
              <Services project={project} className="!text-current opacity-80" />
            </div>
            <Arrow />
          </div>
        </div>
      </div>
    </TransitionLink>
  );
}

/* 04 · Typography-led: the title is the layout, a small image follows the cursor */
function TypeLed({ project, index }: Props) {
  const root = useRef<HTMLAnchorElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      const f = float.current;
      if (!el || !f || !window.matchMedia(FINE_POINTER).matches || window.matchMedia(REDUCED).matches) return;
      const xTo = gsap.quickTo(f, "x", { duration: 0.9, ease: "power3" });
      const yTo = gsap.quickTo(f, "y", { duration: 0.9, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width * 0.7) * 0.25);
        yTo((e.clientY - r.top - r.height * 0.5) * 0.25);
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  const words = project.title.split(" ");
  return (
    <TransitionLink
      ref={root}
      href={`/work/${project.slug}`}
      flipFrom="[data-flip-source]"
      className="group relative block overflow-hidden py-[clamp(48px,10vh,120px)] transition-colors duration-700"
      style={hover ? { background: project.tone, color: project.onTone } : undefined}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      data-cursor="view"
      aria-label={`${project.title}: view project`}
    >
      <div className="wrap relative">
        <p className="t-label tnum mb-6">
          {num(index)} &nbsp; {project.category} / {project.discipline}
        </p>
        <h3 className="t-mega relative z-10 transition-[font-stretch] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] lg:group-hover:[font-stretch:125%]">
          <span className="block">{words[0]}</span>
          <span className="block text-right">{words.slice(1).join(" ")}</span>
        </h3>
        <div
          ref={float}
          className="relative z-0 mt-8 w-2/3 md:w-1/3 lg:absolute lg:left-[40%] lg:top-[14%] lg:mt-0 lg:w-[13%]"
        >
          <ImageReveal src={project.thumbnail} alt={project.title} aspect="4 / 5" sizes="(min-width: 1024px) 16vw, 60vw" parallax={false} flipSource cut />
        </div>
        <div className="mt-8 flex items-end justify-between gap-6 lg:mt-12">
          <Services project={project} className="!text-current opacity-80" />
          <span className="flex items-center gap-4">
            <span className="t-label">{project.year}</span>
            <Arrow />
          </span>
        </div>
      </div>
    </TransitionLink>
  );
}

export default function ProjectCard(props: Props) {
  const layout = props.layout ?? props.project.layout;
  if (layout === "offset") return <Offset {...props} />;
  if (layout === "split") return <Split {...props} />;
  if (layout === "type") return <TypeLed {...props} />;
  return <Full {...props} />;
}

