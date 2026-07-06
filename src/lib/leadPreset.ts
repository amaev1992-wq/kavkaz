"use client";

import type { InterestedFormat } from "@/services/leads";

/**
 * Передача выбранного формата в форму заявки:
 * CTA форматов («Рассчитать формат Стандарт» и т.д.) прокручивают страницу
 * к форме и заранее выбирают соответствующий пункт в select.
 */

const EVENT_NAME = "lead-form:preset";

export function presetLeadFormat(format: InterestedFormat): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<{ format: InterestedFormat }>(EVENT_NAME, {
      detail: { format },
    }),
  );
}

export function onLeadFormatPreset(
  handler: (format: InterestedFormat) => void,
): () => void {
  const listener = (event: Event) => {
    const custom = event as CustomEvent<{ format: InterestedFormat }>;
    if (custom.detail?.format) handler(custom.detail.format);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
