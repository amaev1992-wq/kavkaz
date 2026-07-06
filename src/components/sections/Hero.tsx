"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import MediaSlot from "@/components/ui/MediaSlot";
import CtaLink from "@/components/ui/CtaLink";
import { images } from "@/data/images";

const textReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Лёгкий parallax фона при прокрутке
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-brand-black text-white"
    >
      {/* Фон: фото станции (слот) + медленный scale при загрузке */}
      <motion.div
        aria-hidden={false}
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: backgroundY }}
        initial={reduceMotion ? false : { scale: 1.07 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <MediaSlot data={images.hero} quiet />
      </motion.div>

      {/* Overlay для читаемости текста */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(30,30,30,0.35) 0%, rgba(30,30,30,0.15) 40%, rgba(20,20,20,0.82) 100%)",
        }}
      />

      <div className="container-page relative pb-16 pt-36 sm:pb-20 lg:pb-24">
        <motion.p
          custom={0}
          variants={textReveal}
          initial={reduceMotion ? "visible" : "hidden"}
          animate="visible"
          className="mb-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/75"
        >
          <span aria-hidden className="block h-px w-8 bg-brand-red" />
          Франшиза · 20 лет в отрасли СУГ
        </motion.p>

        <motion.h1
          custom={1}
          variants={textReveal}
          initial={reduceMotion ? "visible" : "hidden"}
          animate="visible"
          className="max-w-[17ch] text-[clamp(1.8rem,6.2vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.01em]"
        >
          Откройте собственную АГЗС под брендом «Кавказ&#8209;Автогаз»
        </motion.h1>

        <motion.p
          custom={2}
          variants={textReveal}
          initial={reduceMotion ? "visible" : "hidden"}
          animate="visible"
          className="mt-6 max-w-xl text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-white/80"
        >
          Проверенная на собственных объектах модель запуска и управления
          автогазозаправочной станцией — от выбора локации до стабильной
          операционной работы.
        </motion.p>

        <motion.div
          custom={3}
          variants={textReveal}
          initial={reduceMotion ? "visible" : "hidden"}
          animate="visible"
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <CtaLink href="#lead" analyticsEvent="hero_cta_click">
            Получить расчёт проекта
          </CtaLink>
          <CtaLink href="#formats" variant="secondary-dark">
            Смотреть форматы
          </CtaLink>
        </motion.div>
      </div>
    </section>
  );
}
