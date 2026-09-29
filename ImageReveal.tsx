"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { REDUCED } from "@/lib/media";

type Props = {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Omit to fill the parent (parent must size it). */
  aspect?: string;
  sizes: string;
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  /** Clip-path wipe on enter. */
  reveal?: boolean;
  /** Scrubbed vertical drift (desktop only). */
  parallax?: boolean;
  /** Logo-derived hover: a single 90° cut + 1:10 taper. */
  cut?: boolean;
  /** Mark as the landing target of the thumbnail-expand transition. */
  flipTarget?: boolean;
  /** Mark as a thumbnail source for the transition. */
  flipSource?: boolean;
};

export default function ImageReveal({
  src,
  alt,
  aspect,
  sizes,
  className = "",
  frameClassName = "",
  priority,
  reveal = true,
  parallax = true,
  cut = false,
  flipTarget,
  flipSource,
}: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const o = outer.current;
      const i = inner.current;
      if (!o || !i || window.matchMedia(REDUCED).matches) return;

      if (reveal) {
        gsap.fromTo(
          o,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: { trigger: o, start: "top 92%", once: true },
          },
        );
        gsap.from(i.firstElementChild, {
          scale: 1.18,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: { trigger: o, start: "top 92%", once: true },
          clearProps: "transform",
        });
      }

      if (parallax) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          gsap.fromTo(
            i,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: o, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      }
    },
    { scope: outer },
  );

  return (
    <div
      ref={outer}
      className={`relative ${className}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
      data-reveal={reveal ? "image" : undefined}
      data-flip-target={flipTarget ? "" : undefined}
      data-flip-source={flipSource ? "" : undefined}
    >
      <div className={`frame absolute inset-0 ${cut ? "frame-cut" : ""} ${frameClassName}`}>
        <div ref={inner} className={`absolute inset-x-0 ${parallax ? "-top-[6%] h-[112%]" : "inset-y-0"}`}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={80} className="object-cover" />
        </div>
      </div>
    </div>
  );
}
