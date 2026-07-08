import Logo from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";

const footerNav = [
  { href: "#about", label: "О франшизе" },
  { href: "#formats", label: "Форматы" },
  { href: "#system", label: "Что вы получаете" },
  { href: "#launch", label: "Этапы запуска" },
  { href: "#lead", label: "Получить расчёт" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white">
      <div className="container-page py-14 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo inverted />
            <p className="mt-4 text-[14px] leading-relaxed text-white/55">
              Франшиза автогазозаправочных станций. Сеть «Кавказ-Автогаз»
              работает в отрасли СУГ с 2006 года.
            </p>
          </div>

          <nav aria-label="Навигация по странице">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-1">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-[32px] items-center text-[14px] text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 text-[14px]">
            <a
              href={siteConfig.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[32px] items-center text-white/70 transition-colors hover:text-white"
            >
              Основной сайт компании ↗
            </a>
            <a
              href={siteConfig.legal.personalDataPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[32px] items-center text-white/70 transition-colors hover:text-white"
            >
              Политика обработки персональных данных
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} «Кавказ-Автогаз». Все права защищены.</p>
          {siteConfig.legal.requisites ? (
            <p>{siteConfig.legal.requisites}</p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
