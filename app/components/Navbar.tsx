"use client";

import { useState, useEffect, useRef } from "react";
import ContactButton from "./ContactButton";

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="18"
    height="18"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="18"
    height="18"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      closeRef.current?.focus();
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    hamburgerRef.current?.focus();
  };

  return (
    <nav className="flex items-center justify-between px-5 md:px-8 lg:px-[52px] h-[68px] bg-transparent z-[200]">
      
      {/* Logo + icônes sociales */}
      <div className="flex items-center gap-3">
        <a
          className="font-display font-black text-xl tracking-[1px] text-[var(--red)] no-underline"
          href="#"
        >
          Evan
        </a>

        {/* Séparateur vertical */}
        <span className="w-px h-4 bg-white/20" />

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@votreprofil"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--red)] hover:opacity-60 transition-opacity duration-200"
          aria-label="TikTok"
        >
          <TikTokIcon />
        </a>

      
        <a
          href="https://www.linkedin.com/in/votreprofil"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--red)] hover:opacity-60 transition-opacity duration-200"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </a>
      </div>

      {/* Desktop nav — hidden below md */}
      <ul className="hidden md:flex items-center gap-9 list-none">
        <li>
          <a
            className="text-sm font-normal text-white/65 no-underline tracking-[0.3px] transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white"
            href="#hero"
          >
            Accueil
          </a>
        </li>
        <li>
          <a
            className="text-sm font-normal text-white/65 no-underline tracking-[0.3px] transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white"
            href="#projects"
          >
            Projets
          </a>
        </li>
        <li>
          <ContactButton color="blanc" />
        </li>
      </ul>

      {/* Hamburger button — visible below md */}
      <button
        ref={hamburgerRef}
        className="flex md:hidden flex-col justify-center items-center gap-[5px] bg-transparent border-none cursor-pointer p-[6px] min-w-[44px] min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        aria-controls="mobile-drawer"
      >
        <span className="block w-6 h-[2px] bg-white rounded-[2px]" />
        <span className="block w-6 h-[2px] bg-white rounded-[2px]" />
        <span className="block w-6 h-[2px] bg-white rounded-[2px]" />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/55 z-[300] transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={`fixed top-0 right-0 h-full w-[80vw] max-w-[320px] bg-[var(--dark)] z-[400] flex flex-col p-6 border-l border-[var(--border)] md:hidden
          motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 24px)" }}
      >
        <button
          ref={closeRef}
          className="self-end bg-transparent border-none text-white text-[28px] leading-none cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center mb-4 opacity-70 hover:opacity-100 transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          onClick={close}
          aria-label="Fermer le menu"
        >
          ×
        </button>
        <ul className="list-none flex flex-col gap-7">
          <li>
            <a
              className="text-base font-normal text-white/65 no-underline tracking-[0.3px] transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white"
              href="#hero"
              onClick={close}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="text-base font-normal text-white/65 no-underline tracking-[0.3px] transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white"
              href="#projects"
              onClick={close}
            >
              Projects
            </a>
          </li>
          <li>
            <ContactButton color="blanc" />
          </li>
        </ul>
      </div>
    </nav>
  );
}