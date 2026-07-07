/**
 * Отправка заявок франшизы.
 *
 * По умолчанию заявки уходят на собственный API сайта (/api/lead),
 * который отправляет письмо на почту компании — настройка провайдера
 * описана в src/app/api/lead/route.ts (Web3Forms или SMTP).
 * NEXT_PUBLIC_LEAD_API_ENDPOINT позволяет перенаправить заявки
 * на внешний endpoint (CRM) без правки кода.
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
  /** Email для отправки презентации и концепции проекта. */
  email: string;
  city: string;
  landStatus: LandStatus;
  format: InterestedFormat;
  /** Согласие на информационную рассылку (необязательное). */
  newsletterConsent?: boolean;
  /** Страница, с которой отправлена заявка. */
  page?: string;
  /** Honeypot-поле для отсечения спам-ботов: люди его не видят и не заполняют. */
  company?: string;
}

export interface LeadResult {
  ok: boolean;
  /** true — endpoint не настроен, отправка выполнена в dev-режиме. */
  simulated?: boolean;
  error?: string;
}

const LEAD_API_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_API_ENDPOINT || "/api/lead";

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  try {
    const response = await fetch(LEAD_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = (await response.json().catch(() => null)) as
      | LeadResult
      | null;

    if (!response.ok || !result?.ok) {
      return {
        ok: false,
        error:
          result?.error ?? `Сервер вернул ошибку ${response.status}`,
      };
    }

    return result;
  } catch {
    return {
      ok: false,
      error: "Не удалось отправить заявку. Проверьте соединение.",
    };
  }
}
