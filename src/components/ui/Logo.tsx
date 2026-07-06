/* eslint-disable @next/next/no-img-element */

/**
 * Логотип «Кавказ-Автогаз».
 *
 * TODO: Официальный файл логотипа из брендбука отсутствует в assets проекта.
 * ПОДКЛЮЧЕНИЕ: положите официальный логотип в public/images/
 * (например /images/logo.svg и /images/logo-white.svg для тёмного фона)
 * и укажите пути ниже. До этого выводится нейтральная текстовая метка —
 * это временный слот, а не замена фирменного логотипа.
 */

const LOGO_SRC: string | undefined = undefined; // "/images/logo.svg"
const LOGO_WHITE_SRC: string | undefined = undefined; // "/images/logo-white.svg"

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
        alt="Кавказ-Автогаз"
        className={`h-9 w-auto ${className}`}
      />
    );
  }

  // Временная текстовая метка до подключения официального логотипа
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 text-[13px] font-bold uppercase leading-none tracking-[0.08em] sm:text-[15px] ${
        inverted ? "text-white" : "text-brand-black"
      } ${className}`}
    >
      Кавказ<span aria-hidden className="text-brand-red">/</span>Автогаз
    </span>
  );
}
