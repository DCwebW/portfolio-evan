"use client";

import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // iOS Safari-safe scroll lock
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      // Move focus to close button
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
    // Return focus to hamburger button
    hamburgerRef.current?.focus();
  };

  return (
    <nav className="flex items-center justify-between px-5 md:px-8 lg:px-[52px] h-[68px] bg-transparent z-[200]">
      <a
        className="font-display font-black text-xl tracking-[1px] text-[var(--red)] no-underline"
        href="#"
      >
        Evan
      </a>

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
            href="#about"
          >
           A propos
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
          <a
            className="group flex items-center bg-white text-[#111] border-none py-[6px] pr-[6px] pl-5 rounded-full text-sm font-semibold cursor-pointer no-underline transition-[transform,box-shadow] duration-200 whitespace-nowrap shadow-[0_2px_16px_rgba(0,0,0,0.15)] hover:scale-[1.04] hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            href="#footer"
          >
            Get in touch
            <span className="w-[34px] h-[34px] bg-[var(--red)] rounded-full flex items-center justify-center ml-[14px] flex-shrink-0 text-base text-white transition-colors duration-200 group-hover:bg-[var(--red-hover)]">
              →
            </span>
          </a>
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

      {/* Drawer — slides in from right */}
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
              href="#about"
              onClick={close}
            >
              About
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
            <a
              className="group inline-flex items-center bg-white text-[#111] border-none py-[6px] pr-[6px] pl-5 rounded-full text-sm font-semibold cursor-pointer no-underline transition-[transform,box-shadow] duration-200 whitespace-nowrap shadow-[0_2px_16px_rgba(0,0,0,0.15)] hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)]"
              href="#footer"
              onClick={close}
            >
              Get in touch
              <span className="w-[34px] h-[34px] bg-[var(--red)] rounded-full flex items-center justify-center ml-[14px] flex-shrink-0 text-base text-white transition-colors duration-200 group-hover:bg-[var(--red-hover)]">
                →
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
