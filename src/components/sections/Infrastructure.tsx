import Reveal from "@/components/ui/Reveal";
import MediaSlot from "@/components/ui/MediaSlot";
import { infrastructureItems } from "@/data/infrastructure";
import { images } from "@/data/images";

/**
 * Инфраструктура и поставки: тёмная секция с фотографией парка
 * газовозов, показателями и выделенным тезисом о происхождении франшизы.
 */
export default function Infrastructure() {
  return (
    <section id="infrastructure" className="bg-brand-black text-white">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="kicker text-white/50">06 — Инфраструктура</p>
              <h2 className="mt-5 max-w-[16ch] text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.01em]">
                Мы знаем топливный бизнес изнутри
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/70">
                «Кавказ-Автогаз» работает одновременно в оптовом сегменте,
                логистике и розничной эксплуатации станций. Этот опыт лежит
                в основе франчайзинговой модели.
              </p>
            </Reveal>

            <dl className="mt-12 grid grid-cols-1 border-t border-white/15 sm:grid-cols-2">
              {infrastructureItems.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={0.05 * index}
                  className="flex flex-col border-b border-white/15 py-6 sm:pr-8"
                >
                  <dt className="order-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    {item.title}
                  </dt>
                  <dd className="order-2 mt-2 text-[clamp(1.25rem,2vw,1.7rem)] font-bold leading-snug">
                    {item.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1} className="h-full">
              <div className="flex h-full min-h-[320px] flex-col">
                <div className="relative min-h-[320px] flex-1 lg:min-h-[420px]">
                  <div className="absolute inset-0">
                    <MediaSlot data={images.infrastructure} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Выделенный тезис */}
        <Reveal delay={0.1} className="mt-16 lg:mt-24">
          <figure className="border-l-2 border-brand-red pl-6 sm:pl-10">
            <blockquote className="max-w-4xl text-[clamp(1.4rem,3vw,2.4rem)] font-bold leading-[1.2] tracking-[-0.01em]">
              Франшиза создана не консультантами. Она выросла из действующего
              топливного бизнеса.
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
