"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { FINE_POINTER, useMedia } from "@/lib/media";
import HoverPreview from "./HoverPreview";
import SectionLabel from "./SectionLabel";
import TextReveal from "./TextReveal";

const ease = "ease-[cubic-bezier(0.19,1,0.22,1)]";

/**
 * Service index. Desktop: rows open on hover and a preview trails the cursor.
 * Touch + keyboard: each row is a disclosure button.
 */
export default function Services({ index = "04" }: { index?: string }) {
  const fine = useMedia(FINE_POINTER);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" aria-labelledby="services-title" className="section" tabIndex={-1}>
      <div className="wrap">
        <div className="grid-12 mb-[clamp(48px,10vh,120px)] items-end gap-y-8">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <SectionLabel index={index} className="mb-8">
              Services
            </SectionLabel>
            <TextReveal as="h2" id="services-title" by="words" className="t-h1">
              <span className="block">What</span>
              <span className="block">we do.</span>
            </TextReveal>
          </div>
          <p className="t-lead t-muted col-span-4 max-w-[30ch] md:col-span-3 lg:col-start-9 lg:col-span-4">
            Strategy first. Everything else follows from it, and has to earn its place.
          </p>
        </div>

        <ul onPointerLeave={() => fine && setOpen(null)} className="border-b border-[var(--line)]">
          {services.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <li key={s.id} className="relative isolate border-t border-[var(--line)]">
                <span
                  aria-hidden
                  className={`absolute inset-0 -z-10 origin-bottom bg-[var(--line)] opacity-40 transition-transform duration-700 ${ease} ${
                    isOpen ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`svc-${s.id}`}
                    onClick={() => setOpen(isOpen ? null : s.id)}
                    onPointerEnter={() => fine && setOpen(s.id)}
                    data-cursor="hide"
                    className="grid-12 w-full items-center py-5 text-left md:py-7"
                  >
                    <span className="t-label tnum col-span-1 self-start pt-[0.9em] md:pt-[1.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`col-span-2 text-[clamp(30px,4.4vw,76px)] font-bold leading-[0.95] tracking-[-0.04em] transition-transform duration-700 md:col-span-6 lg:col-span-9 ${ease} ${
                        isOpen ? "translate-x-3 md:translate-x-6" : ""
                      }`}
                      style={{ fontStretch: "106%" }}
                    >
                      {s.title}
                    </span>
                    <span className="col-span-1 justify-self-end lg:col-span-2">
                      <ArrowRight
                        aria-hidden
                        size={28}
                        strokeWidth={1.4}
                        className={`transition-transform duration-700 ${ease} ${isOpen ? "rotate-45" : ""}`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`svc-${s.id}`}
                  role="region"
                  aria-label={s.title}
                  className={`grid transition-[grid-template-rows] duration-700 ${ease}`}
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <div className="grid-12 gap-y-6 pb-8 md:pb-10">
                      <p className="t-lead col-span-4 max-w-[34ch] md:col-start-2 md:col-span-4 lg:col-start-2 lg:col-span-5">
                        {s.summary}
                      </p>
                      <ul className="t-label t-muted col-span-4 space-y-1.5 md:col-span-3 lg:col-start-8 lg:col-span-3">
                        {s.includes.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <HoverPreview items={services.map((s) => ({ id: s.id, src: s.image, alt: s.title }))} active={open} />
    </section>
  );
}
