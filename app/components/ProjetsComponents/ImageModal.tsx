'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ImageInfo } from './Carousel';

interface ImageModalProps {
  items: ImageInfo[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageModal({ items, currentIndex, onClose, onNavigate }: ImageModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const info = currentIndex !== null ? items[currentIndex] : null;
  const isOpen = info !== null && currentIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowLeft') { onNavigate((currentIndex! - 1 + items.length) % items.length); return; }
      if (e.key === 'ArrowRight') { onNavigate((currentIndex! + 1) % items.length); return; }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!mounted) return null;

  const hasPrev = items.length > 1;
  const hasNext = items.length > 1;

  return createPortal(
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
            <div className="w-full md:w-[60%] md:shrink-0 bg-black">
              <img
                src={info.src}
                alt={info.title}
                className="w-full h-[260px] md:h-full object-cover"
              />
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
    </AnimatePresence>,
    document.body
  );
}
