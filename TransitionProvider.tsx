"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReduced } from "@/lib/media";
import { useLenis } from "./SmoothScroll";

type NavigateOptions = {
  /** Element holding the thumbnail. If given, the image expands into the next page's hero. */
  source?: HTMLElement | null;
};

type Pending = { mode: "wipe" | "flip"; hash?: string };

const TransitionContext = createContext<(href: string, opts?: NavigateOptions) => void>(() => {});
export const useTransitionNavigate = () => useContext(TransitionContext);

/**
 * Page transitions.
 *  - "flip": a project thumbnail expands to fill the screen, the route changes
 *    underneath, then the image settles into the case-study hero ([data-flip-target]).
 *  - "wipe": an ink panel carrying the logo's cuts on its leading edge sweeps
 *    up over the page, the route changes, and it continues upward to reveal.
 * Both fall back to an instant route change for reduced-motion users.
 */
export default function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);
  const flip = useRef<HTMLDivElement>(null);
  const flipImg = useRef<HTMLImageElement>(null);
  const pending = useRef<Pending | null>(null);
  const busy = useRef(false);

  const scrollTop = useCallback(() => {
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [lenis]);

  const navigate = useCallback(
    (href: string, opts: NavigateOptions = {}) => {
      const url = new URL(href, window.location.href);
      const samePage = url.pathname === window.location.pathname;

      // Same-page anchor: scroll, don't transition.
      if (samePage && url.hash) {
        const el = document.querySelector(url.hash);
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.4, force: true });
          else el.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth" });
          history.replaceState(null, "", url.hash);
          (el as HTMLElement).focus?.({ preventScroll: true });
        }
        return;
      }
      if (samePage || busy.current) return;

      if (prefersReduced()) {
        router.push(url.pathname + url.hash);
        return;
      }

      busy.current = true;
      lenis?.stop();
      const img = opts.source?.querySelector("img");

      if (opts.source && img && flip.current && flipImg.current) {
        const r = opts.source.getBoundingClientRect();
        flipImg.current.src = img.currentSrc || img.src;
        gsap.set(flip.current, {
          display: "block",
          opacity: 1,
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
        });
        pending.current = { mode: "flip", hash: url.hash || undefined };
        gsap.to(flip.current, {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          duration: 0.95,
          ease: "expo.inOut",
          onComplete: () => router.push(url.pathname, { scroll: false }),
        });
      } else {
        pending.current = { mode: "wipe", hash: url.hash || undefined };
        gsap.set(panel.current, { display: "flex", yPercent: 100 });
        gsap.to(panel.current, {
          yPercent: 0,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => router.push(url.pathname, { scroll: false }),
        });
        gsap.fromTo(
          panel.current!.querySelector("[data-panel-logo]"),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.4, ease: "power2.out" },
        );
      }
    },
    [lenis, router],
  );

  // The new route has rendered: finish whichever transition is in flight.
  useEffect(() => {
    const p = pending.current;
    if (!p) return;
    pending.current = null;

    scrollTop();

    const finish = () => {
      busy.current = false;
      lenis?.start();
      ScrollTrigger.refresh();
    };

    const settle = () => {
      if (p.hash) {
        const el = document.querySelector(p.hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, y);
          lenis?.scrollTo(y, { immediate: true, force: true });
        }
      }

      if (p.mode === "flip" && flip.current) {
        const target = document.querySelector<HTMLElement>("[data-flip-target]");
        if (!target) {
          gsap.to(flip.current, { opacity: 0, duration: 0.5, onComplete: () => { gsap.set(flip.current, { display: "none" }); finish(); } });
          return;
        }
        const r = target.getBoundingClientRect();
        const targetImg = target.querySelector("img");
        const reveal = () =>
          gsap.to(flip.current, {
            opacity: 0,
            duration: 0.35,
            ease: "power1.out",
            onComplete: () => {
              gsap.set(flip.current, { display: "none" });
              finish();
            },
          });
        gsap.to(flip.current, {
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
          duration: 0.9,
          ease: "expo.inOut",
          onComplete: () => {
            if (!targetImg || targetImg.complete) return reveal();
            const t = window.setTimeout(reveal, 1200);
            targetImg.addEventListener("load", () => { window.clearTimeout(t); reveal(); }, { once: true });
          },
        });
      } else {
        gsap.to(panel.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "power3.inOut",
          delay: 0.05,
          onComplete: () => {
            gsap.set(panel.current, { display: "none" });
            finish();
          },
        });
      }
    };

    // Two frames: let the new page lay out before measuring.
    requestAnimationFrame(() => requestAnimationFrame(settle));
  }, [pathname, lenis, scrollTop]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}

      {/* Wipe panel: top edge carries the logo's two cuts, bottom edge its single rising cut. */}
      <div
        ref={panel}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 z-[80] hidden items-center justify-center bg-mass"
        style={{
          top: "-12vh",
          height: "124vh",
          clipPath:
            "polygon(0 0, calc(35.6% - 6vh) 0, 35.6% 6vh, calc(35.6% + 6vh) 0, calc(64.4% - 6vh) 0, 64.4% 6vh, calc(64.4% + 6vh) 0, 100% 0, 100% 100%, calc(50% + 6vh) 100%, 50% calc(100% - 6vh), calc(50% - 6vh) 100%, 0 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-panel-logo
          src="/brand/wedoo-logo.png"
          alt=""
          width={388}
          height={297}
          className="invisible w-12 brightness-0 invert"
        />
      </div>

      <div
        ref={flip}
        aria-hidden="true"
        className="pointer-events-none fixed z-[80] hidden overflow-hidden bg-paper-2"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={flipImg} alt="" className="h-full w-full object-cover" />
      </div>
    </TransitionContext.Provider>
  );
}
