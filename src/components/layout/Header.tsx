"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import { trackEvent } from "@/lib/analytics";

const navItems = [
  { href: "#about", label: "О франшизе" },
  { href: "#formats", label: "Форматы" },
  { href: "#system", label: "Что вы получаете" },
  { href: "#launch", label: "Этапы запуска" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокируем прокрутку фона, пока открыто мобильное меню
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white transition-all duration-300 ${
        scrolled ? "border-line shadow-[0_1px_0_rgba(30,30,30,0.04)]" : "border-transparent"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between gap-3 transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <a
          href="#top"
          aria-label="Кавказ-Автогаз — в начало страницы"
          className="flex min-h-[44px] items-center"
          onClick={closeMenu}
        >
          <Logo />
        </a>

        <nav aria-label="Разделы страницы" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center text-[14px] font-medium text-brand-black/70 transition-colors hover:text-brand-red"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#lead"
            data-analytics-event="hero_cta_click"
            onClick={() => trackEvent("hero_cta_click", { placement: "header" })}
            className={`inline-flex min-h-[44px] items-center bg-brand-red px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#a80a1d] sm:px-5 sm:text-[14px] ${
              scrolled ? "py-2" : "py-2.5"
            }`}
          >
            <span className="hidden min-[360px]:inline">Получить расчёт</span>
            <span className="min-[360px]:hidden">Расчёт</span>
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block h-[2px] w-6 bg-brand-black transition-transform duration-200 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-brand-black transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-brand-black transition-transform duration-200 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${menuOpen ? "block" : "hidden"} border-t border-line bg-white`}
      >
        <nav aria-label="Разделы страницы" className="container-page py-4">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-[52px] items-center text-[16px] font-medium text-brand-black transition-colors hover:text-brand-red"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#lead"
            data-analytics-event="hero_cta_click"
            onClick={() => {
              trackEvent("hero_cta_click", { placement: "mobile_menu" });
              closeMenu();
            }}
            className="mt-4 flex min-h-[52px] items-center justify-center bg-brand-red text-[15px] font-semibold text-white"
          >
            Получить расчёт проекта
          </a>
        </nav>
      </div>
    </header>
  );
}
