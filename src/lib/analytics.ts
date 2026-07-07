/**
 * Аналитика: единая точка отправки событий.
 *
 * SDK аналитики намеренно не подключён. Все ключевые действия размечены
 * data-атрибутами data-analytics-event и продублированы вызовом trackEvent().
 *
 * События:
 *  - hero_cta_click
 *  - format_standard_cta
 *  - format_premium_cta
 *  - rebranding_cta
 *  - materials_cta
 *  - lead_form_start
 *  - lead_form_submit
 *  - lead_form_success
 *  - materials_download
 *
 * Подключение счётчика: добавьте отправку в тело trackEvent —
 * например ym(ID, 'reachGoal', name) или gtag('event', name).
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type AnalyticsEvent =
  | "hero_cta_click"
  | "format_standard_cta"
  | "format_premium_cta"
  | "rebranding_cta"
  | "materials_cta"
  | "lead_form_start"
  | "lead_form_submit"
  | "lead_form_success"
  | "materials_download";

export function trackEvent(
  name: AnalyticsEvent | string,
  payload?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  // Стандартная точка интеграции: dataLayer (GTM) — если он подключён.
  window.dataLayer?.push({ event: name, ...payload });

  // Дополнительно публикуем DOM-событие: на него можно подписаться
  // из любого стороннего скрипта без правки кода компонентов.
  window.dispatchEvent(
    new CustomEvent("analytics", { detail: { name, ...payload } }),
  );

  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics] ${name}`, payload ?? "");
  }
}
