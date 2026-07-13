"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Сдержанный count-up. Принцип progressive enhancement:
 * в разметке сразу стоит ФИНАЛЬНОЕ значение (SEO + гарантия корректного
 * отображения в любых браузерах и WebView), а анимация «пробега» от нуля
 * запускается поверх, только когда блок реально попал во viewport.
 * Если IntersectionObserver не сработал или включён prefers-reduced-motion —
 * посетитель просто видит правильное число.
 */
interface CountUpProps {
  value: number;
  /** Разделители разрядов (1 800). */
  formatted?: boolean;
  duration?: number;
  className?: string;
}

function formatNumber(n: number, formatted: boolean): string {
  if (!formatted) return String(n);
  return new Intl.NumberFormat("ru-RU").format(n).replace(/ /g, " ");
}

export default function CountUp({
  value,
  formatted = false,
  duration = 1.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  // Стартуем с финального значения — «0» не показывается никогда,
  // кроме момента самой анимации.
  const [display, setDisplay] = useState(value);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!inView || reduceMotion || animatedRef.current) return;
    animatedRef.current = true;

    let frame: number;
    const start = performance.now();
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // easeOutQuart — быстро набирает, мягко останавливается
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(display, formatted)}
    </span>
  );
}
