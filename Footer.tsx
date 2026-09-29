"use client";

import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";
import { prefersReduced } from "@/lib/media";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import { useLenis } from "./SmoothScroll";

/** Minimal footer. Lives inside the contact block (the ink mass). */
export default function Footer() {
  const lenis = useLenis();
  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <footer className="wrap grid-12 items-end gap-y-8 border-t border-white/15 pb-8 pt-8 md:pb-10">
      <div className="col-span-2 flex items-end gap-5 md:col-span-3 lg:col-span-4">
        <Logo width={40} tone="light" />
        <p className="t-label leading-relaxed">
          {site.name} &copy; {site.year}
          <br />
          <span className="text-white/60">{site.descriptor}</span>
        </p>
      </div>
      <ul className="t-label col-span-2 flex flex-col gap-1.5 md:col-span-3 md:flex-row md:gap-6 lg:col-start-6 lg:col-span-4">
        {site.social.map((s) => (
          <li key={s.label}>
            <a href={s.href} className="u-link">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="col-span-4 md:col-span-2 md:justify-self-end lg:col-span-3">
        <Magnetic>
          <button type="button" onClick={toTop} className="t-label group inline-flex items-center gap-2" data-cursor="arrow">
            Back to top
            <ArrowUp aria-hidden size={14} strokeWidth={1.6} className="transition-transform duration-500 group-hover:-translate-y-1" />
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
