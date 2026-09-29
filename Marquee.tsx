"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { REDUCED } from "@/lib/media";

const WORDS = ["Strategy", "Identity", "Digital", "Experience", "Culture"];

/**
 * Architectural type band. Continuous, slow; speeds up with scroll velocity,
 * slows almost to a stop on hover. Static for reduced-motion users.
 */
export default function Marquee({ words = WORDS }: { words?: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia(REDUCED).matches || !track.current) return;
      const loop = gsap.to(track.current, { xPercent: -50, duration: 48, ease: "none", repeat: -1 });
      let hoverScale = 1;

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 400, 4);
          gsap.to(loop, { timeScale: hoverScale * (1 + v), duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: hoverScale, duration: 1.2, delay: 0.3, ease: "power2.out" });
        },
      });

      gsap.to("[data-marquee-x]", {
        rotate: 360,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      const el = root.current!;
      const enter = () => {
        hoverScale = 0.15;
        gsap.to(loop, { timeScale: hoverScale, duration: 0.8, ease: "power2.out", overwrite: true });
      };
      const leave = () => {
        hoverScale = 1;
        gsap.to(loop, { timeScale: 1, duration: 0.8, ease: "power2.out", overwrite: true });
      };
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      return () => {
        st.kill();
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root },
  );

  const sequence = (copy: number) =>
    words.map((w, i) => (
      <Fragment key={`${copy}-${w}`}>
        <span
          className="whitespace-nowrap"
          style={{
            fontWeight: i % 2 === 0 ? 800 : 300,
            fontStretch: i % 2 === 0 ? "118%" : "72%",
          }}
        >
          {w}
        </span>
        <span data-marquee-x aria-hidden className="mx-[0.18em] inline-block font-light">
          ×
        </span>
      </Fragment>
    ));

  return (
    <div ref={root} className="overflow-hidden py-[clamp(40px,8vh,96px)]">
      <p className="sr-only">{words.join(", ")}</p>
      <div
        ref={track}
        aria-hidden
        className="marquee-track items-center text-[clamp(72px,13vw,240px)] leading-[0.9] tracking-[-0.045em]"
      >
        <span className="flex items-center pr-[0.18em]">{sequence(0)}</span>
        <span className="flex items-center pr-[0.18em]">{sequence(1)}</span>
      </div>
    </div>
  );
}
