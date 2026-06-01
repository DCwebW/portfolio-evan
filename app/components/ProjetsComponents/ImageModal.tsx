'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { ImageInfo } from './Carousel';

export function ImageModal({ info, onClose }: { info: ImageInfo | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!info) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [info, onClose]);

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {info && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 bg-[#111] border border-white/10 rounded-2xl overflow-hidden max-w-[860px] w-[95vw] mx-4 flex flex-col md:flex-row"
            style={{ maxHeight: '90vh' }}
            initial={{ scale: 0.93, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 20 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image — occupe 60% sur desktop, pleine largeur sur mobile */}
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
