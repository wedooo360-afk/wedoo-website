"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { REDUCED } from "@/lib/media";
import { site } from "@/lib/site";
import Logo from "./Logo";
import TransitionLink from "./TransitionLink";
import { useLenis } from "./SmoothScroll";

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const root = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overInk, setOverInk] = useState(false);
  const [inkTheme, setInkTheme] = useState(false);

  // Intro: the mark wipes up, then the links follow.
  useGSAP(
    () => {
      if (window.matchMedia(REDUCED).matches) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo("[data-h-logo]", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.2 }, 0.15)
        .from("[data-h-link]", { yPercent: 110, duration: 1, stagger: 0.06 }, 0.45);
    },
    { scope: root },
  );

  // Hide on scroll down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - last;
        if (Math.abs(delta) > 4) {
          setHidden(delta > 0 && y > 240);
          last = y;
        }
        setScrolled(y > 40);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Follow the page theme (ink zone) and any always-dark block under the header.
  useEffect(() => {
    const html = document.documentElement;
    const mo = new MutationObserver(() => setInkTheme(html.dataset.theme === "ink"));
    mo.observe(html, { attributes: true, attributeFilter: ["data-theme"] });

    const hits = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? hits.add(e.target) : hits.delete(e.target)));
        setOverInk(hits.size > 0);
      },
      { rootMargin: "0px 0px -94% 0px" },
    );
    const t = window.setTimeout(() => {
      document.querySelectorAll("[data-header='dark']").forEach((el) => io.observe(el));
    }, 50);
    return () => {
      mo.disconnect();
      io.disconnect();
      window.clearTimeout(t);
      setOverInk(false);
    };
  }, [pathname]);

  // Close menu on route change.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  // Menu: lock scroll, trap focus lightly, Esc to close, animate in.
  useEffect(() => {
    const main = document.getElementById("main");
    if (!open) {
      main?.removeAttribute("inert");
      lenis?.start();
      return;
    }
    main?.setAttribute("inert", "");
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const menu = menuRef.current;
    if (menu && !window.matchMedia(REDUCED).matches) {
      gsap.fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" });
      gsap.from(menu.querySelectorAll("[data-m-link]"), { yPercent: 110, duration: 1, stagger: 0.06, delay: 0.3, ease: "expo.out" });
    }
    menu?.querySelector<HTMLElement>("a")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const dark = open || overInk || inkTheme;
  const showBg = scrolled && !open;

  return (
    <>
      <header
        ref={root}
        className="fixed inset-x-0 top-0 z-[60] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{ transform: hidden && !open ? "translateY(-110%)" : "none" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 transition-opacity duration-500"
          style={{
            opacity: showBg ? 1 : 0,
            background: dark
              ? "color-mix(in srgb, var(--color-mass) 82%, transparent)"
              : "color-mix(in srgb, var(--bg) 82%, transparent)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        />
        <div
          className={`wrap flex items-center justify-between transition-[padding,color] duration-500 ${
            scrolled ? "py-3.5" : "py-5 md:py-7"
          } ${dark ? "text-paper" : "text-[var(--fg)]"}`}
        >
          <TransitionLink href="/" aria-label="WEDOO, home" className="group block" data-cursor="arrow">
            <span data-h-logo className="block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-0.5">
              <span className="hidden md:block">
                <Logo width={scrolled ? 40 : 48} tone={dark ? "light" : "dark"} priority className="transition-[width]" />
              </span>
              <span className="md:hidden">
                <Logo width={36} tone={dark ? "light" : "dark"} priority />
              </span>
            </span>
          </TransitionLink>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex gap-8 lg:gap-11">
              {site.nav.map((l) => (
                <li key={l.href} className="overflow-hidden py-0.5">
                  <span data-h-link className="block">
                    <TransitionLink
                      href={l.href}
                      className="u-link text-[15px] font-medium tracking-[-0.01em]"
                      aria-current={pathname === l.href ? "page" : undefined}
                    >
                      {l.label}
                    </TransitionLink>
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="t-label -mr-2 p-2 text-[13px] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[55] flex flex-col justify-between bg-mass px-[var(--margin)] pb-8 pt-28 text-paper md:hidden"
        >
          <nav aria-label="Mobile">
            <ul>
              {site.nav.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-white/15">
                  <span data-m-link className="block">
                    <TransitionLink
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-3 text-[15vw] font-extrabold leading-[0.95] tracking-[-0.045em]"
                      style={{ fontStretch: "108%" }}
                    >
                      {l.label}
                      <span className="t-label tnum text-white/50">0{i + 1}</span>
                    </TransitionLink>
                  </span>
                </li>
              ))}
            </ul>
          </nav>
          <div className="t-label flex flex-wrap justify-between gap-4 text-white/70">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span className="flex gap-4">
              {site.social.map((s) => (
                <a key={s.label} href={s.href}>
                  {s.label}
                </a>
              ))}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
