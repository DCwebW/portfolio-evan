"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const lenis = new Lenis();

    // Connecte Lenis à ScrollTrigger : chaque tick Lenis met à jour ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Remplace le RAF manuel par le ticker GSAP pour que les deux soient synchronisés
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}
