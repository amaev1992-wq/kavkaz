# Франшиза «Кавказ-Автогаз» — инвестиционный лендинг

Одностраничный продающий сайт франшизы АГЗС/АЗС «Кавказ-Автогаз».
Цель страницы — заявка на расчёт проекта под конкретную локацию.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion

---

## 1. Запуск локально

```bash
npm install
npm run dev
```

Сайт откроется на http://localhost:3000.

## 2. Production build

```bash
npm run build   # сборка
npm run start   # запуск production-сервера
```

Дополнительно: `npm run lint` (ESLint) и `npm run typecheck` (TypeScript).

## 3. Environment variables

Скопируйте `.env.example` в `.env.local` и заполните:

| Переменная                      | Назначение                                              |
| ------------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Публичный URL страницы (canonical, Open Graph)          |
| `NEXT_PUBLIC_MAIN_SITE_URL`     | Основной сайт компании (ссылка в footer)                |
| `NEXT_PUBLIC_LEAD_API_ENDPOINT` | Endpoint приёма заявок (CRM/backend), см. пункт 8       |

Все переменные читаются в `src/config/site.ts` и `src/services/leads.ts`.

## 4. Как заменить изображения

Реальные фотографии компании в проект не передавались — на их местах
оформленные placeholder-блоки.

1. Положите фото в `public/images/` (список нужных кадров — в
   `public/images/README.md`).
2. Укажите `src` для каждого слота в **`src/data/images.ts`**
   (там же поле `focal` — точка фокуса для `object-fit: cover`).
3. Логотип: пути в **`src/components/ui/Logo.tsx`** (`LOGO_SRC`,
   `LOGO_WHITE_SRC`). До подключения официального файла выводится
   временная текстовая метка.
4. Логотипы поставщиков топлива: `logoSrc` в **`src/data/suppliers.ts`**
   (только официальные файлы при наличии права использования).
5. OG-изображение (1200×630): см. TODO в `src/app/layout.tsx`.

## 5. Как подключить Proxima Nova

Сейчас используется близкий fallback — Montserrat (локально, woff2).

1. Положите файлы Proxima Nova (`.woff2`) в `src/fonts/`.
2. Раскомментируйте блоки `@font-face` в **`src/app/fonts.css`** и
   проверьте имена файлов.
3. Готово — «Proxima Nova» стоит первой в font-stack
   (`--font-sans` в `src/app/globals.css`).

## 6. Где изменить тексты

- Секции страницы: `src/components/sections/*` (Hero, Market, форма и т.д.)
- Header/Footer: `src/components/layout/`
- SEO title/description: `src/config/site.ts` → `seo`
- Юридические данные (реквизиты, ссылки на политику): `src/config/site.ts` → `legal`

## 7. Где изменить статистику и данные

Все повторяющиеся данные вынесены в типизированные структуры:

| Файл                          | Содержимое                                  |
| ----------------------------- | ------------------------------------------- |
| `src/data/stats.ts`           | Ключевые цифры компании (блок «Масштаб»)    |
| `src/data/formats.ts`         | Форматы «Стандарт» / «Премиум» / Ребрендинг |
| `src/data/capabilities.ts`    | Направления поддержки партнёра              |
| `src/data/timeline.ts`        | Этапы запуска (9 шагов)                     |
| `src/data/infrastructure.ts`  | Показатели инфраструктуры                   |
| `src/data/suppliers.ts`       | Поставщики топлива                          |

## 8. Куда приходят заявки с формы

Форма шлёт заявки на собственный API сайта — **`/api/lead`**
(`src/app/api/lead/route.ts`), который отправляет письмо на почту компании.
Настраивается переменными окружения (нужен один способ):

- **Web3Forms (рекомендуется)**: получите ключ на web3forms.com (вводите
  почту — ключ приходит письмом) и задайте `WEB3FORMS_ACCESS_KEY`.
  Письма будут приходить на почту, к которой привязан ключ.
- **SMTP**: задайте `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`,
  `LEAD_EMAIL_TO` — отправка напрямую через ваш почтовый сервер
  (для Gmail нужен app-пароль).

Пока ни один способ не настроен, заявки видны только в серверных логах
(Vercel → Logs), а форма отвечает посетителю успехом.

Подключение CRM: задайте `NEXT_PUBLIC_LEAD_API_ENDPOINT` — форма будет
слать `POST` с JSON-телом `LeadPayload` напрямую на ваш endpoint,
минуя `/api/lead`. Формат тела адаптируется в `submitLead()`
(`src/services/leads.ts`).

Аналитика: ключевые действия размечены `data-analytics-event` и проходят
через `trackEvent()` в `src/lib/analytics.ts` (события:
`hero_cta_click`, `format_standard_cta`, `format_premium_cta`,
`rebranding_cta`, `lead_form_start`, `lead_form_submit`,
`lead_form_success`). Подключение счётчика — в теле `trackEvent`.

## 9. Деплой

Проект не привязан к конкретному хостингу.

**Vercel:** импортируйте репозиторий, задайте environment variables —
больше ничего настраивать не нужно.

**Свой сервер (Node.js):**

```bash
npm ci && npm run build
npm run start   # или через pm2/systemd, порт: -p 3000
```

**Статический экспорт** (если серверные функции не нужны): добавьте
`output: "export"` в `next.config.ts` и раздавайте папку `out/` любым
веб-сервером.

## 10. Custom domain

Предполагаемые варианты размещения:

- `franchise.kavkaz-autogas.ru` — отдельный поддомен (рекомендуется);
- `kavkaz-autogas.ru/franchise` — подпуть за reverse-proxy.

Шаги: направьте DNS (A/CNAME) на хостинг, добавьте домен в панели
хостинга (на Vercel — Settings → Domains), затем укажите итоговый URL в
`NEXT_PUBLIC_SITE_URL`, чтобы canonical и Open Graph ссылались на него.
Для варианта с подпутём добавьте `basePath: "/franchise"` в
`next.config.ts`.

---

## Структура компонентов

```
src/
  app/            layout (SEO, шрифты), page, globals.css
  components/
    layout/       Header, Footer
    sections/     Hero, CompanyStats, Market, Formats, PartnerSystem,
                  LaunchTimeline, Infrastructure, FuelQuality,
                  AssetSection, LeadForm
    ui/           Logo, Reveal, CountUp, MediaSlot, CtaLink
  config/         site.ts — URL, SEO, юридические поля
  data/           типизированные данные секций
  lib/            analytics.ts, leadPreset.ts
  services/       leads.ts — отправка заявок (точка интеграции CRM)
  fonts/          локальные woff2 (+ место для Proxima Nova)
```
