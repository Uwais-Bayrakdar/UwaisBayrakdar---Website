import { ExternalLink } from "lucide-react";
import EmailForm from "./EmailForm";
import { useLanguage } from "../context/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-6 sm:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/10 via-transparent to-transparent" />

        <div className="relative">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">{t.cta.title}</h2>
          <p className="mt-4 leading-relaxed text-zinc-400">{t.cta.body}</p>

          <div className="mt-8">
            <EmailForm />
          </div>

          <div className="my-8 flex items-center gap-4" aria-hidden="true">
            <div className="h-px flex-1 bg-white/[0.08]" />
            <span className="text-sm text-zinc-500">{t.cta.orLabel}</span>
            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <a
            href={t.site.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/[0.12] px-5 font-medium text-zinc-100 transition-colors hover:border-amber-200/40 hover:text-amber-200/90 focus:ring-1 focus:ring-zinc-400 focus:outline-none"
          >
            {t.cta.buy}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}