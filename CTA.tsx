import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";
import TransitionLink from "./TransitionLink";

/** Typographic call to action: text + arrow on a hairline. No fills, no pills. */
export default function CTA({
  href,
  children,
  className = "",
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <Magnetic>
      <TransitionLink
        href={href}
        data-cursor="arrow"
        className={`cta ${size === "lg" ? "t-h3" : "text-[17px]"} ${className}`}
      >
        <span>{children}</span>
        <ArrowRight aria-hidden className="cta-arrow" size={size === "lg" ? 32 : 18} strokeWidth={1.5} />
      </TransitionLink>
    </Magnetic>
  );
}
