import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { companyStats } from "@/data/stats";

/**
 * Масштаб действующего бизнеса: editorial grid с крупными цифрами
 * и тонкими линейками — без карточек и иконок.
 */
export default function CompanyStats() {
  return (
    <section id="about" className="bg-paper">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="kicker text-brand-gray">01 — Масштаб</p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(1.7rem,3.4vw,2.8rem)] font-bold leading-[1.12] tracking-[-0.01em]">
              Бизнес-модель, проверенная на собственных объектах
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <p className="max-w-lg text-[16px] leading-relaxed text-brand-black/70">
              Мы развиваем топливный бизнес с 2006 года — от оптовых поставок
              и логистики до собственной розничной сети АГЗС и АЗС.
            </p>
          </Reveal>
        </div>

        <dl className="mt-14 grid border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {companyStats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={0.05 * index}
              className="flex flex-col border-b border-line py-9 pr-6 sm:[&:nth-child(odd)]:pr-10 lg:py-12"
            >
              <dt className="order-2 mt-3 block max-w-[26ch] text-[14px] leading-snug text-brand-gray">
                {stat.label}
              </dt>
              <dd className="num order-1 text-[clamp(2.6rem,5vw,4.2rem)] font-bold leading-none tracking-[-0.02em] text-brand-black">
                {stat.prefix}
                <CountUp value={stat.value} formatted={stat.formatted} />
                {stat.suffix && (
                  <span className="text-[0.52em] font-semibold text-brand-black/80">
                    {stat.suffix}
                  </span>
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
