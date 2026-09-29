"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { REDUCED } from "@/lib/media";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "lines" for statements, "words" for short oversized titles. */
  by?: "lines" | "words";
  /** "scroll" reveals on enter, "load" reveals immediately (hero). */
  on?: "scroll" | "load";
  delay?: number;
  stagger?: number;
  id?: string;
};

/**
 * Masked line / word reveal. Text is fully present in the HTML (SEO + screen
 * readers); only its presentation is animated. With reduced motion it is
 * simply shown.
 */
export default function TextReveal({
  as: Tag = "div",
  children,
  className,
  by = "lines",
  on = "scroll",
  delay = 0,
  stagger,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia(REDUCED).matches) {
        gsap.set(el, { visibility: "visible" });
        return;
      }
      let played = false;
      const split = SplitText.create(el, {
        type: by === "words" ? "words,lines" : "lines",
        mask: by === "words" ? "words" : "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: "visible" });
          const targets = by === "words" ? self.words : self.lines;
          // After the first play, a resize re-split should not replay the animation.
          if (played) return;
          return gsap.from(targets, {
            yPercent: 112,
            duration: 1.25,
            ease: "expo.out",
            stagger: stagger ?? (by === "words" ? 0.06 : 0.09),
            delay,
            onStart: () => {
              played = true;
            },
            scrollTrigger: on === "scroll" ? { trigger: el, start: "top 90%", once: true } : undefined,
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} data-reveal="text" id={id}>
      {children}
    </Tag>
  );
}
