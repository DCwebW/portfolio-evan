'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const quoteWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (isMobile) return;

    // Animations d'entrée
    gsap.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 8,
      ease: 'power2.out',
      delay: 0.1,
     
    });
    gsap.from(quoteRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.75,
      ease: 'power2.out',
      delay: 0.25,
    });

    // Scroll exit — titre
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    titleTl.set({}, {}, 1);
    titleTl.to(titleWrapRef.current, { opacity: 0, ease: 'none', duration: 0.35 }, 0.55);
    titleTl.to(titleWrapRef.current, { y: -90, ease: 'none', duration: 0.45 }, 0.55);

    // Scroll exit — citation
    const quoteTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    quoteTl.set({}, {}, 1);
    quoteTl.to(quoteWrapRef.current, { opacity: 0, ease: 'none', duration: 0.35 }, 0.5);
    quoteTl.to(quoteWrapRef.current, { y: -90, ease: 'none', duration: 0.45 }, 0.5);
  }, { scope: heroRef, dependencies: [isMobile] });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen min-h-[680px] flex flex-col overflow-hidden rounded-b-[48px] "
    >
      <Navbar />

      {/* Photo de fond */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat z-0 "
        style={{ backgroundImage: "url('/Evan-Photo.png')", backgroundPosition: 'center 20%' }}
      />

    

      {/* Corps principal */}
      <div className="relative z-[2] flex-1 flex items-center justify-between px-5 md:px-6 lg:px-[52px] pb-7 md:pb-9 max-md:flex-col max-md:items-start max-md:justify-end max-md:gap-5">
        <div className="max-w-full md:max-w-[520px]">
          <p className="text-[15px] font-semibold text-[var(--red)] italic tracking-[0.3px] mb-2">

          </p>

          {isMobile ? (
            <h1 className="font-display font-black text-[clamp(28px,10vw,44px)] leading-[0.95] text-white tracking-[-1px]">
              Chargé de<br />Communication
            </h1>
          ) : (
            <div ref={titleWrapRef}>
              <h1
                ref={titleRef}
                className="font-display font-black text-[clamp(40px,9vw,80px)] leading-[0.92] text-white tracking-[-2px]"
              >
                Chargé de<br />Communication
              </h1>
            </div>
          )}
        </div>

        {/* Quote block — hidden on mobile, visible from md up */}
        <div className="hidden md:block max-w-[300px] pb-3 flex-shrink-0">
          <div ref={quoteWrapRef}>
            <p
              ref={quoteRef}
              className="font-display font-extrabold text-[clamp(18px,2vw,22px)] text-white mb-3 leading-[1.25] tracking-[-0.3px]"
            >
              Donner du rythme aux idées
            </p>
          </div>
          <p className="text-[13px] font-normal text-white/50 leading-[1.75]">
            Entre vidéos, design et communication digitale , je crée des contenus qui attirent, qui marquent 
          </p>
        </div>
      </div>

     
    </section>
  );
}
