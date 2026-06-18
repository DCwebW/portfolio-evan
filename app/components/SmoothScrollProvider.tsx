"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const lenis = new Lenis({
      // Sur mobile, on désactive le smooth wheel pour ne pas interférer
      // avec le scroll tactile natif, mais on garde le RAF loop actif
      // pour que ScrollTrigger reçoive des mises à jour régulières.
      smoothWheel: !isMobile,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }

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
