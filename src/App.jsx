import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import ChaptersList from "./components/ChaptersList";
import AuthorNote from "./components/AuthorNote";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 font-sans text-zinc-400 antialiased selection:bg-amber-200/80 selection:text-zinc-950">
        {/* ambient top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950" />

        <div className="relative">
          <Navbar />
          <main id="top">
            <Hero />
            <ProblemSection />
            <ChaptersList />
            <AuthorNote />
            <CTASection />
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}