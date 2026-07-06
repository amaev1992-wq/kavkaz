/* eslint-disable @next/next/no-img-element */

import Reveal from "@/components/ui/Reveal";
import { fuelSuppliers } from "@/data/suppliers";

/**
 * Качество топлива: стандарт сети и поставщики.
 * Официальные логотипы отсутствуют в assets — выводится аккуратная
 * текстовая логополоса (см. src/data/suppliers.ts, там же инструкция
 * по подключению официальных файлов).
 */
export default function FuelQuality() {
  return (
    <section id="quality" className="bg-white">
      <div className="container-page py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="kicker text-brand-gray">07 — Качество</p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(1.7rem,3.2vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.01em]">
              Качество топлива — стандарт всей сети
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <p className="max-w-lg text-[16px] leading-relaxed text-brand-black/70">
              К реализации допускается проверенное топливо от надёжных
              поставщиков. Каждая партия сопровождается необходимыми
              документами, подтверждающими качество продукта.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-gray">
            Поставки через крупнейших участников рынка
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-5 border-y border-line py-8 sm:gap-x-14">
            {fuelSuppliers.map((supplier) => (
              <li key={supplier.name}>
                {supplier.logoSrc ? (
                  <img
                    src={supplier.logoSrc}
                    alt={supplier.name}
                    className="h-8 w-auto opacity-70 grayscale transition-opacity hover:opacity-100"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-[clamp(1rem,1.8vw,1.35rem)] font-bold uppercase tracking-[0.1em] text-brand-black/35">
                    {supplier.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12.5px] leading-relaxed text-brand-gray">
            Указаны поставщики и крупнейшие участники отрасли, через которых
            обеспечиваются поставки топлива для сети.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
