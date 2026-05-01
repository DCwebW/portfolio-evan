'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Navbar from './Navbar';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export default function HeroSection() {
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-driven exit : mesure quand le hero quitte le viewport par le haut
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Les titres remontent et disparaissent sur les derniers 40% du scroll du hero
  const yExit = useTransform(scrollYProgress, [0.55, 1], [0, -90]);
  const opacityExit = useTransform(scrollYProgress, [0.55, 0.9], [1, 0]);

  // Décalage pour la citation (sort légèrement plus tôt)
  const yExitQuote = useTransform(scrollYProgress, [0.5, 0.95], [0, -90]);
  const opacityExitQuote = useTransform(scrollYProgress, [0.5, 0.85], [1, 0]);

  return (
    <section id="hero" ref={heroRef}>
      <Navbar />
      <div className="hero-bg" />
      <div className="hero-overlay" />

      <div className="hero-body">
        <div className="hero-left">
          <p className="hero-eyebrow">Hey, I&apos;m a</p>

          {isMobile ? (
            <h1 className="hero-title">
              Chargé de<br />Communication
            </h1>
          ) : (
            // Wrapper scroll-driven (exit) + motion.h1 entry (bas → haut)
            <motion.div style={{ y: yExit, opacity: opacityExit }}>
              <motion.h1
                className="hero-title"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
              >
                Chargé de<br />Communication
              </motion.h1>
            </motion.div>
          )}
        </div>

        <div className="hero-right">
          {isMobile ? (
            <p className="hero-quote">
              Une bonne communication<br />doit être invisible.
            </p>
          ) : (
            // Même structure pour la citation, légèrement décalée
            <motion.div style={{ y: yExitQuote, opacity: opacityExitQuote }}>
              <motion.p
                className="hero-quote"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
              >
                Une bonne communication<br />doit être invisible.
              </motion.p>
            </motion.div>
          )}
          <p className="hero-sub">Du logo au contenu, je construis des marques qui connectent et qui durent.</p>
        </div>
      </div>

      <div className="hero-tags-band">
        <div className="hero-tags-inner">
          <div className="hero-tag">
            <div className="hero-tag-num">#01</div>
            <div className="hero-tag-label">Stratégie Digitale</div>
          </div>
          <div className="hero-tag">
            <div className="hero-tag-num">#02</div>
            <div className="hero-tag-label">Création de Contenu</div>
          </div>
          <div className="hero-tag">
            <div className="hero-tag-num">#03</div>
            <div className="hero-tag-label">Gestion Réseaux Sociaux</div>
          </div>
          <div className="hero-tag">
            <div className="hero-tag-num">#04</div>
            <div className="hero-tag-label">Direction Créative</div>
          </div>
        </div>
      </div>
    </section>
  );
}
