"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EXPERIENCES = [
  { initial: "U", name: "Union Internationale Architecte" },
  { initial: "F", name: "Freddy Conduite" },
  { initial: "L", name: "Label Collector Music" },
];

export default function Experiences() {
  const trustedRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- Marquee continu ---
    gsap.to(marqueeTrackRef.current, {
      x: "-50%",
      ease: "none",
      duration: 22,
      repeat: -1,
    });

    // --- Section #projects ---
    gsap.from(".projects-header h2", {
      opacity: 0,
      y: -40,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
      },
    });

    gsap.from(".project-card", {
      opacity: 0,
      y: 60,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 75%",
      },
    });
  });

  return (
    <>
      {/* TRUSTED / EXPÉRIENCES — MARQUEE */}
      <section
        id="trusted"
        ref={trustedRef}
        className="bg-[var(--light)] -mt-12 pt-10 md:pt-14 pb-10 md:pb-14 relative z-0 rounded-b-[32px] overflow-hidden"
      >
        <p className="text-[11px] font-semibold text-black/40 uppercase tracking-[2px] text-center mb-6 md:mb-8">
         Ils m&apos;ont fait confiance
        </p>
        <div className="overflow-hidden">
          <div ref={marqueeTrackRef} className="flex items-center" style={{ width: "max-content" }}>
            {[...EXPERIENCES, ...EXPERIENCES].map(({ initial, name }, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 px-6 md:px-10">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-black flex items-center justify-center text-xs md:text-[13px] font-bold text-black flex-shrink-0">
                  {initial}
                </div>
                <span className="font-display font-black text-[clamp(20px,4vw,42px)] tracking-[-1px] text-black whitespace-nowrap">
                  {name}
                </span>
                <span className="text-black/20 text-2xl md:text-[32px] font-light ml-4 md:ml-6">·</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        ref={projectsRef}
        className="bg-[var(--light)] pt-16 md:pt-20 lg:pt-[120px] px-5 md:px-8 lg:px-[52px] pb-16 md:pb-[60px] lg:pb-[100px] -mt-8 relative z-0 rounded-b-[32px]"
      >
        <div className="projects-header max-w-[1200px] mx-auto mb-10 md:mb-14">
          <h2 className="font-display font-black text-[clamp(28px,9vw,76px)] md:text-[clamp(36px,6vw,76px)] tracking-[-1px] md:tracking-[-2px] text-[#111] leading-none">
            Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-[1200px] mx-auto">
          <div className="project-card bg-white rounded-[14px] p-6 md:p-8 lg:p-[40px_36px] flex flex-col gap-4 border border-black/[0.06] transition-[transform,box-shadow] duration-[250ms] cursor-default hover:-translate-y-[6px] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)]">
            <div className="text-[11px] font-semibold text-[var(--red)] tracking-[2px] uppercase">01</div>
            <div className="font-display font-black text-[clamp(24px,5vw,36px)] tracking-[-1px] text-[#111] leading-none">UIA</div>
            <div className="text-sm text-[#555] font-normal leading-[1.5]">
              Assistant Communication — gestion des relations médias, stratégie
              digitale, rédaction de contenus et newsletters.
            </div>
            <div className="text-[12px] text-[#aaa] font-light mt-auto pt-4 border-t border-black/[0.07]">
              <span className="inline-block text-[11px] py-[4px] px-3 rounded-full bg-[#b31b1b14] text-[var(--red)] font-medium tracking-[0.5px]">
                2023 — 2025
              </span>
            </div>
          </div>
          <div className="project-card bg-white rounded-[14px] p-6 md:p-8 lg:p-[40px_36px] flex flex-col gap-4 border border-black/[0.06] transition-[transform,box-shadow] duration-[250ms] cursor-default hover:-translate-y-[6px] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)]">
            <div className="text-[11px] font-semibold text-[var(--red)] tracking-[2px] uppercase">02</div>
            <div className="font-display font-black text-[clamp(24px,5vw,36px)] tracking-[-1px] text-[#111] leading-none">Freddy Conduite</div>
            <div className="text-sm text-[#555] font-normal leading-[1.5]">
              Chargé de Communication — développement de la présence digitale,
              community management, campagnes social media.
            </div>
            <div className="text-[12px] text-[#aaa] font-light mt-auto pt-4 border-t border-black/[0.07]">
              <span className="inline-block text-[11px] py-[4px] px-3 rounded-full bg-[#b31b1b14] text-[var(--red)] font-medium tracking-[0.5px]">
                2022 — 2023
              </span>
            </div>
          </div>
          <div className="project-card bg-white rounded-[14px] p-6 md:p-8 lg:p-[40px_36px] flex flex-col gap-4 border border-black/[0.06] transition-[transform,box-shadow] duration-[250ms] cursor-default hover:-translate-y-[6px] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)]">
            <div className="text-[11px] font-semibold text-[var(--red)] tracking-[2px] uppercase">03</div>
            <div className="font-display font-black text-[clamp(24px,5vw,36px)] tracking-[-1px] text-[#111] leading-none">Collector Music</div>
            <div className="text-sm text-[#555] font-normal leading-[1.5]">
              Producteur d&apos;Artiste — production musicale, développement d&apos;image
              artistique, promotion digitale et management.
            </div>
            <div className="text-[12px] text-[#aaa] font-light mt-auto pt-4 border-t border-black/[0.07]">
              <span className="inline-block text-[11px] py-[4px] px-3 rounded-full bg-[#b31b1b14] text-[var(--red)] font-medium tracking-[0.5px]">
                Personnel
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
