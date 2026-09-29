"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { FINE_POINTER, REDUCED, useMedia } from "@/lib/media";

export type PreviewItem = { id: string; src: string; alt: string };

/**
 * A floating image that trails the cursor while a row is hovered.
 * Desktop pointer only; purely decorative (aria-hidden), the rows carry the content.
 */
export default function HoverPreview({ items, active }: { items: PreviewItem[]; active: string | null }) {
  const enabled = useMedia(FINE_POINTER);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const reduced = window.matchMedia(REDUCED).matches;
    const xTo = gsap.quickTo(el, "x", { duration: reduced ? 0 : 0.7, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: reduced ? 0 : 0.7, ease: "power3" });
    const rTo = gsap.quickTo(el, "rotation", { duration: 0.9, ease: "power3" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      xTo(e.clientX + 28);
      yTo(e.clientY - el.offsetHeight / 2);
      if (!reduced) rTo(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] aspect-[4/5] w-[min(22vw,340px)]"
    >
      <div
        className="relative h-full w-full overflow-hidden transition-[clip-path] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{ clipPath: active ? "inset(0% 0% 0% 0%)" : "inset(50% 50% 50% 50%)" }}
      >
        {items.map((it) => (
          <Image
            key={it.id}
            src={it.src}
            alt=""
            fill
            sizes="340px"
            className="object-cover transition-opacity duration-300"
            style={{ opacity: active === it.id ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}
