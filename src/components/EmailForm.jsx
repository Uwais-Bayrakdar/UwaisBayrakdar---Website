import React, { useState, useEffect, useRef } from "react";
import { Check, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailForm() {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const pdfFileName = t.assets?.previewPdf || "The_Book_of_Shorts_Preview.pdf";
  const interactiveLink = t.assets?.previewLink || "https://uwais-bayrakdar.github.io/tbos_preview_page/";
  const eoContainerRef = useRef(null);

  useEffect(() => {
    const container = eoContainerRef.current;
    if (!container || container.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://eocampaign1.com/form/885c6f00-dd30-11f1-9205-477e378ccfce.js";
    script.async = true;
    script.setAttribute("data-form", "885c6f00-dd30-11f1-9205-477e378ccfce");
    container.appendChild(script);
  }, []);

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
      const domain = trimmed.split("@")[1];
      const dnsRes = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`);
      const dnsData = await dnsRes.json();
      if (!dnsData.Answer || dnsData.Answer.length === 0) {
        setStatus("error");
        setErrorMessage(t.form.invalid);
        return;
      }

      const container = eoContainerRef.current;
      const eoInput = container?.querySelector('input[type="email"]');
      const eoButton = container?.querySelector('button[type="submit"], input[type="submit"]');

      if (!eoInput || !eoButton) {
        throw new Error("Form script not loaded yet");
      }

      // Sync value so EmailOctopus's component state registers it
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      ).set;
      nativeSetter.call(eoInput, trimmed);
      eoInput.dispatchEvent(new Event("input", { bubbles: true }));
      eoInput.dispatchEvent(new Event("change", { bubbles: true }));

      eoButton.click();

      // Wait briefly for EmailOctopus's script to complete its POST
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatus("success");
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
          {/* Primary: Github tracking link to Heyzine */}
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
          className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/40 text-sm transition-colors"
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
        <div className="mt-2.5 flex items-center gap-2 text-red-500 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hidden official EmailOctopus embed container */}
      <div ref={eoContainerRef} style={{ display: "none" }} aria-hidden="true" />
    </div>
  );
}