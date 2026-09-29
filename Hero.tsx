"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { FINE_POINTER, REDUCED } from "@/lib/media";
import { projects } from "@/data/projects";
import TextReveal from "./TextReveal";
import TransitionLink from "./TransitionLink";

/*
 * Hero panels sit on the logo-derived 4 · 1 · 2 · 1 · 4 division.
 * Columns 5 and 8 are the "cuts": left empty on purpose.
 */
const PANELS = [
  {
    project: projects[0],
    src: projects[0].heroImage,
    alt: "Soutsakan Institute of Technology identity",
    col: "col-span-4 lg:col-start-1 lg:col-span-4",
    aspect: "4 / 5",
    depth: 14,
    offset: "",
  },
  {
    project: projects[1],
    src: "/work/futura-school/image-02.jpg",
    alt: "Futura School type specimen",
    col: "col-span-2 md:col-span-3 lg:col-start-6 lg:col-span-2",
    aspect: "3 / 4",
    depth: 22,
    offset: "mt-10 md:mt-24 lg:mt-[38%]",
  },
  {
    project: projects[2],
    src: projects[2].heroImage,
    alt: "Kyae Oh King identity",
    col: "col-span-2 md:col-span-5 lg:col-start-9 lg:col-span-4",
    aspect: "5 / 4",
    depth: 8,
    offset: "mt-28 md:mt-8 lg:mt-0",
  },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(REDUCED).matches;
      if (reduced) return;

      // Panels open from the bottom edge, just after the headline.
      gsap.fromTo(
        "[data-hero-panel]",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.6, stagger: 0.12, delay: 0.55, ease: "expo.out" },
      );
      gsap.from("[data-hero-panel] img", { scale: 1.25, duration: 2, stagger: 0.12, delay: 0.55, ease: "expo.out" });
      gsap.from("[data-hero-meta]", { autoAlpha: 0, y: 12, duration: 1, stagger: 0.08, delay: 0.9, ease: "power3.out" });

      // Headline drifts slower than the page.
      gsap.to("[data-hero-title]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Pointer: panels move by depth, their images counter-shift (the crop changes).
      if (!window.matchMedia(FINE_POINTER).matches) return;
      const panels = gsap.utils.toArray<HTMLElement>("[data-hero-panel-wrap]");
      const movers = panels.map((p) => {
        const depth = Number(p.dataset.depth || 10);
        const img = p.querySelector("img");
        return {
          depth,
          x: gsap.quickTo(p, "x", { duration: 1.2, ease: "power3" }),
          y: gsap.quickTo(p, "y", { duration: 1.2, ease: "power3" }),
          ix: img ? gsap.quickTo(img, "x", { duration: 1.4, ease: "power3" }) : null,
          iy: img ? gsap.quickTo(img, "y", { duration: 1.4, ease: "power3" }) : null,
        };
      });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => {
          m.x(nx * m.depth);
          m.y(ny * m.depth);
          m.ix?.(nx * -m.depth * 0.8);
          m.iy?.(ny * -m.depth * 0.8);
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative pb-[clamp(72px,12vh,160px)] pt-[calc(var(--header-h)+clamp(24px,5vh,64px))]">
      <div className="wrap">
        {/* Meta row */}
        <div className="grid-12 mb-[clamp(28px,6vh,72px)] items-start">
          <p data-hero-meta className="t-label col-span-2 lg:col-span-4">
            (WEDOO)
            <br />
            Branding + Creative Agency
          </p>
          <p data-hero-meta className="t-label col-span-2 hidden md:block md:col-span-3 lg:col-start-6 lg:col-span-2">
            Selected work
            <br />
            <span className="tnum">{String(projects.length).padStart(2, "0")} projects / {projects[0].year}</span>
          </p>
          <p data-hero-meta className="col-span-2 max-w-[30ch] justify-self-end text-right text-[15px] leading-snug md:col-span-3 lg:col-start-9 lg:col-span-4">
            Strategy, identity and digital, built with the care of someone who owns the outcome.
          </p>
        </div>

        {/* Headline */}
        <div data-hero-title>
          <TextReveal as="h1" id="hero-title" by="words" on="load" delay={0.15} className="t-mega max-md:!text-[17vw]">
            <span className="md:block">Built like</span>{" "}
            <span className="md:block md:whitespace-nowrap md:text-right">we own it.</span>
          </TextReveal>
        </div>

        {/* Grid spec: a hairline carrying the logo's two cuts, centred on the void columns 5 and 8 */}
        <div aria-hidden data-hero-meta className="grid-12 mt-[clamp(40px,8vh,104px)] hidden lg:grid">
          <div className="col-span-12 relative h-3 text-[var(--fg)]">
            <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeOpacity=".22" vectorEffect="non-scaling-stroke" />
            </svg>
            {[4, 7].map((c) => (
              <span
                key={c}
                className="absolute top-0 h-2 w-2 -translate-x-1/2 -translate-y-[1px] rotate-45 border-b border-r border-current opacity-60"
                style={{ left: `calc((100% + var(--gutter)) / 12 * ${c} + (100% + var(--gutter)) / 24 - var(--gutter) / 2)` }}
              />
            ))}
            <span className="t-label t-muted absolute right-0 top-3">4 · 1 · 2 · 1 · 4</span>
          </div>
        </div>

        {/* Panels */}
        <div className="grid-12 mt-8 lg:mt-10 items-start">
          {PANELS.map((p, i) => (
            <div key={p.src} data-hero-panel-wrap data-depth={p.depth} className={`${p.col} ${p.offset}`}>
              <TransitionLink
                href={`/work/${p.project.slug}`}
                flipFrom="[data-hero-panel]"
                className="group block"
                data-cursor="view"
                aria-label={`${p.project.title}: view project`}
              >
                <div data-hero-panel className="frame frame-cut frame-overscan" style={{ aspectRatio: p.aspect }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="t-label mt-3 flex items-baseline justify-between gap-3">
                  <span className="flex gap-3 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1.5">
                    <span className="tnum t-muted">{String(projects.indexOf(p.project) + 1).padStart(2, "0")}</span>
                    <span>{p.project.short}</span>
                  </span>
                  <span className="t-muted hidden md:inline">{p.project.category}</span>
                </div>
              </TransitionLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
