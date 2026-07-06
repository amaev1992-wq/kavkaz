"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Сдержанный count-up: число «догоняет» значение при появлении во viewport.
 * При prefers-reduced-motion сразу показывается финальное значение.
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
  return new Intl.NumberFormat("ru-RU").format(n).replace(/ /g, " ");
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
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

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
