"use client"

import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
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
            aria-label="Formulaire de contact"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-4xl bg-[#111] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl max-h-[90vh]">

              {/* Bouton fermeture */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                ✕
              </button>

              {/* Colonne image */}
              <div className="relative w-full md:w-[45%] h-56 md:h-auto flex-shrink-0">
                <Image
                  src="/PhotoEvanNeon.jpeg"
                  alt="Evan"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111] via-[#111]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-8">
                  <p className="text-white/50 text-[11px] uppercase tracking-[0.2em] mb-2">
                    On discute ?
                  </p>
                  <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                    Contactez<br />Evan
                  </h2>
                </div>
              </div>

              {/* Colonne formulaire */}
              <div className="flex-1 p-8 md:p-10 overflow-y-auto">
                <p className="text-white/40 text-sm mb-7 leading-relaxed">
                  Un projet, une collaboration, une question ? Décrivez votre besoin et Evan vous répondra rapidement.
                </p>

                <form
                  className="flex flex-col gap-5"
                  onSubmit={(e) => {
                    e.preventDefault()
                    onClose()
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/50 text-[11px] uppercase tracking-wider">
                        Nom
                      </label>
                      <input
                        type="text"
                        placeholder="Dupont"
                        autoComplete="family-name"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[var(--red)] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/50 text-[11px] uppercase tracking-wider">
                        Prénom
                      </label>
                      <input
                        type="text"
                        placeholder="Jean"
                        autoComplete="given-name"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[var(--red)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[11px] uppercase tracking-wider">
                      Objet
                    </label>
                    <input
                      type="text"
                      placeholder="Demande de collaboration, devis..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[var(--red)] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[11px] uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Décrivez votre projet en quelques lignes..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[var(--red)] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-between bg-[var(--red)] hover:bg-[var(--red-hover)] text-white rounded-full px-6 py-3.5 text-sm font-semibold transition-colors mt-1 group cursor-pointer"
                  >
                    Envoyer le message
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors text-base">
                      →
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
