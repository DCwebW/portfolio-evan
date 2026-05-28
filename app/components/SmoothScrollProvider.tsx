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

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const stopLenis = () => lenis.stop();
    const startLenis = () => lenis.start();
    window.addEventListener("lenis:stop", stopLenis);
    window.addEventListener("lenis:start", startLenis);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      window.removeEventListener("lenis:stop", stopLenis);
      window.removeEventListener("lenis:start", startLenis);
    };
  }, []);

  return <>{children}</>;
}
