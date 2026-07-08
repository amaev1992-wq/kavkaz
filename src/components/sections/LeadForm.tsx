"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import { onLeadFormatPreset } from "@/lib/leadPreset";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import {
  submitLead,
  type InterestedFormat,
  type LandStatus,
} from "@/services/leads";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  city: string;
  landStatus: LandStatus | "";
  format: InterestedFormat | "";
  consent: boolean;
  newsletter: boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  city: "",
  landStatus: "",
  format: "",
  consent: false,
  newsletter: false,
};

/** Маска российского телефона: +7 (XXX) XXX-XX-XX */
function formatRuPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (digits && !digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);

  if (!digits) return "";
  let result = "+7";
  if (digits.length > 1) result += ` (${digits.slice(1, 4)}`;
  if (digits.length >= 4) result += ")";
  if (digits.length > 4) result += ` ${digits.slice(4, 7)}`;
  if (digits.length > 7) result += `-${digits.slice(7, 9)}`;
  if (digits.length > 9) result += `-${digits.slice(9, 11)}`;
  return result;
}

function isValidRuPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("7");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Укажите имя";
  }
  if (!isValidRuPhone(values.phone)) {
    errors.phone = "Укажите телефон в формате +7 (XXX) XXX-XX-XX";
  }
  if (!isValidEmail(values.email)) {
    errors.email = "Укажите корректный email — на него придут материалы";
  }
  if (values.city.trim().length < 2) {
    errors.city = "Укажите город или регион";
  }
  if (!values.landStatus) {
    errors.landStatus = "Выберите вариант";
  }
  if (!values.format) {
    errors.format = "Выберите формат";
  }
  if (!values.consent) {
    errors.consent = "Для отправки заявки необходимо согласие";
  }
  return errors;
}

const inputClass = (hasError: boolean) =>
  `min-h-[52px] w-full border bg-white px-4 text-[16px] text-brand-black outline-none transition-colors placeholder:text-brand-gray/70 focus:border-brand-black ${
    hasError ? "border-brand-red" : "border-line"
  }`;

const labelClass =
  "mb-2 block text-[13px] font-semibold uppercase tracking-[0.1em] text-brand-black/70";

/** «презентацию и концепцию проекта» / «концепцию проекта» — по доступным файлам */
const materialsText = siteConfig.documents.presentation.href
  ? "презентацию и концепцию проекта"
  : "концепцию проекта";

export default function LeadForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedRef = useRef(false);

  // CTA форматов заранее выбирают формат в select
  useEffect(() => {
    return onLeadFormatPreset((format) => {
      setValues((prev) => ({ ...prev, format }));
      setErrors((prev) => ({ ...prev, format: undefined }));
    });
  }, []);

  const markStarted = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("lead_form_start");
    }
  };

  const setField = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) => {
    markStarted();
    setValues((prev) => ({ ...prev, [field]: value }));
    // Ошибка поля снимается при исправлении
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setField("phone", formatRuPhone(event.target.value));
  };

  const handlePhoneBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value && !isValidRuPhone(event.target.value)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Укажите телефон в формате +7 (XXX) XXX-XX-XX",
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    trackEvent("lead_form_submit");
    setStatus("loading");

    const result = await submitLead({
      name: values.name.trim(),
      phone: values.phone,
      email: values.email.trim(),
      city: values.city.trim(),
      landStatus: values.landStatus as LandStatus,
      format: values.format as InterestedFormat,
      newsletterConsent: values.newsletter,
      company: honeypot || undefined,
      page: typeof window !== "undefined" ? window.location.href : undefined,
    });

    if (result.ok) {
      trackEvent("lead_form_success");
      setStatus("success");
    } else {
      setStatus("idle");
      setSubmitError(result.error ?? "Не удалось отправить заявку.");
    }
  };

  return (
    <section id="lead" className="bg-paper">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Копия слева */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="kicker text-brand-gray">09 — Заявка</p>
              <h2 className="mt-5 max-w-[15ch] text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.01em]">
                Рассчитаем проект под вашу локацию
              </h2>
              <p className="mt-6 max-w-md text-[16px] font-medium leading-relaxed text-brand-black/80">
                Расскажите, где вы планируете открыть станцию. Мы оценим
                исходные данные, обсудим подходящий формат и свяжемся
                с вами — а {materialsText} вы получите сразу после
                отправки заявки.
              </p>
              <ul className="mt-10 space-y-3 border-t border-line pt-6 text-[14px] font-medium text-brand-black/70">
                <li className="font-semibold text-brand-black/80">
                  — {siteConfig.documents.presentation.href
                    ? "Презентация и концепция проекта"
                    : "Концепция проекта"}{" "}
                  — сразу после заявки
                </li>
                <li>— Оценка локации и транспортного потока</li>
                <li>— Подбор формата под бюджет</li>
                <li>— Предварительная модель проекта</li>
              </ul>
            </Reveal>
          </div>

          {/* Форма справа */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="border border-line bg-white p-6 sm:p-10">
                {status === "success" ? (
                  <div
                    role="status"
                    className="flex min-h-[420px] flex-col items-start justify-center"
                  >
                    <span aria-hidden className="block h-1 w-14 bg-brand-red" />
                    <h3 className="mt-6 text-[clamp(1.4rem,2.4vw,2rem)] font-bold leading-tight">
                      Спасибо. Заявка получена.
                    </h3>
                    <p className="mt-4 max-w-md text-[16px] font-medium leading-relaxed text-brand-black/80">
                      Мы свяжемся с вами для обсуждения проекта. А материалы
                      о франшизе можно изучить уже сейчас:
                    </p>
                    <div className="mt-7 flex flex-col gap-3 self-stretch sm:flex-row">
                      {(
                        [
                          siteConfig.documents.presentation,
                          siteConfig.documents.concept,
                        ] as const
                      )
                        .filter((doc) => doc.href)
                        .map((doc) => (
                          <a
                            key={doc.href}
                            href={doc.href}
                            download={doc.downloadName}
                            data-analytics-event="materials_download"
                            onClick={() =>
                              trackEvent("materials_download", { file: doc.href })
                            }
                            className="inline-flex min-h-[52px] items-center justify-center gap-2.5 border border-brand-black/25 px-6 text-[15px] font-semibold text-brand-black transition-colors hover:border-brand-black hover:bg-brand-black hover:text-white"
                          >
                            <svg
                              aria-hidden
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              className="shrink-0"
                            >
                              <path
                                d="M7.5 1v10m0 0L3.5 7m4 4 4-4M1.5 14.5h12"
                                stroke="currentColor"
                                strokeWidth="1.6"
                              />
                            </svg>
                            {doc.label}
                          </a>
                        ))}
                    </div>
                    {/* TODO: после подключения CRM/почтовой рассылки добавить
                        строку «Эти же материалы придут на указанный email» */}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Honeypot: невидимое поле против спам-ботов */}
                    <input
                      type="text"
                      name="company"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="lead-name" className={labelClass}>
                          Имя
                        </label>
                        <input
                          id="lead-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Как к вам обращаться"
                          value={values.name}
                          onChange={(e) => setField("name", e.target.value)}
                          onFocus={markStarted}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "lead-name-error" : undefined}
                          className={inputClass(Boolean(errors.name))}
                        />
                        {errors.name && (
                          <p id="lead-name-error" className="mt-1.5 text-[13px] text-brand-red">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="lead-phone" className={labelClass}>
                          Телефон
                        </label>
                        <input
                          id="lead-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={values.phone}
                          onChange={handlePhoneChange}
                          onBlur={handlePhoneBlur}
                          onFocus={markStarted}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                          className={inputClass(Boolean(errors.phone))}
                        />
                        {errors.phone && (
                          <p id="lead-phone-error" className="mt-1.5 text-[13px] text-brand-red">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="lead-email" className={labelClass}>
                          Email
                        </label>
                        <input
                          id="lead-email"
                          name="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="ivanov@mail.ru"
                          value={values.email}
                          onChange={(e) => setField("email", e.target.value)}
                          onFocus={markStarted}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "lead-email-error" : undefined}
                          className={inputClass(Boolean(errors.email))}
                        />
                        {errors.email ? (
                          <p id="lead-email-error" className="mt-1.5 text-[13px] text-brand-red">
                            {errors.email}
                          </p>
                        ) : (
                          <p className="mt-1.5 text-[13px] leading-snug text-brand-gray">
                            Получите {materialsText} сразу после отправки
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="lead-city" className={labelClass}>
                          Город / регион
                        </label>
                        <input
                          id="lead-city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          placeholder="Где планируете открыть станцию"
                          value={values.city}
                          onChange={(e) => setField("city", e.target.value)}
                          onFocus={markStarted}
                          aria-invalid={Boolean(errors.city)}
                          aria-describedby={errors.city ? "lead-city-error" : undefined}
                          className={inputClass(Boolean(errors.city))}
                        />
                        {errors.city && (
                          <p id="lead-city-error" className="mt-1.5 text-[13px] text-brand-red">
                            {errors.city}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="lead-land" className={labelClass}>
                          Есть ли земельный участок?
                        </label>
                        <select
                          id="lead-land"
                          name="landStatus"
                          value={values.landStatus}
                          onChange={(e) =>
                            setField("landStatus", e.target.value as LandStatus)
                          }
                          onFocus={markStarted}
                          aria-invalid={Boolean(errors.landStatus)}
                          aria-describedby={errors.landStatus ? "lead-land-error" : undefined}
                          className={`${inputClass(Boolean(errors.landStatus))} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%231E1E1E%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_16px_center] bg-no-repeat pr-10 ${
                            values.landStatus === "" ? "text-brand-gray/80" : ""
                          }`}
                        >
                          <option value="" disabled>
                            Выберите вариант
                          </option>
                          <option value="yes">Да</option>
                          <option value="no">Нет</option>
                          <option value="considering">Рассматриваю варианты</option>
                        </select>
                        {errors.landStatus && (
                          <p id="lead-land-error" className="mt-1.5 text-[13px] text-brand-red">
                            {errors.landStatus}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="lead-format" className={labelClass}>
                          Интересующий формат
                        </label>
                        <select
                          id="lead-format"
                          name="format"
                          value={values.format}
                          onChange={(e) =>
                            setField("format", e.target.value as InterestedFormat)
                          }
                          onFocus={markStarted}
                          aria-invalid={Boolean(errors.format)}
                          aria-describedby={errors.format ? "lead-format-error" : undefined}
                          className={`${inputClass(Boolean(errors.format))} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%231E1E1E%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_16px_center] bg-no-repeat pr-10 ${
                            values.format === "" ? "text-brand-gray/80" : ""
                          }`}
                        >
                          <option value="" disabled>
                            Выберите формат
                          </option>
                          <option value="standard">Стандарт</option>
                          <option value="premium">Премиум</option>
                          <option value="rebranding">Ребрендинг</option>
                          <option value="undecided">Не определился</option>
                        </select>
                        {errors.format && (
                          <p id="lead-format-error" className="mt-1.5 text-[13px] text-brand-red">
                            {errors.format}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-7">
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={values.consent}
                          onChange={(e) => setField("consent", e.target.checked)}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={errors.consent ? "lead-consent-error" : undefined}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-brand-red"
                        />
                        <span className="text-[13.5px] leading-relaxed text-brand-black/80">
                          Я согласен на{" "}
                          <a
                            href={siteConfig.legal.personalDataPolicyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 transition-colors hover:text-brand-red"
                          >
                            обработку персональных данных
                          </a>
                        </span>
                      </label>
                      {errors.consent && (
                        <p id="lead-consent-error" className="mt-1.5 text-[13px] text-brand-red">
                          {errors.consent}
                        </p>
                      )}

                      <label className="mt-3 flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={values.newsletter}
                          onChange={(e) => setField("newsletter", e.target.checked)}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-brand-red"
                        />
                        <span className="text-[13.5px] leading-relaxed text-brand-black/80">
                          Согласен получать новости и материалы о франшизе
                          на email <span className="text-brand-gray">(необязательно)</span>
                        </span>
                      </label>
                    </div>

                    {submitError && (
                      <p role="alert" className="mt-5 border border-brand-red/40 bg-brand-red/5 px-4 py-3 text-[14px] text-brand-red">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      data-analytics-event="lead_form_submit"
                      className="mt-8 inline-flex min-h-[56px] w-full items-center justify-center gap-3 bg-brand-red px-8 text-[16px] font-semibold text-white transition-colors hover:bg-[#a80a1d] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                    >
                      {status === "loading" ? (
                        <>
                          <span
                            aria-hidden
                            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                          />
                          Отправляем…
                        </>
                      ) : (
                        <>Получить расчёт проекта</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
