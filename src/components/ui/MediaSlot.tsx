/* eslint-disable @next/next/no-img-element */

import type { MediaSlotData } from "@/data/images";

/**
 * Слот под фотографию. Пока src не задан (см. src/data/images.ts),
 * выводится аккуратный технический placeholder с подписью, какое фото
 * должно стоять на этом месте. После указания src изображение выводится
 * через object-fit: cover с корректной focal position.
 */
interface MediaSlotProps {
  data: MediaSlotData;
  className?: string;
  /** Приглушить подпись placeholder (для фоновых слотов под overlay). */
  quiet?: boolean;
  /** Загружать сразу (для hero-изображения над сгибом). */
  priority?: boolean;
}

export default function MediaSlot({
  data,
  className = "",
  quiet = false,
  priority = false,
}: MediaSlotProps) {
  if (data.src) {
    return (
      <img
        src={data.src}
        alt={data.alt}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition: data.focal ?? "center" }}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={data.alt}
      className={`relative h-full w-full overflow-hidden bg-[#262626] ${className}`}
    >
      {/* Тонкая техническая сетка */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.13]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="media-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#media-grid)" />
      </svg>

      {/* Мягкий световой градиент — имитация вечернего кадра */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 15%, rgba(255,255,255,0.10) 0%, rgba(30,30,30,0) 55%), linear-gradient(180deg, rgba(30,30,30,0.1) 0%, rgba(20,20,20,0.65) 100%)",
        }}
      />

      {/* Угловые метки кадра */}
      <div aria-hidden className="absolute left-4 top-4 h-4 w-4 border-l border-t border-white/30" />
      <div aria-hidden className="absolute right-4 top-4 h-4 w-4 border-r border-t border-white/30" />
      <div aria-hidden className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/30" />
      <div aria-hidden className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/30" />

      {!quiet && (
        <p className="absolute bottom-5 left-6 right-6 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
          {data.placeholderLabel}
        </p>
      )}
    </div>
  );
}
