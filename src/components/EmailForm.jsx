import React, { useState } from "react";
import { Check, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailForm() {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const pdfFileName = t.assets?.previewPdf || "The_Book_of_Shorts_Preview.pdf";
  const interactiveLink = t.assets?.previewLink || "https://dub.sh/tbospreview";

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMessage(t.form.invalid);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("https://formspree.io/f/mwlvppyp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: trimmed,
          language: lang,
          _subject: `New Preview Access: ${t.site.title} (${lang.toUpperCase()})`,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data?.error || t.form.invalid);
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(t.form.networkError);
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-md space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
        <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium">
          <Check className="w-5 h-5 shrink-0" />
          <span>{t.form.successTitle}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          {/* Primary: Dub tracking link to Heyzine */}
          <a
            href={interactiveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 text-sm font-semibold hover:bg-zinc-200 transition-colors"
          >
            {t.form.readPreview}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </a>

          {/* Secondary: Raw PDF download */}
          <a
            href={`${import.meta.env.BASE_URL}${pdfFileName}`}
            download={pdfFileName}
            className="w-full sm:w-auto text-xs text-zinc-400 hover:text-zinc-200 underline underline-offset-4 py-2"
          >
            {t.form.downloadPdf}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={t.form.placeholder}
          className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-medium hover:bg-zinc-200 transition-colors text-sm disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.form.sending}</span>
            </>
          ) : (
            <>
              <span>{t.form.button}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </>
          )}
        </button>
      </form>

      {status === "error" && (
        <div className="mt-2.5 flex items-center gap-2 text-rose-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}