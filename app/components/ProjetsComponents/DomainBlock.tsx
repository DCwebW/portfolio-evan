'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";


export function DomainBlock({ tag, label, children }: {
  tag: string;
  label: string;
  children: React.ReactNode;
  
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
 

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);
    const el = blockRef.current;
    if (!el || !tagRef.current || !titleRef.current) return;

    const split = new SplitText(titleRef.current, { type: "chars" });
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.from(tagRef.current, {
        opacity: 0,
        y: 16,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
      });

      gsap.from(split.chars, {
        opacity: 0,
        y: 48,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      gsap.from(el.querySelectorAll(".js-cell"), {
        opacity: 0,
        y: 40,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    // Pas d'animation sur mobile (max-width: 768px) — affichage statique immédiat

    return () => {
      split.revert();
      mm.revert();
    };
  }, { scope: blockRef });

  return (
    <div ref={blockRef} className="flex flex-col gap-4 md:gap-6">
      <div>
        <div className="flex items-center justify-between gap-3 mb-2 md:mb-3">
          <span ref={tagRef} className="text-[11px] font-semibold text-(--red) uppercase tracking-[2px]">
            {tag}
          </span>
         
        </div>
        <h3
          ref={titleRef}
          className="font-display font-black text-[clamp(28px,8vw,72px)] tracking-[-1px] text-white leading-none"
        >
          {label}
        </h3>
      </div>

      {children}
    </div>
  );
}
