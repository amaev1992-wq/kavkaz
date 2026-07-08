import Reveal from "@/components/ui/Reveal";

const marketPoints = [
  "СУГ может быть существенно дешевле бензина — экономическая выгода стимулирует перевод автомобилей на газ.",
  "Активный спрос формируют такси, доставка и коммерческий транспорт с большими суточными пробегами.",
  "Инфраструктура СУГ в России развита: топливо, оборудование и компетенции доступны на рынке.",
  "АГЗС — реальный инфраструктурный объект с долгим жизненным циклом, а не сезонная бизнес-идея.",
];

/**
 * Почему рынок СУГ: крупная типографика + сдержанное сравнение
 * «бензин vs СУГ» без неподтверждённых цен.
 */
export default function Market() {
  return (
    <section id="market" className="bg-white">
      <div className="container-page py-20 lg:py-28">
        <Reveal>
          <p className="kicker text-brand-gray">02 — Почему рынок СУГ</p>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="max-w-[20ch] text-[clamp(1.9rem,4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.01em]">
                Когда экономия становится очевидной, водитель{" "}
                <span className="text-brand-red">выбирает газ</span>
              </h2>
            </Reveal>

            <ul className="mt-10 max-w-xl">
              {marketPoints.map((point, index) => (
                <Reveal
                  as="li"
                  key={point}
                  delay={0.06 * index}
                  className="flex gap-4 border-t border-line py-5 first:border-t-0"
                >
                  <span aria-hidden className="mt-[0.55em] block h-px w-6 shrink-0 bg-brand-red" />
                  <p className="text-[15.5px] font-medium leading-relaxed text-brand-black/85">
                    {point}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Сравнение без конкретных цен */}
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <div className="flex h-full flex-col justify-between border border-line bg-paper p-8 lg:p-10">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-gray">
                  Стоимость топлива
                </p>
                <div className="mt-8 space-y-8">
                  <div>
                    <p className="text-[15px] font-semibold uppercase tracking-[0.08em] text-brand-black/60">
                      Бензин
                    </p>
                    <div aria-hidden className="mt-3 h-[3px] w-full bg-brand-black/25" />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold uppercase tracking-[0.08em] text-brand-black">
                      СУГ <span className="text-brand-red">— ниже</span>
                    </p>
                    <div aria-hidden className="mt-3 h-[3px] w-3/5 bg-brand-red" />
                  </div>
                </div>
              </div>
              <p className="mt-10 border-t border-line pt-6 text-[14px] font-medium leading-relaxed text-brand-black/75">
                При существенной разнице в стоимости топлива использование СУГ
                становится экономически привлекательным для автомобилиста.
                Конкретная экономия зависит от региона и рассчитывается
                в рамках проекта.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
