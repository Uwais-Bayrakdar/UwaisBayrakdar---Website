import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { X, BookOpen } from "lucide-react";

export default function BookMockup() {
  const { t } = useLanguage();
  const isRtl = t.dir === "rtl";

  // Reverse default angle for RTL so the spine side faces the viewer
  const defaultRotY = isRtl ? -35 : 35;
  const [rotY, setRotY] = useState(defaultRotY);
  const [rotX, setRotX] = useState(9);
  const [isDragging, setIsDragging] = useState(false);
  const [showBackText, setShowBackText] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, rotY: defaultRotY, rotX: 6 });

  const thickness = 20; // Spine depth
  const halfThickness = thickness / 2;
  const fullWrapImage = t.assets.coverWrap;

  // Reset rotation when switching languages
  useEffect(() => {
    setRotY(isRtl ? -35 : 35);
    setRotX(9);
  }, [isRtl]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    dragStart.current = { x: clientX, y: clientY, rotY, rotX };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;

    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;

    setRotY(dragStart.current.rotY + deltaX * 0.45);
    const nextRotX = Math.max(-25, Math.min(25, dragStart.current.rotX - deltaY * 0.25));
    setRotX(nextRotX);
  };

  useEffect(() => {
    const onUp = () => setIsDragging(false);
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, []);

  return (
    <div className="flex flex-col items-center select-none">
      {/* 3D Viewport Stage */}
      <div
        className="relative mx-auto w-56 [perspective:1200px] sm:w-64 lg:w-72 cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <div className="absolute -inset-10 -z-10 rounded-full bg-red-950/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 left-6 right-6 h-8 rounded-[50%] bg-black/85 blur-xl pointer-events-none" />

        <div
          className={`relative aspect-[2/3] w-full [transform-style:preserve-3d] ${
            isDragging ? "" : "transition-transform duration-300 ease-out"
          }`}
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* Front Cover */}
          <div
            className={`absolute inset-0 border border-white/10 bg-zinc-950 shadow-2xl [backface-visibility:hidden] ${
              isRtl ? "rounded-l-md" : "rounded-r-md"
            }`}
            style={{
              transform: `translateZ(${halfThickness}px)`,
              backgroundImage: `url(${fullWrapImage})`,
              backgroundSize: "207% 100%",
              backgroundPosition: "right center",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10" />
            <div
              className={`pointer-events-none absolute inset-y-0 w-2.5 ${
                isRtl
                  ? "right-0 bg-gradient-to-l from-black/50 to-transparent"
                  : "left-0 bg-gradient-to-r from-black/50 to-transparent"
              }`}
            />
          </div>

          {/* Back Cover */}
          <div
            className={`absolute inset-0 border border-white/10 bg-zinc-950 shadow-2xl [backface-visibility:hidden] ${
              isRtl ? "rounded-r-md" : "rounded-l-md"
            }`}
            style={{
              transform: `rotateY(180deg) translateZ(${halfThickness}px)`,
              backgroundImage: `url(${fullWrapImage})`,
              backgroundSize: "207% 100%",
              backgroundPosition: "left center",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-black/25 via-transparent to-white/10" />
            <div
              className={`pointer-events-none absolute inset-y-0 w-2.5 ${
                isRtl
                  ? "left-0 bg-gradient-to-r from-black/50 to-transparent"
                  : "right-0 bg-gradient-to-l from-black/50 to-transparent"
              }`}
            />
          </div>

          {/* Spine (Positioned on the Right for Arabic, Left for English/Turkish) */}
          <div
            className={`absolute inset-y-0 border-y border-white/10 shadow-inner overflow-hidden bg-[#e11d48] ${
              isRtl ? "right-0" : "left-0"
            }`}
            style={{
              width: `${thickness}px`,
              transform: isRtl
                ? `translateX(${halfThickness}px) rotateY(90deg)`
                : `translateX(-${halfThickness}px) rotateY(-90deg)`,
              backgroundImage: `url(${fullWrapImage})`,
              backgroundSize: "4800% 100%",
              backgroundPosition: "50% center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
          </div>

          {/* Vertical Page Edge (Opposite side of the spine) */}
          <div
            className={`absolute inset-y-1 rounded-xs bg-[repeating-linear-gradient(90deg,#e5e5e5_0,#e5e5e5_1px,#d4d4d4_1px,#d4d4d4_2px)] shadow-inner ${
              isRtl ? "left-0" : "right-0"
            }`}
            style={{
              width: `${thickness}px`,
              transform: isRtl
                ? `translateX(-${halfThickness}px) rotateY(-90deg)`
                : `translateX(${halfThickness}px) rotateY(90deg)`,
            }}
          />

          {/* Top Page Edge */}
          <div
            className="absolute top-0 inset-x-1 bg-[repeating-linear-gradient(0deg,#e5e5e5_0,#e5e5e5_1px,#d4d4d4_1px,#d4d4d4_2px)] shadow-inner"
            style={{
              height: `${thickness}px`,
              transform: `translateY(-${halfThickness}px) rotateX(90deg)`,
            }}
          />

          {/* Bottom Page Edge */}
          <div
            className="absolute bottom-0 inset-x-1 bg-[repeating-linear-gradient(0deg,#d4d4d4_0,#d4d4d4_1px,#a3a3a3_1px,#a3a3a3_2px)] shadow-inner"
            style={{
              height: `${thickness}px`,
              transform: `translateY(${halfThickness}px) rotateX(-90deg)`,
            }}
          />
        </div>
      </div>

      {/* Controls / Hints below book */}
      <div className="mt-6 flex flex-col items-center gap-2.5">
        <span className="text-[11px] font-mono text-zinc-500 tracking-wider uppercase">
          {t.mockup.rotateHint}
        </span>
        <button
          type="button"
          onClick={() => setShowBackText(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          <BookOpen className="h-3.5 w-3.5 text-amber-200/80" />
          {t.mockup.readBackBtn}
        </button>
      </div>

      {/* Modal Dialog for Back Cover Content */}
      {showBackText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-2xl text-start">
            <button
              type="button"
              onClick={() => setShowBackText(false)}
              className="absolute end-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-500">
              {t.mockup.badge}
            </span>

            <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
              {t.mockup.headline}
            </h3>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
              <p>{t.mockup.p1}</p>
              <p className="text-zinc-400 text-xs">{t.mockup.p2}</p>
            </div>

            <div className="mt-5 border-t border-zinc-900 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {t.mockup.insideTitle}
              </h4>
              <ul className="mt-2 space-y-2 text-xs text-zinc-300">
                {t.mockup.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-red-400 font-bold shrink-0">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {t.mockup.closing && (
              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                {t.mockup.closing}
              </p>
            )}

            <div className="mt-5 border-s-2 border-red-500/70 ps-3 py-0.5">
              <p className="text-[11px] font-semibold text-zinc-200">{t.mockup.aboutAuthorTitle}</p>
              <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                <span className="font-medium text-zinc-300">{t.site.author}</span> {t.mockup.aboutAuthorBody}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}