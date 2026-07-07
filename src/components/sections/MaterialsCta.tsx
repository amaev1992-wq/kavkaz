"use client";

import Reveal from "@/components/ui/Reveal";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

/**
 * Мягкая точка конверсии для посетителей, не готовых запрашивать расчёт:
 * предлагает презентацию и концепцию проекта. Ведёт к общей форме заявки —
 * материалы выдаются после отправки контактов.
 */
export default function MaterialsCta() {
  return (
    <section aria-label="Материалы о франшизе" className="bg-brand-black text-white">
      <div className="container-page py-14 lg:py-16">
        <Reveal>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Материалы проекта
              </p>
              <h2 className="mt-3 text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold leading-[1.15]">
                Хотите изучить проект подробнее?
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-white/70">
                Оставьте заявку — вы получите{" "}
                {siteConfig.documents.presentation.href
                  ? "презентацию франшизы и концепцию проекта"
                  : "концепцию проекта"}
                , а мы подготовим расчёт под вашу локацию.
              </p>
            </div>
            <a
              href="#lead"
              data-analytics-event="materials_cta"
              onClick={() => trackEvent("materials_cta")}
              className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 bg-brand-red px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#a80a1d]"
            >
              Получить материалы
              <span aria-hidden className="text-[17px] leading-none">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
