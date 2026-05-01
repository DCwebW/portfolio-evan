"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav>
      <a className="nav-logo" href="#">Evan</a>

      <ul className="nav-menu">
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li>
          <a className="nav-btn" href="#footer">
            Get in touch
            <span className="nav-btn-arrow">→</span>
          </a>
        </li>
      </ul>

      <button className="nav-hamburger" onClick={() => setOpen(true)} aria-label="Open menu">
        <span />
        <span />
        <span />
      </button>

      {open && <div className="nav-overlay" onClick={close} />}

      <div className={`nav-drawer${open ? " nav-drawer--open" : ""}`}>
        <button className="nav-drawer-close" onClick={close} aria-label="Close menu">×</button>
        <ul className="nav-drawer-menu">
          <li><a href="#hero" onClick={close}>Home</a></li>
          <li><a href="#about" onClick={close}>About</a></li>
          <li><a href="#projects" onClick={close}>Projects</a></li>
          <li>
            <a className="nav-btn" href="#footer" onClick={close}>
              Get in touch
              <span className="nav-btn-arrow">→</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
