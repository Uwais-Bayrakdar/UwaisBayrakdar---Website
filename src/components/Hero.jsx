import BookMockup from "./BookMockup";
import EmailForm from "./EmailForm";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      {/* Background ambient crimson highlight */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px] lg:left-1/3" />

      {/* Copy & Form Column */}
      <div className="text-center lg:text-start">
        <h1 className="text-balance font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-zinc-100">
          {t.hero.headline}
        </h1>
        <p className="mt-5 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-zinc-400">
          {t.hero.subheadline}
        </p>

        <div id="preview" className="mt-8 max-w-xl mx-auto lg:mx-0 scroll-mt-24 flex justify-center lg:justify-start">
          <EmailForm id="hero" />
        </div>
      </div>

      {/* 3D Book Mockup Column */}
      <div className="order-first flex justify-center lg:order-none lg:justify-end">
        <BookMockup />
      </div>
    </section>
  );
}