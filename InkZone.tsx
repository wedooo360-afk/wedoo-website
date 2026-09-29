"use client";

import { useRef, type ReactNode } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * While this zone fills most of the viewport, the whole page turns to the logo's
 * ink (#0C151A). Without JS the zone simply renders as an ink block.
 */
export default function InkZone({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      const set = (on: boolean) => {
        if (on) html.dataset.theme = "ink";
        else delete html.dataset.theme;
      };
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => set(self.isActive),
      });
      return () => {
        st.kill();
        set(false);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`ink-zone ${className}`}>
      {children}
    </div>
  );
}
