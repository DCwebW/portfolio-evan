'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CarouselCell({ src }: { src: string }) {
  const cellRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = cellRef.current;
    if (!el) return;

    gsap.set(el, { scale: 1, zIndex: 1 });
    el.onmouseenter = () => gsap.to(el, { scale: 1.2, zIndex: 10, duration: 0.4, ease: "power2.out" });
    el.onmouseleave = () => gsap.to(el, { scale: 1, zIndex: 1, duration: 0.35, ease: "power2.inOut" });
  }, { scope: cellRef });

  return (
    <div ref={cellRef} className="relative flex-shrink-0 w-[200px] h-[140px] sm:w-[240px] sm:h-[170px] md:w-[280px] md:h-[200px] overflow-hidden rounded-xl cursor-pointer">
      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
}
