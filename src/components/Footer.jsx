import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { X, ShieldCheck } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-start">
            <p>&copy; {new Date().getFullYear()} {t.site.author}. {t.footer.rights}</p>
            <p>
              {t.footer.privacy}{" "}
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="underline underline-offset-4 hover:text-zinc-300 focus:ring-1 focus:ring-red-500/40 focus:outline-none transition-colors"
              >
                {t.footer.privacyLink}
              </button>
            </p>
          </div>

          <nav aria-label="Social links">
            <ul className="flex gap-5">
              {t.site.socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-red-400 focus:ring-1 focus:ring-red-500/40 focus:outline-none"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowPrivacy(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-2xl text-start"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPrivacy(false)}
              className="absolute end-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                {t.footer.modalBadge}
              </span>
            </div>

            <h3 className="mt-2 text-lg font-bold tracking-tight text-white">
              {t.footer.modalTitle}
            </h3>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-zinc-400">
              <p>{t.footer.modalP1}</p>
              <p>
                {t.footer.modalP2.replace("{title}", t.site.title)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}