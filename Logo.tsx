import Image from "next/image";

/**
 * The official WEDOO mark, used exactly as supplied (/public/brand/wedoo-logo.png).
 * Never redrawn. `tone="light"` renders it white for ink backgrounds via a colour
 * filter only (geometry untouched). If an official reversed file is supplied,
 * set REVERSED_SRC to use it instead of the filter.
 */
const SRC = "/brand/wedoo-logo.png";
const REVERSED_SRC: string | null = null; // e.g. "/brand/wedoo-logo-white.png"
const W = 388;
const H = 297;

export default function Logo({
  width = 44,
  tone = "dark",
  className = "",
  priority,
}: {
  width?: number;
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  const light = tone === "light";
  return (
    <Image
      src={light && REVERSED_SRC ? REVERSED_SRC : SRC}
      alt="WEDOO"
      width={W}
      height={H}
      priority={priority}
      unoptimized
      style={{ width, height: "auto" }}
      className={`${light && !REVERSED_SRC ? "brightness-0 invert" : ""} transition-[filter] duration-700 ${className}`}
    />
  );
}
