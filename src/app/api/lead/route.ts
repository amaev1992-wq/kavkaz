import { NextResponse } from "next/server";
import type { LeadPayload } from "@/services/leads";

/**
 * Приём заявок с формы: POST /api/lead
 *
 * Заявка отправляется письмом на почту компании одним из способов
 * (проверяются по порядку):
 *
 * 1. WEB3FORMS_ACCESS_KEY — через сервис web3forms.com (рекомендуется:
 *    бесплатно, письма приходят на почту, привязанную к ключу).
 * 2. SMTP_HOST + SMTP_USER + SMTP_PASS + LEAD_EMAIL_TO — прямая отправка
 *    через любой SMTP (Gmail с app-паролем, Яндекс, Mail.ru, корпоративный).
 *
 * Если ни один способ не настроен, заявка логируется в консоль сервера
 * (видно в Vercel → Logs) и форма получает успешный ответ, чтобы посетитель
 * всё равно получил материалы. Настройте переменные окружения до запуска
 * рекламного трафика!
 */

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

function leadToText(lead: LeadPayload): string {
  return [
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Город / регион: ${lead.city}`,
    `Земельный участок: ${landLabels[lead.landStatus] ?? lead.landStatus}`,
    `Интересующий формат: ${formatLabels[lead.format] ?? lead.format}`,
    `Согласие на рассылку: ${lead.newsletterConsent ? "да" : "нет"}`,
    lead.page ? `Страница: ${lead.page}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Диагностика: GET /api/lead показывает, какой способ доставки настроен
 * (сами ключи и пароли не раскрываются).
 */
export async function GET() {
  const provider = process.env.WEB3FORMS_ACCESS_KEY
    ? "web3forms"
    : process.env.SMTP_HOST &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS &&
        process.env.LEAD_EMAIL_TO
      ? "smtp"
      : "none";
  return NextResponse.json({
    provider,
    hint:
      provider === "none"
        ? "Почтовая доставка не настроена: задайте WEB3FORMS_ACCESS_KEY или SMTP_* в переменных окружения и передеплойте"
        : "Доставка настроена",
  });
}

export async function POST(request: Request) {
  let lead: LeadPayload & { company?: string };
  try {
    lead = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный запрос" },
      { status: 400 },
    );
  }

  // Honeypot: скрытое поле, которое заполняют только спам-боты.
  if (lead.company) {
    return NextResponse.json({ ok: true });
  }

  if (!lead?.name || !lead?.phone || !lead?.email || !lead?.city) {
    return NextResponse.json(
      { ok: false, error: "Заполнены не все обязательные поля" },
      { status: 400 },
    );
  }

  const subject = `Заявка с сайта франшизы: ${lead.name}, ${lead.city}`;
  const text = leadToText(lead);

  // Способ 1: Web3Forms
  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3formsKey) {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject,
          from_name: "Сайт франшизы Кавказ-Автогаз",
          // Reply-To — почта заявителя, чтобы отвечать в один клик
          email: lead.email,
          name: lead.name,
          message: text,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        console.error("[lead] Web3Forms error:", result);
        return NextResponse.json(
          { ok: false, error: "Не удалось отправить заявку" },
          { status: 502 },
        );
      }
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("[lead] Web3Forms request failed:", error);
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить заявку" },
        { status: 502 },
      );
    }
  }

  // Способ 2: SMTP
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_EMAIL_TO } =
    process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS && LEAD_EMAIL_TO) {
    try {
      const nodemailer = await import("nodemailer");
      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT ?? 465),
        secure: Number(SMTP_PORT ?? 465) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      await transport.sendMail({
        from: `"Сайт франшизы Кавказ-Автогаз" <${SMTP_USER}>`,
        to: LEAD_EMAIL_TO,
        replyTo: lead.email,
        subject,
        text,
      });
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("[lead] SMTP send failed:", error);
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить заявку" },
        { status: 502 },
      );
    }
  }

  // Ни один способ не настроен: заявка попадает только в серверный лог.
  console.warn(
    "[lead] Почтовая доставка не настроена (WEB3FORMS_ACCESS_KEY или SMTP_*). Заявка:",
    text.replace(/\n/g, " | "),
  );
  return NextResponse.json({ ok: true, simulated: true });
}
