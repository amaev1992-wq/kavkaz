"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * CTA-ссылка (якорная навигация по странице) с единым стилем
 * и разметкой аналитики. Touch target ≥ 44px.
 */
interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "secondary-dark" | "ghost";
  analyticsEvent?: string;
  className?: string;
  onFollow?: () => void;
}

const base =
  "inline-flex min-h-[48px] items-center justify-center gap-2 px-7 text-[15px] font-semibold transition-colors duration-200";

const variants: Record<NonNullable<CtaLinkProps["variant"]>, string> = {
  primary: "bg-brand-red text-white hover:bg-[#a80a1d]",
  secondary:
    "border border-brand-black/25 text-brand-black hover:border-brand-black hover:bg-brand-black hover:text-white",
  "secondary-dark":
    "border border-white/30 text-white hover:border-white hover:bg-white hover:text-brand-black",
  ghost: "text-brand-black underline-offset-4 hover:text-brand-red",
};

export default function CtaLink({
  href,
  children,
  variant = "primary",
  analyticsEvent,
  className = "",
  onFollow,
}: CtaLinkProps) {
  const handleClick = () => {
    if (analyticsEvent) trackEvent(analyticsEvent);
    onFollow?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      data-analytics-event={analyticsEvent}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      <span aria-hidden className="text-[17px] leading-none">→</span>
    </a>
  );
}
