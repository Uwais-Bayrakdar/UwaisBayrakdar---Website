import { useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Title */}
        <a
          href="#top"
          onClick={closeMenu}
          className="font-serif text-base sm:text-lg font-semibold tracking-tight text-zinc-100 hover:text-white transition-colors focus:ring-1 focus:ring-red-500/40 focus:outline-none truncate max-w-[220px]"
        >
          {t.site.title}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#preview"
            className="rounded-lg border border-white/[0.1] px-3.5 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:border-red-500/40 hover:text-red-400 focus:ring-1 focus:ring-red-500/40 focus:outline-none"
          >
            {t.nav.cta}
          </a>
          <LanguageSwitcher />
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex md:hidden items-center justify-center p-2 rounded-lg text-zinc-300 hover:text-white bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition focus:outline-none"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-800/80 bg-zinc-950/95 px-5 py-5 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                {t.nav?.languageLabel || "Language"}
              </span>
              <LanguageSwitcher />
            </div>

            <a
              href="#preview"
              onClick={closeMenu}
              className="w-full text-center rounded-xl bg-zinc-100 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}