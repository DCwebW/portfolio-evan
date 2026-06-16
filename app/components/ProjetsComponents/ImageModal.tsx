'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import type { ImageInfo } from '@/lib/graphisme';

interface ImageModalProps {
  items: ImageInfo[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageModal({ items, currentIndex, onClose, onNavigate }: ImageModalProps) {
  const [mounted, setMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const info = currentIndex !== null ? items[currentIndex] : null;
  const isOpen = info !== null && currentIndex !== null;

  useEffect(() => {
    if (!isOpen) { setLightboxOpen(false); return; }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) { setLightboxOpen(false); return; }
        onClose();
        return;
      }
      if (lightboxOpen) return;
      if (e.key === 'ArrowLeft') { onNavigate((currentIndex! - 1 + items.length) % items.length); return; }
      if (e.key === 'ArrowRight') { onNavigate((currentIndex! + 1) % items.length); return; }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate, lightboxOpen]);

  // Ferme la lightbox quand on change d'image
  useEffect(() => { setLightboxOpen(false); }, [currentIndex]);

  if (!mounted) return null;

  const hasPrev = items.length > 1;
  const hasNext = items.length > 1;

  return createPortal(
    <>
      <AnimatePresence>
        {isOpen && info && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

            {/* Flèche gauche */}
            {hasPrev && (
              <button
                className="absolute left-3 md:left-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/15 text-white/70 hover:text-white hover:bg-black/70 hover:border-white/30 transition-all"
                onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex! - 1 + items.length) % items.length); }}
                aria-label="Image précédente"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Flèche droite */}
            {hasNext && (
              <button
                className="absolute right-3 md:right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/15 text-white/70 hover:text-white hover:bg-black/70 hover:border-white/30 transition-all"
                onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex! + 1) % items.length); }}
                aria-label="Image suivante"
              >
                <ChevronRight size={20} />
              </button>
            )}

            <motion.div
              key={currentIndex}
              className="relative z-10 bg-[#111] border border-white/10 rounded-2xl overflow-hidden max-w-[860px] w-[95vw] mx-12 flex flex-col md:flex-row"
              style={{ maxHeight: '90vh' }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full md:w-[60%] md:shrink-0 bg-black group">
                <img
                  src={info.src}
                  alt={info.title}
                  className="w-full h-[260px] md:h-full object-cover"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white/70 hover:text-white hover:bg-black/90 hover:border-white/30 text-xs transition-all backdrop-blur-sm md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                  aria-label="Voir l'image en entier"
                >
                  <Maximize2 size={13} />
                  Voir image
                </button>
              </div>

              {/* Infos */}
              <div className="flex flex-col gap-4 p-6 md:p-8 justify-center min-w-0">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors text-lg"
                  aria-label="Fermer"
                >
                  ✕
                </button>

                {/* Compteur */}
                {items.length > 1 && (
                  <span className="text-white/30 text-xs tabular-nums">
                    {currentIndex! + 1} / {items.length}
                  </span>
                )}

                <div className="w-8 h-[3px] bg-(--red)" />

                <h3 className="text-white font-['GildaDisplay-Regular',_sans-serif] text-xl md:text-2xl leading-snug">
                  {info.title}
                </h3>

                {info.description && (
                  <p className="text-white/60 text-sm leading-relaxed">
                    {info.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox plein écran */}
      <AnimatePresence>
        {lightboxOpen && info && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setLightboxOpen(false)}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white/70 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Fermer l'aperçu"
            >
              <X size={18} />
            </button>
            <motion.img
              src={info.src}
              alt={info.title}
              className="relative z-10 max-w-[95vw] max-h-[95vh] object-contain rounded-lg"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
