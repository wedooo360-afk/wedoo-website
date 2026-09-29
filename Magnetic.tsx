"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { FINE_POINTER, REDUCED } from "@/lib/media";

/** Subtle magnetic pull. Pointer-fine devices only, disabled for reduced motion. */
export default function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !window.matchMedia(FINE_POINTER).matches || window.matchMedia(REDUCED).matches) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const reset = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}
