'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);

export function DomainBlock({ tag, label, children }: {
  tag: string;
  label: string;
  children: React.ReactNode;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const el = blockRef.current;
    if (!el || !tagRef.current || !titleRef.current) return;

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

    const split = new SplitText(titleRef.current, { type: "chars" });
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
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: blockRef });

  return (
    <div ref={blockRef} className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-wrap items-baseline gap-2 md:gap-4">
        <span ref={tagRef} className="text-[11px] font-semibold text-(--red) uppercase tracking-[2px] flex-shrink-0">
          {tag}
        </span>
        <h3
          ref={titleRef}
          className="font-display font-black text-[clamp(24px,6vw,52px)] md:text-[clamp(28px,4vw,52px)] tracking-[-1px] text-white leading-none"
        >
          {label}
        </h3>
      </div>
      {children}
    </div>
  );
}
