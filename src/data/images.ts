/**
 * Реестр фотографий сайта.
 *
 * КАК ЗАМЕНИТЬ: положите фотографию в public/images/ и укажите src.
 * Изображения выводятся через object-fit: cover; точка фокуса кадра
 * задаётся полем focal (object-position).
 * Если src не задан, на месте фото выводится оформленный placeholder
 * (см. components/ui/MediaSlot.tsx).
 */

export interface MediaSlotData {
  /** Путь к изображению в public/. Не задан — выводится placeholder. */
  src?: string;
  /** Alt-текст изображения. */
  alt: string;
  /** Подпись на placeholder — какое фото здесь должно быть. */
  placeholderLabel: string;
  /** object-position, если фокус кадра не по центру. */
  focal?: string;
}

export const images: Record<
  | "hero"
  | "infrastructure"
  | "asset"
  | "formatStandard"
  | "formatPremium"
  | "storeInterior"
  | "network",
  MediaSlotData
> = {
  hero: {
    src: "/images/hero-station-night.jpg",
    alt: "Станция сети «Кавказ-Автогаз» ночью: подсвеченный навес с фирменным логотипом и минимаркет",
    placeholderLabel: "Фото: станция «Кавказ-Автогаз», вечер",
    focal: "50% 42%",
  },

  infrastructure: {
    src: "/images/logistics-tankers.jpg",
    alt: "Газовозы логистического парка «Кавказ-Автогаз»",
    placeholderLabel: "Фото: газовозы компании / ГНС",
    focal: "50% 45%",
  },

  // Ночной кадр держит full-width; дневная станция (station-asset.jpg)
  // пока 800px — при получении оригинала покрупнее можно заменить src.
  asset: {
    src: "/images/hero-station-night.jpg",
    alt: "Действующая станция сети «Кавказ-Автогаз» ночью",
    placeholderLabel: "Фото: действующая станция сети, full-width",
    focal: "50% 55%",
  },

  formatStandard: {
    src: "/images/format-standard.jpg",
    alt: "АГЗС формата «Стандарт»: операторный модуль и пост реализации СУГ",
    placeholderLabel: "Фото: модульная АГЗС формата «Стандарт»",
    focal: "50% 55%",
  },

  formatPremium: {
    src: "/images/format-premium.jpg",
    alt: "Станция формата «Премиум» с кофейней и магазином",
    placeholderLabel: "Фото: станция формата «Премиум»",
    focal: "55% 45%",
  },

  storeInterior: {
    src: "/images/store-interior.jpg",
    alt: "Минимаркет на станции сети: напитки, снеки и кофейная зона",
    placeholderLabel: "Фото: минимаркет / кофейная зона",
    focal: "45% 50%",
  },

  network: {
    src: "/images/station-asset.jpg",
    alt: "АЗС сети «Кавказ-Автогаз» днём",
    placeholderLabel: "Фото: станция сети днём",
    focal: "50% 45%",
  },
};
