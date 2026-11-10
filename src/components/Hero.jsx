import BookMockup from "./BookMockup";
import EmailForm from "./EmailForm";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <div>
        <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
          {t.hero.headline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">{t.hero.subheadline}</p>

        <div id="preview" className="mt-8 max-w-xl scroll-mt-24">
          <EmailForm id="hero" />
        </div>
      </div>

      <div className="order-first flex justify-center lg:order-none lg:justify-end">
        <BookMockup />
      </div>
    </section>
  );
}