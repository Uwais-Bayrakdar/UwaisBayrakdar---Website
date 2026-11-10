import { useLanguage } from "../context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs">
      <Globe className="h-3.5 w-3.5 text-zinc-400" />
      <button
        onClick={() => setLang("en")}
        className={`px-1.5 py-0.5 rounded transition ${
          lang === "en" ? "font-bold text-white bg-zinc-800" : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        EN
      </button>
      <span className="text-zinc-700">|</span>
      <button
        onClick={() => setLang("ar")}
        className={`px-1.5 py-0.5 rounded transition ${
          lang === "ar" ? "font-bold text-white bg-zinc-800" : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        عربي
      </button>
      <span className="text-zinc-700">|</span>
      <button
        onClick={() => setLang("tr")}
        className={`px-1.5 py-0.5 rounded transition ${
          lang === "tr" ? "font-bold text-white bg-zinc-800" : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        TR
      </button>
    </div>
  );
}