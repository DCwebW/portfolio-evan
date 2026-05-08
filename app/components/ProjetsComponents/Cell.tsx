'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Cell({ featured, children }: { featured?: boolean; children: React.ReactNode }) {
  const cellRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = cellRef.current;
    if (!el) return;

    gsap.set(el, { scale: 1, zIndex: 1 });
    el.onmouseenter = () => gsap.to(el, { scale: 1.2, zIndex: 10, duration: 0.4, ease: "power2.out" });
    el.onmouseleave = () => gsap.to(el, { scale: 1, zIndex: 1, duration: 0.35, ease: "power2.inOut" });
  }, { scope: cellRef });

  return (
    <div
      ref={cellRef}
      className={`js-cell relative overflow-hidden rounded-xl bg-white/5 cursor-pointer${
        featured
          ? " sm:col-span-2 sm:row-span-1 lg:col-span-1 lg:row-span-2 aspect-video sm:aspect-[16/6] lg:aspect-auto"
          : " aspect-video"
      }`}
    >
      {children}
    </div>
  );
}
