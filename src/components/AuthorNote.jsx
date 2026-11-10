import { useLanguage } from "../context/LanguageContext";

export default function AuthorNote() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-white/[0.06] px-5 py-20">
      <div className="mx-auto max-w-3xl space-y-8 text-start">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {t.author.title}
        </h2>

        <div className="space-y-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
          {t.author.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <blockquote className="border-s-2 border-amber-400/80 ps-4 font-mono text-sm italic text-amber-200/90">
          "{t.author.pullQuote}"
        </blockquote>
      </div>
    </section>
  );
}