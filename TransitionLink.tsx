"use client";

import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { useTransitionNavigate } from "./TransitionProvider";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  /** CSS selector (inside this link) of the element whose image should expand into the next page. */
  flipFrom?: string;
};

/**
 * Drop-in replacement for next/link that routes through the page transition.
 * Modified clicks (new tab, etc.) and external links behave natively.
 */
const TransitionLink = forwardRef<HTMLAnchorElement, Props>(function TransitionLink(
  { href, children, flipFrom, onClick, ...rest },
  ref,
) {
  const navigate = useTransitionNavigate();
  const external = /^(https?:|mailto:|tel:)/.test(href) || href === "#";

  if (external) {
    return (
      <a ref={ref} href={href} {...rest} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    const source = flipFrom ? (e.currentTarget.querySelector(flipFrom) as HTMLElement | null) : null;
    navigate(href, { source });
  };

  return (
    <Link ref={ref} href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
});

export default TransitionLink;
