import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-serif text-lg font-semibold tracking-tight text-zinc-100 focus:ring-1 focus:ring-zinc-400 focus:outline-none">
          {t.site.title}
        </a>
        <a
          href="#preview"
          className="rounded-md border border-white/[0.1] px-3.5 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:border-amber-200/40 hover:text-amber-200/90 focus:ring-1 focus:ring-zinc-400 focus:outline-none"
        >
          {t.nav.cta}
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
}