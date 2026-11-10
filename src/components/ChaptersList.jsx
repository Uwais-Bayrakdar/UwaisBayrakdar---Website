import { useLanguage } from "../context/LanguageContext";

export default function ChaptersList() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-white/[0.06] bg-zinc-950/40 px-5 py-20">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t.site.title}
          </h2>
          <p className="mt-2 text-xs text-zinc-500 font-mono">
            {t.chaptersSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-start">
          {t.chapters.map((title, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-lg border border-zinc-800/80 bg-zinc-900/30 px-3.5 py-2.5 text-xs text-zinc-300"
            >
              <span className="font-mono text-zinc-600 shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="truncate">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}