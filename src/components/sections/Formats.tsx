import Reveal from "@/components/ui/Reveal";
import FormatCta from "@/components/sections/FormatCta";
import MediaSlot from "@/components/ui/MediaSlot";
import { franchiseFormats, rebrandingFormat } from "@/data/formats";
import { images } from "@/data/images";

/**
 * Форматы франшизы: крупная сравнительная композиция.
 * «Стандарт» и «Премиум» — основные форматы (два больших панно,
 * все показатели видны сразу, без hover). «Ребрендинг» — отдельная
 * модель, полноширинная полоса ниже.
 */
export default function Formats() {
  return (
    <section id="formats" className="bg-paper">
      <div className="container-page py-20 lg:py-28">
        <Reveal className="max-w-3xl">
          <p className="kicker text-brand-gray">03 — Форматы</p>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.01em]">
            Выберите формат под вашу локацию и инвестиционный бюджет
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-brand-black/70">
            Два основных формата франшизы — «Стандарт» и «Премиум». Для
            действующих станций работает отдельная модель ребрендинга.
          </p>
        </Reveal>

        {/* Основные форматы */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {franchiseFormats.map((format, index) => {
            const dark = format.id === "premium";
            return (
              <Reveal
                key={format.id}
                delay={0.08 * index}
                className={`flex flex-col overflow-hidden border ${
                  dark
                    ? "border-brand-black bg-brand-black text-white"
                    : "border-line bg-white text-brand-black"
                }`}
              >
                {/* Фото формата */}
                {format.id === "standard" ? (
                  <div className="h-52 sm:h-60 lg:h-64">
                    <MediaSlot data={images.formatStandard} quiet />
                  </div>
                ) : (
                  <div className="grid h-52 grid-cols-[3fr_2fr] gap-px bg-brand-black sm:h-60 lg:h-64">
                    <MediaSlot data={images.formatPremium} quiet />
                    <MediaSlot data={images.storeInterior} quiet />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-8 sm:p-10 lg:p-12">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold uppercase tracking-[0.02em]">
                    {format.name}
                  </h3>
                  <span
                    aria-hidden
                    className={`num text-[13px] font-semibold ${dark ? "text-white/40" : "text-brand-gray"}`}
                  >
                    {format.id === "standard" ? "F–01" : "F–02"}
                  </span>
                </div>
                <p className={`mt-2 text-[15px] ${dark ? "text-white/65" : "text-brand-gray"}`}>
                  {format.tagline}
                </p>

                {/* Ключевые показатели — всегда видимы */}
                <div
                  className={`mt-8 grid grid-cols-2 border-y py-6 ${
                    dark ? "border-white/15" : "border-line"
                  }`}
                >
                  <div className={`${dark ? "border-white/15" : "border-line"} border-r pr-5`}>
                    <p className={`text-[12px] uppercase tracking-[0.14em] ${dark ? "text-white/50" : "text-brand-gray"}`}>
                      {format.investmentNote}
                    </p>
                    <p className="num mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-none">
                      {format.investment}
                    </p>
                  </div>
                  <div className="pl-5">
                    <p className={`text-[12px] uppercase tracking-[0.14em] ${dark ? "text-white/50" : "text-brand-gray"}`}>
                      {format.paybackNote}
                    </p>
                    <p className="num mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-none">
                      {format.payback}
                    </p>
                  </div>
                </div>

                <ul className="mt-7 space-y-2.5">
                  {format.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6em] block h-px w-4 shrink-0 bg-brand-red" />
                      <span className={`text-[14.5px] leading-relaxed ${dark ? "text-white/80" : "text-brand-black/75"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <p className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${dark ? "text-white/50" : "text-brand-gray"}`}>
                    Подходит для
                  </p>
                  <p className={`mt-2 text-[14.5px] leading-relaxed ${dark ? "text-white/80" : "text-brand-black/75"}`}>
                    {format.suitableFor.join(" · ")}
                  </p>
                </div>

                <div className="mt-auto pt-10">
                  <FormatCta
                    format={format.id}
                    analyticsEvent={format.analyticsEvent}
                    variant={dark ? "secondary-dark" : "secondary"}
                    className="w-full sm:w-auto"
                  >
                    {format.cta}
                  </FormatCta>
                </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Ребрендинг действующих станций */}
        <Reveal delay={0.1} className="mt-6">
          <div className="relative border border-line bg-white p-8 sm:p-10 lg:p-12">
            <span aria-hidden className="absolute left-0 top-0 h-full w-1 bg-brand-red" />
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-gray">
                  {rebrandingFormat.name} · отдельная модель
                </p>
                <h3 className="mt-3 text-[clamp(1.4rem,2.4vw,2rem)] font-bold leading-[1.15]">
                  {rebrandingFormat.headline}
                </h3>
                <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-brand-black/70">
                  {rebrandingFormat.description}
                </p>
                <p className="mt-3 text-[14px] text-brand-gray">
                  {rebrandingFormat.conditions}.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <FormatCta
                  format="rebranding"
                  analyticsEvent={rebrandingFormat.analyticsEvent}
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  {rebrandingFormat.cta}
                </FormatCta>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <p className="max-w-3xl text-[13px] leading-relaxed text-brand-gray">
            Каждая станция — индивидуальный инвестиционный проект. Финансовые
            показатели зависят от локации, формата, транспортного потока,
            стоимости топлива, объёмов реализации и проектных решений.
            Указаны ориентировочные значения.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
