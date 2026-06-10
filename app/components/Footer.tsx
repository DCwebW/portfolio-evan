"use client"

import { useState } from "react"
import ContactButton from "./ContactButton"
import DownloadCVButton from "./DownloadCVButton"
import AboutModal from "./AboutModal"

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/50">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/50">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const sections = [
  { label: "Accueil", href: "#hero" },
  { label: "Projets", href: "#projects" },
  { label: "Expériences", href: "#experiences" },
  { label: "Contact", href: "#footer" },
]

const socials = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@votreprofil",
    icon: <TikTokIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/votreprofil",
    icon: <LinkedInIcon />,
  },
]

export default function Footer() {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <footer id="footer" className="relative border-white/5 border-t pt-14 pb-8 bg-[var(--dark)] overflow-hidden">
      {/* Glow rouge en haut — z-0 pour rester dans le footer, au-dessus du bg */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[90vw] max-w-6xl h-56 bg-[radial-gradient(ellipse_at_top,rgba(179,27,27,0.35)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-xl tracking-[1px] text-[var(--red)]">
                Evan Mukendi
              </span>
            </div>
            <p className="mt-4 text-sm text-white/70 font-sans">
              Chargé de communication — Marketing Digital &amp; Social Media.{" "}
              <span className="text-white/90">Disponible en poste et en freelance.</span>
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold tracking-tight font-display text-white">Sections</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="text-white/70 hover:text-white transition-colors font-sans"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold tracking-tight font-display text-white">Réseaux</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-sans"
                  >
                    {s.icon}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions contact */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold tracking-tight font-display text-white">Contact</h4>
            <div className="mt-4 flex flex-col gap-3">
              <ContactButton color="rouge" />
              <DownloadCVButton />
            </div>
          </div>

        </div>

        {/* Barre du bas */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-white/60 font-sans">© 2026 Evan Mukendi</p>
          <div className="flex items-center gap-6">
            <a href="mailto:evanmuks@gmail.com" className="text-white/60 hover:text-white transition-colors font-sans">
              evanmuks@gmail.com
            </a>
            <span className="hidden sm:inline-block w-px h-4 bg-white/10" />
            <a href="tel:0688019050" className="text-white/60 hover:text-white transition-colors font-sans">
              06-88-01-90-50
            </a>
            <span className="hidden sm:inline-block w-px h-4 bg-white/10" />
            <button
              onClick={() => setAboutOpen(true)}
              className="text-white/40 hover:text-white/70 transition-colors font-sans bg-transparent border-none cursor-pointer text-sm p-0"
            >
              À propos du site
            </button>
          </div>
        </div>

        <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />

      </div>

      <span className="hidden md:block absolute right-6 bottom-6 h-4 w-16 rounded-full border border-white/10 bg-white/5" />
    </footer>
  )
}
