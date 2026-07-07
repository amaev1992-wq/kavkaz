/** Форматы франшизы. Источник: концепция проекта франшизы. */

export type FormatId = "standard" | "premium" | "rebranding";

export interface FranchiseFormat {
  id: FormatId;
  name: string;
  tagline: string;
  investment: string;
  investmentNote: string;
  payback: string;
  paybackNote: string;
  features: string[];
  suitableFor: string[];
  cta: string;
  analyticsEvent: string;
}

export const franchiseFormats: FranchiseFormat[] = [
  {
    id: "standard",
    name: "Стандарт",
    tagline: "Быстрый вход в бизнес АГЗС",
    investment: "от 7 млн ₽",
    investmentNote: "инвестиции",
    payback: "от 2,5 лет",
    paybackNote: "ориентир окупаемости",
    features: [
      "Некапитальный формат",
      "1–2 поста реализации СУГ",
      "Газовые ёмкости от 10 м³",
      "Брендированный операторный модуль",
      "Минимально необходимая инфраструктура",
      "Возможность подключения кофейного и снекового оборудования",
    ],
    suitableFor: [
      "Городские микрорайоны",
      "Локальные зоны",
      "Локации с устойчивым местным спросом",
    ],
    cta: "Рассчитать формат Стандарт",
    analyticsEvent: "format_standard_cta",
  },
  {
    id: "premium",
    name: "Премиум",
    tagline: "Полноценный инфраструктурный объект",
    investment: "от 30 млн ₽",
    investmentNote: "инвестиции",
    payback: "от 5 лет",
    paybackNote: "ориентир окупаемости",
    features: [
      "АГЗС от 2 постов",
      "СУГ как базовый продукт",
      "Возможность реализации бензина и дизельного топлива",
      "Ёмкости от 20 м³",
      "Магазин и кафе",
      "Профессиональная кофейная зона",
      "Полноценный санузел",
      "Дополнительные сервисы в зависимости от локации",
    ],
    suitableFor: [
      "Сильные городские локации",
      "Магистрали",
      "Точки с высоким локальным и транзитным трафиком",
    ],
    cta: "Рассчитать формат Премиум",
    analyticsEvent: "format_premium_cta",
  },
];

export const rebrandingFormat = {
  id: "rebranding" as const,
  name: "Ребрендинг",
  headline: "Уже есть действующая АГЗС или АЗС?",
  description:
    "Проведём технический и коммерческий аудит объекта и определим возможность его включения в сеть «Кавказ-Автогаз».",
  conditions: "Условия и инвестиции рассчитываются индивидуально",
  cta: "Отправить объект на оценку",
  analyticsEvent: "rebranding_cta",
};
