"use client"

import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

const stack = [
  { name: "Next.js 15", role: "Framework React" },
  { name: "Framer Motion", role: "Animations" },
  { name: "Lenis", role: "Smooth scroll" },
  { name: "Tailwind CSS", role: "Styles" },
  { name: "Cloudflare R2", role: "Stockage médias" },
]

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.dispatchEvent(new Event('lenis:stop'))
    } else {
      document.body.style.overflow = ''
      window.dispatchEvent(new Event('lenis:start'))
    }
    return () => {
      document.body.style.overflow = ''
      window.dispatchEvent(new Event('lenis:start'))
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            aria-modal="true"
            role="dialog"
            aria-label="À propos du site"
          >
            <div className="relative w-full max-w-md bg-[#111] rounded-2xl overflow-hidden shadow-2xl p-8 md:p-10">

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                ✕
              </button>

              {/* En-tête */}
              <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-2">
                Ce portfolio
              </p>
              <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-6">
                À propos du site
              </h2>

              {/* Réalisé par */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Réalisé par</p>
                <a
                  href="https://www.linkedin.com/in/daryl-cointre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold hover:text-[var(--red)] transition-colors"
                >
                  Daryl Cointre
                </a>
                <p className="text-white/50 text-sm mt-1">
                  Développeur web &amp; mobile — design et intégration.
                </p>
              </div>

              {/* Copyright + mentions */}
              <div className="flex flex-col gap-1">
                <p className="text-white/40 text-xs">
                  © 2026 Evan Mukendi — Tous droits réservés.
                </p>
                <p className="text-white/30 text-xs">
                  Aucune donnée personnelle n'est collectée sur ce site.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
