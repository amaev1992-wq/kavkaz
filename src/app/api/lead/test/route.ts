import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Диагностика доставки заявок: GET /api/lead/test
 * Реально отправляет пробную заявку через настроенный способ доставки
 * и возвращает сырой ответ провайдера. Ключи не раскрываются.
 */
export async function GET() {
  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) {
    return NextResponse.json({
      ok: false,
      error: "WEB3FORMS_ACCESS_KEY не задан на сервере",
    });
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: "Тест доставки заявок — сайт франшизы",
        from_name: "Сайт франшизы Кавказ-Автогаз",
        name: "Тестовая заявка",
        message:
          "Проверка доставки заявок с сайта. Если вы видите это письмо — всё работает.",
      }),
    });
    const body = await response.json().catch(() => null);
    return NextResponse.json({
      keyPrefix: key.slice(0, 4) + "…",
      providerStatus: response.status,
      providerResponse: body,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, requestError: String(error) });
  }
}
