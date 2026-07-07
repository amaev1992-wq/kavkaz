/* eslint-disable @next/next/no-img-element */

import LogoMark from "@/components/ui/LogoMark";

/**
 * Логотип Kavkaz Autogas — официальный файл (public/images/logo.png).
 * Белая версия для тёмного фона сгенерирована из официального файла
 * (тёмные надписи перекрашены в белый, кольцо и AUTOGAS без изменений).
 * Если пути обнулить, выводится векторная реконструкция (LogoMark + текст).
 */

const LOGO_SRC: string | undefined = "/images/logo.png";
const LOGO_WHITE_SRC: string | undefined = "/images/logo-white.png";

interface LogoProps {
  /** Инверсная версия для тёмного фона. */
  inverted?: boolean;
  className?: string;
}

export default function Logo({ inverted = false, className = "" }: LogoProps) {
  const src = inverted ? (LOGO_WHITE_SRC ?? LOGO_SRC) : LOGO_SRC;

  if (src) {
    return (
      <img
        src={src}
        alt="Kavkaz Autogas"
        className={`h-9 w-auto sm:h-10 ${className}`}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span className="flex flex-col justify-center leading-none" aria-label="Kavkaz Autogas">
        <span
          aria-hidden
          className={`text-[17px] font-extrabold uppercase leading-none tracking-[0.015em] sm:text-[19px] ${
            inverted ? "text-white" : "text-brand-black"
          }`}
        >
          Kavkaz
        </span>
        <span
          aria-hidden
          className="mt-[3px] text-[9.5px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-gray sm:text-[10.5px]"
        >
          Autogas
        </span>
      </span>
    </span>
  );
}
