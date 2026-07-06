import Reveal from "@/components/ui/Reveal";
import CtaLink from "@/components/ui/CtaLink";
import { partnerCapabilities } from "@/data/capabilities";

/**
 * Что получает партнёр: sticky-заголовок слева, прокручиваемый
 * список направлений поддержки справа — вместо девяти одинаковых карточек.
 */
export default function PartnerSystem() {
  return (
    <section id="system" className="bg-white">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Sticky-колонка */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="kicker text-brand-gray">04 — Система</p>
                <h2 className="mt-5 max-w-[14ch] text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.01em]">
                  Вы открываете станцию. Мы передаём систему.
                </h2>
                <p className="mt-6 max-w-md text-[16px] leading-relaxed text-brand-black/70">
                  Франчайзи получает доступ к модели, которую мы используем
                  на собственных объектах: стандарты сети, регламенты
                  и операционную модель — по каждому направлению работы станции.
                </p>
                <div className="mt-8 hidden lg:block">
                  <CtaLink href="#lead" variant="secondary">
                    Обсудить открытие станции
                  </CtaLink>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Направления поддержки */}
          <div className="lg:col-span-7">
            <ul className="border-t border-line">
              {partnerCapabilities.map((capability, index) => (
                <Reveal
                  as="li"
                  key={capability.index}
                  delay={0.03 * index}
                  className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-6 transition-colors sm:gap-x-8 lg:py-7"
                >
                  <span
                    aria-hidden
                    className="num pt-1 text-[13px] font-semibold text-brand-gray transition-colors group-hover:text-brand-red"
                  >
                    {capability.index}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-bold uppercase tracking-[0.04em] sm:text-[19px]">
                      {capability.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-brand-black/70">
                      {capability.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-8 lg:hidden">
              <CtaLink href="#lead" variant="secondary" className="w-full sm:w-auto">
                Обсудить открытие станции
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
