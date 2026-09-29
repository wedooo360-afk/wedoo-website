"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribeTo(query: string) {
  return (cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  };
}

/** Hydration-safe media query hook. Server snapshot is always `false`. */
export function useMedia(query: string) {
  const subscribe = useCallback((cb: () => void) => subscribeTo(query)(cb), [query]);
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const REDUCED = "(prefers-reduced-motion: reduce)";

export function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED).matches;
}
export function hasFinePointer() {
  return typeof window !== "undefined" && window.matchMedia(FINE_POINTER).matches;
}
