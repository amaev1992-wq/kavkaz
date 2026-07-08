import Reveal from "@/components/ui/Reveal";
import { launchSteps } from "@/data/timeline";

/**
 * Путь от заявки до открытия: выразительная вертикальная timeline
 * с крупной нумерацией. На desktop — просторная сетка с осевой линией,
 * на mobile — чёткая вертикальная последовательность.
 */
export default function LaunchTimeline() {
  return (
    <section id="launch" className="bg-paper">
      <div className="container-page py-20 lg:py-28">
        <Reveal className="max-w-3xl">
          <p className="kicker text-brand-gray">05 — Запуск</p>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.01em]">
            Путь от заявки до открытия станции
          </h2>
        </Reveal>

        <ol className="relative mt-14 lg:mt-20">
          {/* Осевая линия */}
          <span
            aria-hidden
            className="absolute bottom-0 left-[7px] top-2 w-px bg-line lg:left-1/2"
          />

          {launchSteps.map((step, index) => {
            const isEven = index % 2 === 1;
            return (
              <Reveal
                as="li"
                key={step.index}
                delay={0.04 * index}
                className={`relative pb-12 pl-10 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-x-20 lg:pb-16 lg:pl-0 ${
                  isEven ? "" : ""
                }`}
              >
                {/* Точка на оси */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-2 h-[15px] w-[15px] border-2 bg-paper lg:left-1/2 lg:-translate-x-1/2 ${
                    index === launchSteps.length - 1
                      ? "border-brand-red bg-brand-red"
                      : "border-brand-red"
                  }`}
                />

                <div
                  className={`lg:pt-0 ${
                    isEven
                      ? "lg:col-start-2 lg:pl-16"
                      : "lg:col-start-1 lg:pr-16 lg:text-right"
                  }`}
                >
                  <p
                    aria-hidden
                    className="num text-[clamp(2.4rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.02em] text-brand-black/10"
                  >
                    {step.index}
                  </p>
                  <h3 className="mt-2 text-[18px] font-bold uppercase tracking-[0.04em] sm:text-[20px]">
                    <span className="sr-only">Этап {step.index}. </span>
                    {step.title}
                  </h3>
                  <p
                    className={`mt-2 max-w-md text-[14.5px] font-medium leading-relaxed text-brand-black/80 ${
                      isEven ? "" : "lg:ml-auto"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
