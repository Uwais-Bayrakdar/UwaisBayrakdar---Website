import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function ChaptersList() {
  const { t } = useLanguage();

  return (
    <section id="chapters" className="py-12 sm:py-20 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif">
            {t.site.title}
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-mono text-zinc-400 tracking-wide">
            {t.chaptersSection?.subtitle || "40 Chapters / 2–3 min each"}
          </p>
        </div>

        {/* Grid: 2 cols on mobile, 3 on tablet, 5 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {t.chapters.map((title, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-start rounded-xl border border-white/[0.08] bg-zinc-900/50 p-3 sm:p-4 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-900 min-h-[96px] sm:min-h-[110px]"
              >
                {/* Chapter Number Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] sm:text-xs font-semibold text-red-500 tracking-wider">
                    {num}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-700/60 group-hover:bg-red-500 transition-colors" />
                </div>

                {/* Chapter Title filling the card */}
                <h3 className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white leading-snug">
                  {title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}