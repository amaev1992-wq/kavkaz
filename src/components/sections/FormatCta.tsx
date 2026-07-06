"use client";

import CtaLink from "@/components/ui/CtaLink";
import { presetLeadFormat } from "@/lib/leadPreset";
import type { InterestedFormat } from "@/services/leads";

/**
 * CTA формата: ведёт к форме заявки и заранее выбирает
 * соответствующий формат в select.
 */
interface FormatCtaProps {
  format: InterestedFormat;
  analyticsEvent: string;
  variant?: "primary" | "secondary" | "secondary-dark";
  className?: string;
  children: React.ReactNode;
}

export default function FormatCta({
  format,
  analyticsEvent,
  variant = "secondary",
  className,
  children,
}: FormatCtaProps) {
  return (
    <CtaLink
      href="#lead"
      variant={variant}
      analyticsEvent={analyticsEvent}
      className={className}
      onFollow={() => presetLeadFormat(format)}
    >
      {children}
    </CtaLink>
  );
}
