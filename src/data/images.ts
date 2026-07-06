/**
 * Реестр фотографий сайта.
 *
 * Реальные фотографии «Кавказ-Автогаз» в assets проекта отсутствуют,
 * поэтому src у слотов не задан — на их месте выводятся аккуратные
 * placeholder-блоки с подписью (см. components/ui/MediaSlot.tsx).
 *
 * КАК ЗАМЕНИТЬ: положите фотографию в public/images/ и укажите src,
 * например: src: "/images/hero-station-dusk.jpg".
 * Изображения выводятся через object-fit: cover; при необходимости
 * скорректируйте focal (object-position).
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
  "hero" | "infrastructure" | "asset" | "premiumFormat",
  MediaSlotData
> = {
  hero: {
    src: "/images/hero-station-night.jpg",
    alt: "Станция сети «Кавказ-Автогаз» ночью: подсвеченный навес с фирменным логотипом и минимаркет",
    placeholderLabel: "Фото: станция «Кавказ-Автогаз», вечер",
    focal: "50% 42%",
  },

  // TODO: Logistics section — Kavkaz Autogas gas tanker fleet
  // (газовозы компании или газонаполнительная станция)
  infrastructure: {
    alt: "Газовозы логистического парка «Кавказ-Автогаз»",
    placeholderLabel: "Фото: газовозы компании / ГНС",
    focal: "center",
  },

  asset: {
    src: "/images/hero-station-night.jpg",
    alt: "Действующая станция сети «Кавказ-Автогаз» ночью",
    placeholderLabel: "Фото: действующая станция сети, full-width",
    focal: "50% 55%",
  },

  // TODO: Premium format — station with shop and cafe
  // (станция формата «Премиум»: магазин, кафе, навесная группа)
  premiumFormat: {
    alt: "АГЗС формата «Премиум» с магазином и кафе",
    placeholderLabel: "Фото: станция формата «Премиум»",
    focal: "center",
  },
};
