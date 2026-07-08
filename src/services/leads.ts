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

/**
 * Ключ Web3Forms — ПУБЛИЧНЫЙ по дизайну сервиса (он виден в коде страницы,
 * это штатный режим работы web3forms.com). Заявка при этом отправляется
 * из браузера посетителя напрямую в Web3Forms: серверные запросы к их API
 * блокируются антибот-защитой (403).
 * Замена ключа: env NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY приоритетнее константы.
 */
const WEB3FORMS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "80a93c34-6c1d-4889-81ef-929579fc3803";

const landLabels: Record<string, string> = {
  yes: "Да",
  no: "Нет",
  considering: "Рассматривает варианты",
};

const formatLabels: Record<string, string> = {
  standard: "Стандарт",
  premium: "Премиум",
  rebranding: "Ребрендинг",
  undecided: "Не определился",
};

async function submitViaWeb3Forms(
  payload: LeadPayload,
): Promise<LeadResult> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_PUBLIC_KEY,
        subject: `Заявка с сайта франшизы: ${payload.name}, ${payload.city}`,
        from_name: "Сайт франшизы Кавказ-Автогаз",
        // Reply-To — почта заявителя, чтобы отвечать в один клик
        email: payload.email,
        name: payload.name,
        message: [
          `Имя: ${payload.name}`,
          `Телефон: ${payload.phone}`,
          `Email: ${payload.email}`,
          `Город / регион: ${payload.city}`,
          `Земельный участок: ${landLabels[payload.landStatus] ?? payload.landStatus}`,
          `Интересующий формат: ${formatLabels[payload.format] ?? payload.format}`,
          `Согласие на рассылку: ${payload.newsletterConsent ? "да" : "нет"}`,
          payload.page ? `Страница: ${payload.page}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        // honeypot Web3Forms
        botcheck: payload.company || undefined,
      }),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      return {
        ok: false,
        error: `Не удалось отправить заявку${result?.message ? `: ${result.message}` : ""}`,
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

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  // Основной путь: напрямую из браузера в Web3Forms (если ключ задан
  // и не настроен внешний endpoint CRM).
  if (WEB3FORMS_PUBLIC_KEY && !process.env.NEXT_PUBLIC_LEAD_API_ENDPOINT) {
    return submitViaWeb3Forms(payload);
  }

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
