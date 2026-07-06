/** Показатели инфраструктуры компании. Источник: концепция проекта франшизы. */

export interface InfrastructureItem {
  title: string;
  value: string;
}

export const infrastructureItems: InfrastructureItem[] = [
  {
    title: "Собственная логистика",
    value: "16 газовозов",
  },
  {
    title: "Газонаполнительная инфраструктура",
    value: "1 800 м³",
  },
  {
    title: "Прямое присутствие на рынке",
    value: "участник биржевой торговли",
  },
  {
    title: "Розничная экспертиза",
    value: "14 действующих АГЗС/АЗС",
  },
];
