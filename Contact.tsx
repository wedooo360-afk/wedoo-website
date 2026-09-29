"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { REDUCED } from "@/lib/media";
import { site } from "@/lib/site";
import Footer from "./Footer";
import Magnetic from "./Magnetic";
import TextReveal from "./TextReveal";

/**
 * The site ends inside the mark: an ink block (the logo's own colour) whose top
 * edge carries the logo's two 90° cuts at 35.6% / 64.4%. The cuts open as it arrives.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia(REDUCED).matches) return;
      gsap.fromTo(
        ref.current,
        { "--d": "0px" },
        {
          "--d": () => `${Math.min(56, Math.max(22, window.innerWidth * 0.032))}px`,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 40%", scrub: true, invalidateOnRefresh: true },
        },
      );
    },
    { scope: ref },
  );

  const mail = `mailto:${site.email}?subject=${encodeURIComponent("New project")}`;

  return (
    <section
      ref={ref}
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      data-header="dark"
      className="edge-cut relative bg-mass text-paper"
    >
      <div className="wrap pb-[clamp(64px,12vh,140px)] pt-[clamp(120px,24vh,280px)]">
        <p className="t-label mb-10 text-white/60">(Contact)</p>
        <TextReveal as="h2" id="contact-title" by="words" className="t-mega">
          <span className="block">Something</span>
          <span className="block lg:pl-[calc((100%+var(--gutter))/12*4)]">worth</span>
          <span className="block">building?</span>
        </TextReveal>

        <div className="grid-12 mt-[clamp(56px,12vh,140px)] items-end gap-y-10">
          <div className="col-span-4 md:col-span-4 lg:col-span-5">
            <Magnetic>
              <a href={mail} className="cta t-h3" data-cursor="arrow">
                <span>Start a project</span>
                <ArrowRight aria-hidden className="cta-arrow" size={34} strokeWidth={1.4} />
              </a>
            </Magnetic>
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-start-6 lg:col-span-4">
            <p className="t-label mb-2 text-white/60">New business</p>
            <a href={`mailto:${site.email}`} className="u-link text-[clamp(18px,1.6vw,26px)]">
              {site.email}
            </a>
          </div>
          <p className="t-label col-span-4 text-white/60 md:col-span-8 lg:col-start-10 lg:col-span-3 lg:text-right">
            Founders, teams and organisations
            <br />
            ready to move forward.
          </p>
        </div>
      </div>
      <Footer />
    </section>
  );
}
