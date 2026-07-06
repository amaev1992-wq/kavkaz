import Reveal from "@/components/ui/Reveal";
import MediaSlot from "@/components/ui/MediaSlot";
import { images } from "@/data/images";

/**
 * Реальный инфраструктурный актив: full-width композиция
 * с крупной фотографией станции и сильным заявлением.
 */
export default function AssetSection() {
  return (
    <section id="asset" className="relative bg-brand-black text-white">
      {/* Full-width фото станции */}
      <div className="absolute inset-0">
        <MediaSlot data={images.asset} quiet />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,20,20,0.55) 0%, rgba(20,20,20,0.35) 45%, rgba(20,20,20,0.8) 100%)",
          }}
        />
      </div>

      <div className="container-page relative flex min-h-[70svh] flex-col justify-center py-24 lg:min-h-[80svh] lg:py-32">
        <Reveal>
          <p className="kicker text-white/60">08 — Актив</p>
          <h2 className="mt-6 max-w-[18ch] text-[clamp(1.65rem,4.6vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.01em]">
            Не тренд. Не виртуальный продукт.{" "}
            <span className="text-brand-red">Реальный инфраструктурный актив.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-white/80">
            Автозаправочная станция — это объект с долгим жизненным циклом.
            При правильном выборе локации и выстроенной операционной модели
            станция становится управляемым бизнесом, работающим на постоянном
            транспортном спросе.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
