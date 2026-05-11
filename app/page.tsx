"use client"

import HeroSection from "./components/HeroSection";
import ParallaxSection from "./components/ParallaxSection";
import Projets from "./components/Projets";
import Experiences from "./components/Experiences";
import Citation from "./components/Citation";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* PARALLAX */}
      <ParallaxSection />

      {/* ABOUT */}
      <section
        id="about"
        className="bg-[var(--dark)] pt-16 md:pt-20 lg:pt-[120px] px-5 md:px-8 lg:px-[52px] pb-16 md:pb-20 lg:pb-[100px] -mt-8 relative z-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-[1200px] mx-auto lg:mb-16">
          <div>
            <span className="inline-block text-[11px] font-semibold text-[var(--red)] uppercase tracking-[2px] mb-6">
              Behind the Designs
            </span>
            <h2 className="font-display font-black text-[clamp(28px,8vw,68px)] md:text-[clamp(36px,6vw,68px)] leading-[0.95] tracking-[-1px] md:tracking-[-1.5px] text-white">
              Shaping<br />Experiences That<br />Make Life Simpler
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:pt-14">
            <p className="text-base font-light text-white/60 leading-[1.85]">
              Je suis un chargé de communication diplômé d&apos;un Mastère en Marketing
              Digital et Social Media. Je construis des stratégies qui connectent
              les marques à leurs audiences.
            </p>
            <p className="text-base font-light text-white/60 leading-[1.85]">
              Disponible en poste et en freelance, je combine vision créative et
              approche data-driven pour des résultats mesurables.
            </p>
            <a
              className="inline-flex items-center gap-2 bg-[var(--red)] text-white border-none py-3 px-[26px] rounded-full text-sm font-medium cursor-pointer no-underline self-start mt-2 min-h-[44px] transition-[background,transform] duration-200 hover:bg-[var(--red-hover)] hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              href="#footer"
            >
              Get in touch →
            </a>
          </div>
        </div>

      </section>

      {/* PROJETS */}
      <Projets />

      {/* EXPÉRIENCES */}
      <Experiences />
      <Citation/>

      {/* FOOTER */}
      <footer
        id="footer"
        className="bg-[var(--dark)] pt-12 md:pt-[72px] px-5 md:px-8 lg:px-[52px] pb-9 md:pb-[52px] border-t border-[var(--border)] -mt-8 relative z-0"
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-6 flex-wrap">
          <span className="font-display font-black text-lg tracking-[1px] text-[var(--red)]">
            Evan Mukendi
          </span>
          <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-start md:items-center">
            <a
              className="text-sm text-white/50 no-underline transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white min-h-[44px] flex items-center"
              href="mailto:evanmuks@gmail.com"
            >
              evanmuks@gmail.com
            </a>
            <a
              className="text-sm text-white/50 no-underline transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white min-h-[44px] flex items-center"
              href="tel:0688019050"
            >
              06-88-01-90-50
            </a>
          </div>
          <span className="text-xs text-white/25">© 2026 Evan Mukendi</span>
        </div>
      </footer>
    </>
  );
}
