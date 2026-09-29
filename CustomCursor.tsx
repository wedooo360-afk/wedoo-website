"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { FINE_POINTER, useMedia } from "@/lib/media";

type Mode = "default" | "view" | "arrow" | "drag" | "hide";

/**
 * Desktop-only cursor. Elements opt in with data-cursor="view|arrow|drag|hide"
 * and optionally data-cursor-label="…" (used by "view").
 * Never rendered on touch devices.
 */
export default function CustomCursor() {
  const enabled = useMedia(FINE_POINTER);
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("View");

  useEffect(() => {
    if (!enabled || !root.current) return;
    const el = root.current;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const xTo = gsap.quickTo(el, "x", { duration: 0.38, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.38, ease: "power3" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const next = (t?.dataset.cursor as Mode | undefined) ?? (
        (e.target as Element | null)?.closest("a, button, [role='button'], summary") ? "arrow" : "default"
      );
      setMode(next);
      if (t?.dataset.cursorLabel) setLabel(t.dataset.cursorLabel);
      else if (next === "view") setLabel("View");
    };
    const leave = () => {
      gsap.to(el, { autoAlpha: 0, duration: 0.2 });
      shown = false;
    };
    const down = () => gsap.to(el.firstElementChild, { scale: 0.86, duration: 0.2 });
    const up = () => gsap.to(el.firstElementChild, { scale: 1, duration: 0.35 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  const solid = mode === "view" || mode === "drag";
  const size = mode === "view" || mode === "drag" ? 92 : mode === "arrow" ? 52 : mode === "hide" ? 0 : 10;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] invisible opacity-0"
      style={{ mixBlendMode: solid ? "normal" : "difference" }}
    >
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          width: size,
          height: size,
          background: solid ? "var(--color-paper)" : "#ffffff",
          color: solid ? "var(--color-ink)" : "#000000",
        }}
      >
        {solid && <span className="t-label">{mode === "drag" ? "Drag" : label}</span>}
        {mode === "arrow" && <ArrowUpRight size={18} strokeWidth={1.6} />}
      </div>
    </div>
  );
}
