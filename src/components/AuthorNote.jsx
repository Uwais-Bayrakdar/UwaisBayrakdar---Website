import { useLanguage } from "../context/LanguageContext";

export default function AuthorNote() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-white/[0.06] px-5 py-20">
      <div className="mx-auto max-w-3xl space-y-8 text-start">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-serif">
          {t.author.title}
        </h2>

        <div className="space-y-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
          {t.author.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-white/[0.08] bg-zinc-900/40 p-4 sm:p-5 border-s-4 border-s-red-500 transition-colors hover:border-zinc-700">
          <p className="font-serif italic text-sm sm:text-base text-zinc-100 leading-relaxed">
            "{t.author.pullQuote}"
          </p>
        </div>
      </div>
    </section>
  );
}