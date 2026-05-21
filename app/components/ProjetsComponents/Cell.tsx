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
 
    el.addEventListener("mouseenter", () =>
      // scale réduit à 1.05 : effet subtil sans débordement visible
      gsap.to(el, { scale: 1.05, zIndex: 10, duration: 0.4, ease: "power2.out" })
    );
    el.addEventListener("mouseleave", () =>
      gsap.to(el, { scale: 1, zIndex: 1, duration: 0.35, ease: "power2.inOut" })
    );
  }, { scope: cellRef });
 
  return (
    <div
      ref={cellRef}
      className={`
        js-cell relative rounded-xl bg-white/5 cursor-pointer
        ${featured
          // La cellule "featured" prend 2 lignes sur desktop pour se démarquer
          ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 aspect-[9/16] sm:aspect-[16/7] lg:aspect-auto lg:h-full"
          : "aspect-video lg:aspect-auto lg:h-full"
        }
      `}
      // overflow-hidden ici (pas dans l'enfant) pour que le clip
      // suive le scale et évite que la vidéo déborde de la cellule
      style={{ overflow: "hidden" }}
    >
      {children}
    </div>
  );
}
