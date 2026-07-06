/**
 * Отправка заявок франшизы.
 *
 * TODO: Connect franchise lead form to production CRM/API endpoint.
 * Задайте NEXT_PUBLIC_LEAD_API_ENDPOINT в environment variables —
 * форма начнёт отправлять POST-запросы с JSON-телом LeadPayload.
 * При необходимости адаптируйте формат тела под вашу CRM
 * (Bitrix24, amoCRM, собственный backend) прямо в этой функции.
 */

export type LandStatus = "yes" | "no" | "considering";
export type InterestedFormat =
  | "standard"
  | "premium"
  | "rebranding"
  | "undecided";

export interface LeadPayload {
  name: string;
  phone: string;
  city: string;
  landStatus: LandStatus;
  format: InterestedFormat;
  /** Страница, с которой отправлена заявка. */
  page?: string;
}

export interface LeadResult {
  ok: boolean;
  /** true — endpoint не настроен, отправка выполнена в dev-режиме. */
  simulated?: boolean;
  error?: string;
}

const LEAD_API_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_API_ENDPOINT;

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  // Endpoint не задан: реальной отправки НЕ происходит.
  // Заявка логируется в консоль, форма показывает успешное состояние,
  // чтобы UX-поток можно было проверить до подключения CRM.
  if (!LEAD_API_ENDPOINT) {
    console.warn(
      "[leads] NEXT_PUBLIC_LEAD_API_ENDPOINT не задан — заявка НЕ отправлена на сервер (dev-режим).",
      payload,
    );
    // Небольшая задержка, чтобы состояние loading было видно при проверке.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { ok: true, simulated: true };
  }

  try {
    const response = await fetch(LEAD_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `Сервер вернул ошибку ${response.status}`,
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Не удалось отправить заявку. Проверьте соединение.",
    };
  }
}
